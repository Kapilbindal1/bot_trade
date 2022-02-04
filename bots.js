const { buy1, buy3 } = require("./market/buy");
const { sell1 } = require("./market/sell");

const bots = [
  {
    name: "THREE_INDICATORS(with loggers)",
    buyFunction: buy3.buy,
    indicatorFunction: buy3.indicator,
  },
];

module.exports = { bots };
