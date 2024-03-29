const dotEnv = require("dotenv");
dotEnv.config();

const baseConfig = {
  asset: process.env.ASSET,
  base: process.env.BASE,
  BOT_TRADING_TIMESTAMP: 1636341560708,
  initialUserBalance: 200,
  minimumBuy: 10,
  buyLot: 10,
};

module.exports = {
  ...baseConfig,
  market: `${baseConfig.asset}/${baseConfig.base}`,
};
