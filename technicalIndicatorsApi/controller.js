"use strict";

var TechnicalIndicators = require("../db/schemas/technical_Indicators");
const ccxt = require("ccxt");
// const exchange = new ccxt.binance();

exports.getTechnicalIndicators = async (req, res) => {
  try {
    const techIndicators = await TechnicalIndicators.find({});
    console.log(techIndicators, "techIndicators1234");
    res.send({ success: true, data: techIndicators });
  } catch (err) {
    return { success: false, err: err };
    
  }
};


exports.getMarketCurrencies = async (req, res) => {
  let binance = new ccxt.binance();
  let marketPrices = await binance.fetchTickers();
  res.send({ success: true, data: marketPrices });
};

exports.getMarketPrices = async (req, res) => {
  // console.log(exchange, 'exchange');
  while (true) {
    try {
      // Only single subscription request?
      // let ticker = await exchange.fetchTicker();
      // console.log(ticker, 'ticker');
      // res.send({ success: true, data: ticker });
    }
    catch (e) {
      console.log(e);
      break;
    }
  }
}