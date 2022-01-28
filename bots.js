const { sell1 } = require("./market/sell");
const { buy1, buy2 } = require("./market/buy");
const bots = [
  {
    name: "test_101",
    buyFunction: buy1.buy,
    sellFunction: sell1.sell,
  },
  {
    name: "yash_bhuvan_EMA",
    buyFunction: buy2.buy,
    // sellFunction: sell1.sell,
    indicatorFunction: buy2.indicator,
  },
];

module.exports = { bots };
