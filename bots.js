const { sell1 } = require("./market/sell");
const { buy1, buy2 } = require("./market/buy");
const bots = [
  {
    name: "test_1",
    buyFunction: buy1.buy,
    sellFunction: sell1.sell,
  }
];

module.exports = { bots };
