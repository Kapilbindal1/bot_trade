const { buy2 } = require("./market/buy");

const bots = [
  {
    name: "Yash_Bhuvan_SOL",
    buyFunction: buy2.buy,
    indicatorFunction: buy2.indicator,
  },
];

module.exports = { bots };
