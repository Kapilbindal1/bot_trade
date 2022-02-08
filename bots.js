const { buy1, buy3 } = require("./market/buy");
const { sell1 } = require("./market/sell");

const bots = [
  {
    name: "testing_transactions_logs",
    buyFunction: buy3.buy,
    indicatorFunction: buy3.indicator,
  },
];

module.exports = { bots };
