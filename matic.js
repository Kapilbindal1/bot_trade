const axios = require("axios");

const constants = require("./constant");
const account = require("./utils/account");
const storage = require("./storage");

let context;
let mainData;

const config = {
  asset: "MATIC",
  base: "USDT",
  buyAfterTick: 200
};

const market = `${config.asset}/${config.base}`;

const initialize = async (binanceClient) => {
  const { asset, base } = config;
  const market = `${asset}/${base}`;
  mainData = storage.initializeAndLoadFile() || {};
  context = mainData[asset] || {};

  // if (!context || !context.averageBuyRate) {
  if (binanceClient.has["fetchMyTrades"]) {
    const trades = await binanceClient.fetchMyTrades(
      market,
      context && context.lastUpdatedAt
        ? context.lastUpdatedAt
        : new Date().getTime() - constants.YEAR
    );
    console.log(trades, new Date(context.lastUpdatedAt))
    const averageRate = account.averageRate(trades, context);
    context = { ...context, ...averageRate };
    mainData = { ...mainData, [asset]: { ...context } }
    storage.saveFile(mainData);
  }
  // }
};

const cancelPreviousOrders = async (binanceClient) => {
  const { asset, base } = config;
  const market = `${asset}/${base}`;
  const orders = await binanceClient.fetchOpenOrders(market);

  orders.forEach(async (order) => {
    await binanceClient.cancelOrder(order.id, order.symbol);
  });
};

const buyOrder = async (config, binanceClient) => {
  const { marketPrice, ask, baseBalance } = config;
  const myBuyPrice =
    (!!context.sell.averageSellRate
      ? context.sell.averageSellRate
      : context.buy.averageBuyRate) * 0.985;
  const marketBuyPrice = Math.max(marketPrice, ask);
  // console.log(context)
  if (baseBalance > 10) {
    const buyVolume = 10 / marketPrice;
    await binanceClient.createLimitBuyOrder(
      market,
      10,
      Math.min(marketBuyPrice, myBuyPrice) * 1
    );
  }

  const analysis = { tick: 0, price: 0, ...(context.analysis || {}) };
  if (analysis.tick < config.buyAfterTick) {
    const upPrice = (analysis.price * analysis.tick + marketPrice) / (analysis.tick + 1);
    context.analysis = { ...analysis, price: upPrice, tick: analysis.tick + 1 }
    mainData = { ...mainData, [asset]: { ...context } }
    storage.saveFile(mainData);
  }
};

const getPreviousAveragePrice = async (days = 60) => {
  const resultHistory = await axios.get(`https://api.coingecko.com/api/v3/coins/matic-network/market_chart?vs_currency=usd&days=${days}`);
  const result = await axios.get(
    "https://api.coingecko.com/api/v3/simple/price?ids=matic-network%2Ctether&vs_currencies=usd"
  );
  const tetherPrice = result.data.tether.usd; 
  const marketPrice =
    result.data["matic-network"].usd / result.data.tether.usd;
  // console.log("resultHistory: ", resultHistory.data.prices);
  let sumPrice = 0;
  let count = 0;
  let monthSumPrice = 0;
  let monthCount = 0;
  let week2SumPrice = 0;
  let week2Count = 0;
  let weekSumPrice = 0;
  let weekCount = 0;
  let h24SumPrice = 0;
  let h24Count = 0;
  let h4SumPrice = 0;
  let h4Count = 0;

  let hourSumPrice = 0;
  let hourCount = 0;

  const currentDate = new Date();

  (resultHistory.data.prices || []).forEach((arr) => {
    if (arr.length > 1) {
      const value = arr[1];
      sumPrice += value;
      count += 1;
      const d = new Date(arr [0]);
      const hours = Math.abs(currentDate - d) / 36e5;
      if (hours < 24 * 30) {
        monthSumPrice += value;
        monthCount += 1;
      }
      if (hours < 24 * 7 * 2) {
        week2SumPrice += value;
        week2Count += 1;
      }
      if (hours < 24 * 7) {
        weekSumPrice += value;
        weekCount += 1;
      }
      if (hours < 24) {
        h24SumPrice += value;
        h24Count += 1;
      }
      if (hours < 4) {
        h4SumPrice += value;
        h4Count += 1;
      }
      if (hours < 1) {
        hourSumPrice += value;
        hourCount += 1;
      }
    }
  })
  return {
    overall: sumPrice/count/tetherPrice,
    month: monthSumPrice/monthCount/tetherPrice,
    week2: week2SumPrice/week2Count/tetherPrice,
    week: weekSumPrice/weekCount/tetherPrice,
    hour24: h24SumPrice/h24Count/tetherPrice,
    hour4: h4SumPrice/h4Count/tetherPrice,
    hour: hourSumPrice/hourCount/tetherPrice,
    current: marketPrice,
    tetherPrice
  };

} 
const tick = async (binanceClient) => {
  try {
    const { asset, base } = config;
    const market = `${asset}/${base}`;

    await initialize(binanceClient);
    await cancelPreviousOrders(binanceClient);

    const result = await axios.get(
      "https://api.coingecko.com/api/v3/simple/price?ids=matic-network%2Ctether&vs_currencies=usd"
    );
    const marketPrice =
      result.data["matic-network"].usd / result.data.tether.usd;
    // console.log("marketPrice: ", marketPrice);
    const avgHistoryPrice = await getPreviousAveragePrice();
    console.log(avgHistoryPrice)

    const balances = await binanceClient.fetchBalance();
    const assetBalance = balances.free[asset];
    const baseBalance = balances.free[base];

    let orderbook = await binanceClient.fetchOrderBook(market, 2);
    let bid = orderbook.bids.length ? orderbook.bids[0][0] : undefined;
    let ask = orderbook.asks.length ? orderbook.asks[0][0] : undefined;

    // Place order for SELL
    // if (assetBalance >= 9 && context.buy.averageBuyRate) {
    //   // let spreadValue = bid && ask ? ask - bid : undefined;

    //   const mySellPrice = context.buy.averageBuyRate * 1.04;
    //   const marketSellPrice = Math.max(marketPrice, bid);
    //   await binanceClient.createLimitSellOrder(
    //     market,
    //     assetBalance / 2 > 10 ? assetBalance / 2 : assetBalance,
    //     Math.max(marketSellPrice, mySellPrice) * 1.0
    //   );
    // }

    // // Place order for Buy
    // buyOrder({ marketPrice, ask, baseBalance }, binanceClient);

    // if (binanceClient.has["fetchMyTrades"]) {
    //   const time = new Date().getTime();
    //   const trades = await binanceClient.fetchMyTrades(
    //     market,
    //     time - constants.MONTH
    //   );
    //   // const averageBuyRate = account.averageBuyRate(trades)
    //   console.log("trade: ", trades);

    //   // const orders = await binanceClient.fetchOpenOrders(market);
    //   // console.log("orders: ", orders);
    // }
  } catch (ex) {
    console.log("MATIC Tick: ", ex);
  }
};

module.exports.tick = tick;
