const { buy1, buy2 } = require("./market/buy");
const { sell1 } = require("./market/sell");

const bots = [
  {
    name: "test_201",
    buyFunction: buy1.buy,
    sellFunction: sell1.sell,
  },
  {
    name: "Yash_Bhuvan_SOL",
    buyFunction: buy2.buy,
    indicatorFunction: buy2.indicator,
  },
];

module.exports = { bots };
