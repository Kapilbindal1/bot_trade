"use strict";

var TechnicalIndicators = require("../db/schemas/technical_Indicators");
const ccxt = require('ccxt')

exports.getTechnicalIndicators = async (req, res) => {
  try {
    const techIndicators = await TechnicalIndicators.find({});
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
  while (true) {
    try {
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