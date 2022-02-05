const { buy1, buy3, buy4 } = require("./market/buy");
const { sell1 } = require("./market/sell");

const bots = [
  {
    name: "yash_bhuvan_EMA_MACD",
    buyFunction: buy4.buy,
    indicatorFunction: buy4.indicator,
  },
];

module.exports = { bots };
