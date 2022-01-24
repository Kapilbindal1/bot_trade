const baseConfig = {
  asset: "MATIC",
  base: "USDT"
};


module.exports = { ...baseConfig, market: `${baseConfig.asset}/${baseConfig.base}` };
