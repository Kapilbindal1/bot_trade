const baseConfig = {
  asset: "MATIC",
  base: "USDT",
  BOT_TRADING_TIMESTAMP: 1636341560708
};

module.exports = { ...baseConfig, market: `${baseConfig.asset}/${baseConfig.base}` };
