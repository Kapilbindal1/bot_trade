const { buy1, buy3 } = require("./market/buy");
const { sell1 } = require("./market/sell");

const bots = [
  {
    name: "binance_1",
    buyFunction: buy1.buy,
    sellFunction: sell1.sell,
  },
];

module.exports = { bots };
