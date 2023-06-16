const { buy1, buy3, buyROC } = require("./market/buy");
const { sell1 } = require("./market/sell");

const bots = [
  {
    name: "eth_usdt",
    buyFunction: buy1.buy,
    sellFunction: sell1.sell,
    config: { asset: "ETH", base: "USDT", market: 'ETH/USDT' }
  },
  {
    name: "matic_usdt",
    buyFunction: buy1.buy,
    sellFunction: sell1.sell,
    config: { asset: "MATIC", base: "USDT", market: 'MATIC/USDT' }
  },
  {
    name: "eth_usdt_ROC",
    buyFunction: buyROC.buy,
    sellFunction: sell1.sell,
    config: { asset: "ETH", base: "USDT", market: 'ETH/USDT', buyLot: 20 }
  },
  {
    name: "matic_usdt_ROC",
    buyFunction: buyROC.buy,
    sellFunction: sell1.sell,
    config: { asset: "MATIC", base: "USDT", market: 'MATIC/USDT', buyLot: 20 }
  },
  {
    name: "ant_usdt_ROC",
    buyFunction: buyROC.buy,
    sellFunction: sell1.sell,
    config: { asset: "ANT", base: "USDT", market: 'ANT/USDT', buyLot: 20 }
  },
  {
    name: "ant_usdt",
    buyFunction: buy1.buy,
    sellFunction: sell1.sell,
    config: { asset: "ANT", base: "USDT", market: 'ANT/USDT', buyLot: 20 }
  },
  {
    name: "shib_usdt",
    buyFunction: buy1.buy,
    sellFunction: sell1.sell,
    config: { asset: "SHIB", base: "USDT", market: 'SHIB/USDT', buyLot: 20 }
  },
  {
    name: "shib_usdt_ROC",
    buyFunction: buyROC.buy,
    sellFunction: sell1.sell,
    config: { asset: "SHIB", base: "USDT", market: 'SHIB/USDT', buyLot: 20 }
  }, {
    name: "doge_usdt_ROC",
    buyFunction: buyROC.buy,
    sellFunction: sell1.sell,
    config: { asset: "DOGE", base: "USDT", market: 'DOGE/USDT', buyLot: 20 }
  },
  {
    name: "doge_usdt",
    buyFunction: buy1.buy,
    sellFunction: sell1.sell,
    config: { asset: "DOGE", base: "USDT", market: 'DOGE/USDT', buyLot: 20 }
  },
  {
    name: "AVAX_usdt_ROC",
    buyFunction: buyROC.buy,
    sellFunction: sell1.sell,
    config: { asset: "AVAX", base: "USDT", market: 'AVAX/USDT', buyLot: 20 }
  },
  {
    name: "COSMOS_usdt_ROC",
    buyFunction: buyROC.buy,
    sellFunction: sell1.sell,
    config: { asset: "ATOM", base: "USDT", market: 'ATOM/USDT', buyLot: 20 }
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
