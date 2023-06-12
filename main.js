const express = require("express");
const bodyParser = require("body-parser");
const Account = require("./account");
const Market = require("./market");
const DefaultConfig = require("./constants/config");
const { placeOrder } = require("./market/orders");
const { bots } = require("./bots");
const { keepAlive } = require("./alive");
const {
  shouldSell,
  sellAdvice,
  getDescription,
  pendingAsset
} = require("./utils/mainUtils");
const Transactions = require("./db/transactions");
const config = require("./constants/config");
const Logs = require("./db/logs");
const cron = require("node-cron");
const db = require("./db");

const app = express();
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(bodyParser.json({ limit: "50mb" }));

const run = async () => {
  console.log("************ RUN ***************")
  for (let i = 0; i < bots.length; i += 1) {
    const bot = bots[i];
    const user_name = bot.name;
    const currentPrice = await Market.getCurrentPrice({
      ...DefaultConfig,
      ...bot.config
    });
    const { averageRate } = await Account.getAverageBuyRate({
      currentPrice,
      name: user_name,
      config: {
        ...DefaultConfig,
        ...bot.config
      }
    });

    
    console.log("averageRate: ", averageRate);

    const { market, asset, base } = await Account.getBalance(user_name, {
      ...DefaultConfig,
      ...bot.config
    });
    // return;
    let status = "progress";
    if (asset > 0) {
      let sellData = bot.sellFunction({
        averageBuyRate: averageRate,
        currentPrice,
        quantity: asset
      });
      console.log("Sell Data: ", {
        sellData,
        averageRate,
        currentPrice,
        asset
      });

      if (sellData.quantity > 0) {
        try {
          await placeOrder({
            userName: user_name,
            side: "sell",
            price: currentPrice,
            amount: sellData.quantity,
            market: market,
            averageBuyRate: averageRate,
            config: { ...DefaultConfig, ...bot.config }
          });
          status = "success";
        } catch (ex) {
          status = "failure";
        }

        return;
      }
    }

    if (base > 0) {
      const buyData = await bot.buyFunction({
        balance: base,
        currentPrice,
        config: { ...DefaultConfig, ...bot.config }
      });
      console.log("Buy Data: ", { buyData, base, currentPrice });

      if (buyData.quantity > 0) {
        try {
          await placeOrder({
            userName: user_name,
            side: "buy",
            price: currentPrice,
            amount: buyData.quantity,
            market: market,
            config: { ...DefaultConfig, ...bot.config }
          });
          status = "success";
        } catch (ex) {
          status = "failure";
        }
      }
    }
  }
};

let cronTask;

const main = async () => {
  await db.connect();
  run();
  if (cronTask) {
    cronTask.stop()
  }
  cronTask = cron.schedule("*/2 * * * *", () => {
    run();
  });
};

const port = process.env.PORT || 8000;
app.listen(port, function () {
  console.log("App listening at: ", port);
  main();
  keepAlive();
});
