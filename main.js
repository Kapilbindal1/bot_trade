const express = require("express");
const bodyParser = require("body-parser");
const Account = require("./account");
const Market = require("./market");
const { placeOrder } = require("./market/orders");
const { bots } = require("./bots");
const { keepAlive } = require("./alive");
var cors = require('cors');
const cron = require("node-cron");
const Logs = require("./db/logs");
// DB related imports
const db = require("./db");
// dotEnv.config();
// const token = process.env.BOT_TOKEN;
// const bot = new TelegramBot(token, { polling: true });
const corsOpts = {
  origin: '*',

  methods: [
    'GET',
    'POST',
  ],

  allowedHeaders: [
    'Content-Type',
  ],
};

const app = express();
app.use(cors(corsOpts));

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
    let status = "progress";
    if (bot.indicatorFunction) {
      let { advice } = await bot.indicatorFunction({
        balance: base,
        currentPrice,
        asset,
      });
      Logs.addLog({
        advice: advice,
        currentPrice: currentPrice,
        userName: user_name,
        isBuySellSuccessful: status,
        balance: base,
        market: market,
        asset: asset,
        quantity: 0
      })
      // console.log(user_name, " Advice: ", advice, currentPrice);
      console.log("data123===>", {
        user_name,
        currentPrice,
        averageRate,
        market,
        asset,
        advice,
        base,
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
        const { quantity } = await bot.buyFunction({
          balance: base,
          currentPrice,
        });
        console.log("data===>", {
          user_name,
          currentPrice,
          averageRate,
          market,
          asset,
          advice,
          base,
          quantity,
        });
        if (quantity > 0) {
          await placeOrder({
            userName: user_name,
            side: "buy",
            price: currentPrice,
            amount: quantity,
            market: market,
          });
          status = "success";
          Logs.addLog({
            advice: advice,
            currentPrice: currentPrice,
            userName: userName,
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
      console.log("buyData.quantity: ", buyData.quantity);
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

var routes=require('./usersApi/routes')
routes(app)
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
