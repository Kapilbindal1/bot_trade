const { buy1, buy3 } = require("./market/buy");
const { sell1 } = require("./market/sell");

const bots = [
  {
    name: "matic_usdt",
    buyFunction: buy1.buy,
    sellFunction: sell1.sell,
    config: { asset: "MATIC", base: "USDT" }
  },
  {
    name: "ens_usdt",
    buyFunction: buy1.buy,
    sellFunction: sell1.sell,
    config: { asset: "ENS", base: "USDT" }
  },
  {
    name: "eth_usdt",
    buyFunction: buy1.buy,
    sellFunction: sell1.sell,
    config: { asset: "ETH", base: "USDT" }
  }
];

module.exports = { bots };
