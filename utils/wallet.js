const botTradingTime = 1636341560708

const getAssetQuantity = async (config, market,binanceClient) => {
  try {
    const { asset, base } = config

    const balances = await binanceClient.fetchBalance()
    const assetBalance = balances.total[asset]
    const baseBalance = balances.total[base]

    const assetQuantity = {
      market,
      assetBalance,
      baseBalance,
    }
    return assetQuantity
  } catch (ex) {
    console.log('Exception: ', ex)
  }
}

module.exports = {getAssetQuantity}
