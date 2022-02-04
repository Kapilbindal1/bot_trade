const { buy1, buy3 } = require("./market/buy");
const { sell1 } = require("./market/sell");

const bots = [
  {
    name: "test_301",
    buyFunction: buy1.buy,
    sellFunction: sell1.sell,
  },
  {
    name: "THREE_INDICATORS_FIDA",
    buyFunction: buy3.buy,
    indicatorFunction: buy3.indicator,
  },
];

module.exports = { bots };
