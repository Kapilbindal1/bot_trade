const { sell1 } = require("./market/sell");
const { buy1, buy2 } = require("./market/buy");
const bots = [
  {
    name: "testing123",
    buyFunction: buy2.buy,
    sellFunction: sell1.sell,
  },
];

module.exports = { bots };
