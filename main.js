const Account = require("./account");
const Market = require("./market");
const RSI = require("./market/indicators/rsi");
const BollingerBands = require("./market/indicators/bollinger-bands");
const EMA = require("./market/indicators/ema");
const MACD = require("./market/indicators/macd");
const SupportLine = require("./market/indicators/support-line");
const ResistanceLine = require("./market/indicators/resistance-line");

const run = async () => {
  const currentPrice = await Market.getCurrentPrice();
  const { averageRate } = await Account.getAverageBuyRate(currentPrice);
  const { asset } = await Account.getBalance();

  let sellData = Market.makeSell(averageRate, currentPrice, asset);
  if (sellData.quantity <= 0) {
    const averageBotRate = await Account.getAverageBotBuyRate(currentPrice);
    // console.log("averageBotRate: ", averageBotRate)
    sellData = Market.makeSell(
      averageBotRate.averageRate,
      currentPrice,
      averageBotRate.balanceCount
    );
  }

  let historicalData = await Market.getHistoricalData();
  // console.log("historicalData",historicalData);

  let closedData =
    (await historicalData?.length) &&
    historicalData.map((trade) => trade.close);
  let lowData =
    (await historicalData?.length) && historicalData.map((trade) => trade.low);
  let highData =
    (await historicalData?.length) && historicalData.map((trade) => trade.high);

  let RSIResult = await RSI.applyRSI(closedData);
  let BollingerBandsResult = await BollingerBands.applyBollingerBands(
    closedData
  );
  let MACDResult = await MACD.applyMACD(closedData);
  let EMAResult = await EMA.applyEMA(closedData);
  let SupportLineResult = await SupportLine.applySupportLine(lowData);
  let ResistanceLineResult = await ResistanceLine.applyResistanceLine(highData);

  console.log("INDICATORS: ", {
    closedData,
    RSIResult,
    // BollingerBandsResult,
    // MACDResult,
    // EMAResult,
    // SupportLineResult,
    // ResistanceLineResult,
  });

  // if (sellCoins === 0) {
  // const botTrades = await binanceClient.fetchMyTrades(
  //   market,
  //   botTradingTime
  // );
  // const averagePrice = average.averageRate(botTrades);
  // const sellCoins = sell.sellCoins(
  //   averageRate,
  //   currentPrice
  //   // assetBalance,
  // );
  // }
};

run();
module.exports = { run };
