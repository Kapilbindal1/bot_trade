const { sell1 } = require("./market/sell");
const { buy1 } = require("./market/buy");
const bots = [
  {
    name: "test12345",
    buyFunction: buy1.buy,
    sellFunction: sell1.sell,
  }
]

module.exports = { bots }