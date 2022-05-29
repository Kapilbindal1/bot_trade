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
  },
  {
    name: "matic_usdt_30m",
    buyFunction: buy1.buy_30m,
    sellFunction: sell1.sell,
    config: { asset: "MATIC", base: "USDT" }
  },
  {
    name: "ens_usdt_30m",
    buyFunction: buy1.buy_30m,
    sellFunction: sell1.sell,
    config: { asset: "ENS", base: "USDT" }
  },
  {
    name: "eth_usdt_30m",
    buyFunction: buy1.buy_30m,
    sellFunction: sell1.sell,
    config: { asset: "ETH", base: "USDT" }
  },
  {
    name: "matic_usdt_instant",
    buyFunction: buy1.buy_InstantDown,
    sellFunction: sell1.sell,
    config: { asset: "MATIC", base: "USDT" }
  },
  {
    name: "ens_usdt_instant",
    buyFunction: buy1.buy_InstantDown,
    sellFunction: sell1.sell,
    config: { asset: "ENS", base: "USDT" }
  },
  {
    name: "eth_usdt_instant",
    buyFunction: buy1.buy_InstantDown,
    sellFunction: sell1.sell,
    config: { asset: "ETH", base: "USDT" }
  },
  {
    name: "bean_usdt_instant",
    buyFunction: buy1.buy_InstantDown,
    sellFunction: sell1.sell,
    config: { asset: "BEAM", base: "USDT" }
  },
  {
    name: "fida_usdt_instant",
    buyFunction: buy1.buy_InstantDown,
    sellFunction: sell1.sell,
    config: { asset: "FIDA", base: "USDT" }
  },
  {
    name: "bnb_usdt_instant",
    buyFunction: buy1.buy_InstantDown,
    sellFunction: sell1.sell,
    config: { asset: "BNB", base: "USDT" }
  },
  {
    name: "sol_usdt_instant",
    buyFunction: buy1.buy_InstantDown,
    sellFunction: sell1.sell,
    config: { asset: "SOL", base: "USDT" }
  },
];

// const bots = [
//   {
//     name: "matic_usdt_instant",
//     buyFunction: buy1.buy_InstantDown,
//     sellFunction: sell1.sell,
//     config: { asset: "MATIC", base: "USDT" }
//   }
// ];

module.exports = { bots };
