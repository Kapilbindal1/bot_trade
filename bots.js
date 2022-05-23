const { buy1, buy3 } = require("./market/buy");
const { sell1 } = require("./market/sell");

const bots = [
  {
    name: "matic_usdt_local",
    buyFunction: buy1.buy,
    sellFunction: sell1.sell,
    config: { asset: "MATIC", base: "USDT" }
  }
];

module.exports = { bots };
