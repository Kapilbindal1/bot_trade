const { sell1 } = require("./market/sell");
const { buy1, buy2 } = require("./market/buy");
const bots = [
  {
    name: "yash_bhuvan_EMA_singleBuy",
    buyFunction: buy2.buy,
    sellFunction: sell1.sell,
    indicatorFunction: buy2.indicator,
  },
];

module.exports = { bots };
