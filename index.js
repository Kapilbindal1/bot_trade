const dotEnv = require("dotenv");
const ccxt = require("ccxt");
const axios = require("axios");
const http = require("http");

const storage = require('./storage');
const matic  = require("./matic");

let interval;
let intervalMatic;

let context;

const tick = async (config, binanceClient) => {
  try {
    const { asset, base, allocation, spread } = config;
    const market = `${asset}/${base}`;

    const orders = await binanceClient.fetchOpenOrders(market);
    // console.log("orders: ", orders.length);

    orders.forEach(async (order) => {
      await binanceClient.cancelOrder(order.id, order.symbol);
    });

    // return;

    const result = await axios.get(
      "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin%2Ctether&vs_currencies=usd"
    );
    const marketPrice = result.data.bitcoin.usd / result.data.tether.usd;

    // console.log("marketPrice: ", marketPrice);

    const sellPrice = marketPrice * (1 + spread);
    const buyPrice = marketPrice * (1 - spread);

    let orderbook = await binanceClient.fetchOrderBook(market, 2);
    let bid = orderbook.bids.length ? orderbook.bids[0][0] : undefined;
    let ask = orderbook.asks.length ? orderbook.asks[0][0] : undefined;
    let spreadValue = bid && ask ? ask - bid : undefined;
    // console.log("market price", { bid, ask, spread: spreadValue });

    const balances = await binanceClient.fetchBalance();
    const assetBalance = balances.free[asset];
    const baseBalance = balances.free[base];

    const sellVolume = 0.0026708 * allocation;
    const buyVolume = 25 / marketPrice;
    // console.log("buyVolume: ", buyVolume)
    const mySatificationSell = 54950.53;
    const mySatificationBuy = 54840.53;
    if (assetBalance > 0.0022)
      await binanceClient.createLimitSellOrder(market, sellVolume, sellPrice);
    if (baseBalance > 30)
      await binanceClient.createLimitBuyOrder(market, buyVolume, buyPrice);
    const display = {
      SELL: {
        Volume: sellVolume,
        Price: sellPrice
      },
      BUY: {
        Volume: buyVolume,
        Price: buyPrice
      }
    };
    // console.log("-------");
    // console.table(display);
  } catch (ex) {
    console.log("Exception: ", ex);
  }
};

const run = () => {
  const config = {
    asset: "BTC",
    base: "USDT",
    allocation: 0.1,
    spread: 0.005,
    tickInterval: 40000
  };

  dotEnv.config();

  const binanceClient = new ccxt.binance({
    apiKey: process.env.API_KEY,
    secret: process.env.API_SECRET
  });

  matic.tick(binanceClient);
  if (intervalMatic) {
    clearInterval(intervalMatic);
    intervalMatic = null;
  }
  intervalMatic = setInterval(matic.tick, config.tickInterval, binanceClient);
  return;

  tick(config, binanceClient);
  if (interval) {
    clearInterval(interval);
    interval = null;
  }
  interval = setInterval(tick, config.tickInterval, config, binanceClient);
};

context = storage.initializeAndLoadFile();
run();
http
  .createServer(function (req, res) {
    // run();
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("Hello World!");
  })
  .listen(process.env.PORT || 3000);
