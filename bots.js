const { sell1 } = require("./market/sell");
const { buy1, buy2 } = require("./market/buy");
const bots = [
  {
    name: "test_089",
    buyFunction: buy1.buy,
    sellFunction: sell1.sell,
  },
  {
    name: "test_90",
    buyFunction: buy2.buy,
    sellFunction: sell1.sell,
    indicatorFunction: buy2.buy
  },
];

module.exports = { bots };
