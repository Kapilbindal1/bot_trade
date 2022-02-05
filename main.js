const express = require("express");
const bodyParser = require("body-parser");
const Account = require("./account");
const Market = require("./market");
const { placeOrder } = require("./market/orders");
const { bots } = require("./bots");
const { keepAlive } = require("./alive");
const { shouldSell, sellAdvice } = require("./utils/mainUtils");
const Transactions = require("./db/transactions");

const cron = require("node-cron");
const Logs = require("./db/logs");
// DB related imports
const db = require("./db");

const app = express();
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(bodyParser.json({ limit: "50mb" }));

const run = async () => {
  for (let i = 0; i < bots.length; i += 1) {
    const bot = bots[i];
    const user_name = bot.name;
    const currentPrice = await Market.getCurrentPrice();
    const { averageRate } = await Account.getAverageBuyRate({
      currentPrice,
      name: user_name,
    });
    const { pendingAsset } = await Transactions.getTransactions();
    const { market, asset, base } = await Account.getBalance(user_name);
    let status = "progress";
    if (bot.indicatorFunction) {
      let { advice } = await bot.indicatorFunction({
        balance: base,
        currentPrice,
        asset,
      });

      // console.log(
      //   "SOL_TRADE ",
      // Logs.addLog({
      //   advice: advice,
      //   currentPrice: currentPrice,
      //   userName: user_name,
      //   isBuySellSuccessful: status,
      //   balance: base,
      //   market: market,
      //   asset: asset,
      //   quantity: 0
      // }))

      if (
        advice === "sell" &&
        asset > 0 &&
        shouldSell(currentPrice, averageRate)
      ) {
        await placeOrder({
          userName: user_name,
          side: "sell",
          price: currentPrice,
          amount: asset,
          market: market,
          averageBuyRate: averageRate,
          pendingAsset: 0,
        });
        status = "success";
        Logs.addLog({
            advice: advice,
            currentPrice: currentPrice,
            userName: user_name,
            isBuySellSuccessful: status,
            balance: base,
            market: market,
            asset: asset,
            quantity: asset
          })
      } else if (advice === "buy") {
        if (asset > 0) {
          switch (sellAdvice(averageRate, currentPrice, pendingAsset, asset)) {
            case "SELL_HALF": {
              await placeOrder({
                userName: user_name,
                side: "sell",
                price: currentPrice,
                amount: asset / 2,
                market: market,
                averageBuyRate: averageRate,
                pendingAsset: pendingAsset + 1,
              });
              break;
            }
            case "SELL_ALL": {
              await placeOrder({
                userName: user_name,
                side: "sell",
                price: currentPrice,
                amount: asset,
                market: market,
                averageBuyRate: averageRate,
                pendingAsset: 0,
              });
              break;
            }
            default:
              return;
          }
        } else {
          const { quantity } = await bot.buyFunction({
            balance: base,
            currentPrice,
          });

          if (quantity > 0) {
            await placeOrder({
              userName: user_name,
              side: "buy",
              price: currentPrice,
              amount: quantity,
              market: market,
            });
          }
          status = "success";
          Logs.addLog({
            advice: advice,
            currentPrice: currentPrice,
            userName: user_name,
            isBuySellSuccessful: status,
            balance: base,
            market: market,
            asset: asset,
            quantity: quantity
          })
        }
      } else return;
    } else {
      let sellData = bot.sellFunction({
        averageBuyRate: averageRate,
        currentPrice,
        quantity: asset,
      });

      if (sellData.quantity > 0) {
        await placeOrder({
          userName: user_name,
          side: "sell",
          price: currentPrice,
          amount: sellData.quantity,
          market: market,
          averageBuyRate: averageRate,
        });
        status = "success";
        Logs.addLog({
            advice: "sell",
            currentPrice: currentPrice,
            userName: user_name,
            isBuySellSuccessful: status,
            balance: base,
            market: market,
            asset: asset,
            quantity: sellData.quantity
          })
        return;
      }

      const buyData = await bot.buyFunction({ balance: base, currentPrice });
      if (buyData.quantity > 0) {
        await placeOrder({
          userName: user_name,
          side: "buy",
          price: currentPrice,
          amount: buyData.quantity,
          market: market,
        });
        status = "success";
        Logs.addLog({
            advice: "buy",
            currentPrice: currentPrice,
            userName: user_name,
            isBuySellSuccessful: status,
            balance: base,
            market: market,
            asset: asset,
            quantity: buyData.quantity
          })
      }
    }
  }
};

let cronTask;

const main = async () => {
  await db.connect();
  run();
  cron.schedule("* * * * *", () => {
    run();
  });
};

const port = process.env.PORT || 8000;
app.listen(port, function () {
  console.log("App listening at: ", port);
  main();
  keepAlive();
});
