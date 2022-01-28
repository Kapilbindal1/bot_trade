const express = require("express");
const bodyParser = require("body-parser");
const Account = require("./account");
const Market = require("./market");
const { placeOrder } = require("./market/orders");
const { bots } = require("./bots");
const Main = require("./utils/mainUtils");
const { EMA, MACD } = require("./market/indicators");
const { keepAlive } = require("./alive");

const cron = require("node-cron");

// DB related imports
const db = require("./db");
// dotEnv.config();
// const token = process.env.BOT_TOKEN;
// const bot = new TelegramBot(token, { polling: true });

const app = express();
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(bodyParser.json({ limit: "50mb" }));

const run = async () => {
  const botsArray = bots || [];
  for (let i = 0; i < bots.length; i += 1) {
    const bot = bots[i];
    const user_name = bot.name;
    const currentPrice = await Market.getCurrentPrice();
    const { averageRate } = await Account.getAverageBuyRate({
      currentPrice,
      name: user_name,
    });

    const { market, asset, base } = await Account.getBalance(user_name);

    if (bot.indicatorFunction) {
      let { advice } = await bot.indicatorFunction({
        balance: base,
        currentPrice,
        asset,
      });
      if (advice === "sell" && asset > 0) {
        await placeOrder({
          userName: user_name,
          side: "sell",
          price: currentPrice,
          amount: asset,
          market: market,
          averageBuyRate: averageRate,
        });
      } else if (advice === "buy") {
        const { quantity } = await bot.buyFunction({
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
        return;
      }

      const buyData = await bot.buyFunction({ balance: base, currentPrice });
      console.log("buyData.quantity: ", buyData.quantity);
      if (buyData.quantity > 0) {
        await placeOrder({
          userName: user_name,
          side: "buy",
          price: currentPrice,
          amount: buyData.quantity,
          market: market,
        });
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
