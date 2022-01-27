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
  const botsArray = bots || []
  for (let i = 0; i < bots.length; i+= 1){
    const bot = bots[i];
    const user_name = bot.name;
    const currentPrice = await Market.getCurrentPrice();
    const { averageRate } = await Account.getAverageBuyRate({
      currentPrice,
      name: user_name
    });
    console.log("averageRate: ", averageRate, "  currentPrice: ", currentPrice, bot.name);
    const { market, asset, base } = await Account.getBalance(user_name);

    if (bot.indicatorFunction) {
      let { quantity, side } = await bot.indicatorFunction({
        balance: base,
        currentPrice
      });
      console.log("Quantity: ", quantity, " side: ", side);
      if (side === "sell") {
        if (quantity === 0) {
          const sellData = bot.sellFunction({
            averageBuyRate: averageRate,
            currentPrice,
            quantity: asset
          });
          quantity = sellData.quantity;
        }

        if (quantity > 0) {
          await placeOrder({
            userName: user_name,
            side: "sell",
            price: currentPrice,
            amount: quantity,
            market: market,
            averageBuyRate: averageRate
          });
          return;
        }
      } else if (side === "buy") {
        if (quantity === 0) {
          const buyData = await bot.buyFunction({
            balance: base,
            currentPrice
          });
          console.log("buyData.quantity: ", buyData.quantity);
          quantity = buyData.quantity;
        }
        if (quantity > 0) {
          await placeOrder({
            userName: user_name,
            side: "buy",
            price: currentPrice,
            amount: quantity,
            market: market
          });
        }
      }
    } else {
      let sellData = bot.sellFunction({
        averageBuyRate: averageRate,
        currentPrice,
        quantity: asset
      });

      if (sellData.quantity > 0) {
        await placeOrder({
          userName: user_name,
          side: "sell",
          price: currentPrice,
          amount: sellData.quantity,
          market: market,
          averageBuyRate: averageRate
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
          market: market
        });
      }
    }
  };
};

let cronTask;

const trade1function = async (
  bot,
  market,
  asset,
  base,
  averageRate,
  currentPrice,
  user_name
) => {
  let sellData = bot.sellFunction({
    averageBuyRate: averageRate,
    currentPrice,
    quantity: asset
  });

  if (sellData.quantity > 0) {
    await placeOrder({
      userName: user_name,
      side: "sell",
      price: currentPrice,
      amount: sellData.quantity,
      market: market,
      averageBuyRate: averageRate
    });
    return;
  }

  const buyData = await bot.buyFunction({ balance: base, currentPrice });
  if (buyData.quantity > 0) {
    await placeOrder({
      userName: user_name,
      side: "buy",
      price: currentPrice,
      amount: buyData.quantity,
      market: market
    });
  }
};

const trade2function = async (
  bot,
  market,
  asset,
  base,
  averageRate,
  currentPrice,
  user_name
) => {
  let { quantity, side } = bot.buyFunction({ balance: base, currentPrice });
  if (side === "buy") {
    await placeOrder({
      userName: user_name,
      side: "buy",
      price: currentPrice,
      amount: quantity,
      market: market
    });
  } else if (side === "sell") {
    let sellData = bot.sellFunction({
      averageBuyRate: averageRate,
      currentPrice,
      quantity: asset
    });

    if (sellData.quantity > 0) {
      await placeOrder({
        userName: user_name,
        side: "sell",
        price: currentPrice,
        amount: sellData.quantity,
        market: market,
        averageBuyRate: averageRate
      });
      return;
    }
  }
};

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
