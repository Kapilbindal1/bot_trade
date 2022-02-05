const { buy1, buy3, buy4, buy5 } = require("./market/buy");
const { sell1 } = require("./market/sell");

const bots = [
  {
    name: "yash_bhuvan_SMA",
    buyFunction: buy5.buy,
    indicatorFunction: buy5.indicator,
  },
];

module.exports = { bots };
