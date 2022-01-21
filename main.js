const constants = require('./constant')
const average = require('./utils/average')
const wallet = require('./utils/wallet')
const tradeConstants = require('./utils/tradeConstants')
const sell = require("./utils/sell")

const botTradingTime = 1636341560708

const getCurrentPrice = async (market, binanceClient) => {
  try {
    let orderbook = await binanceClient.fetchOrderBook(market, 2)
    let currentPrice =
      orderbook?.bids.length && orderbook.bids[0].length && orderbook.bids[0][0]

    const assetCurrentPrice = {
      market,
      currentPrice,
    }
    return assetCurrentPrice
  } catch (ex) {
    console.log('Exception: ', ex)
  }
}

const run = async () => {
  const { config, market, binanceClient } = tradeConstants
  if (binanceClient.has['fetchMyTrades']) {
    const trades = await binanceClient.fetchMyTrades(
      market,
      new Date().getTime() - constants.YEAR,
    )
    const { currentPrice } = await getCurrentPrice(market, binanceClient)
    const { assetBalance } = await wallet.getAssetQuantity(
      config,
      market,
      binanceClient,
    )

    const averagePrice = average.averageRate(trades)

    const sellCoins = sell.sellCoins(
      averagePrice,
      currentPrice,
      // assetBalance,
    )
    if (sellCoins === 'Not Sell') {
      const botTrades = await binanceClient.fetchMyTrades(
        market,
        botTradingTime,
      )
      console.log('botTrades', botTrades)
      const averagePrice = average.averageRate(botTrades)
      const sellCoins = sell.sellCoins(
        averagePrice,
        currentPrice,
        // assetBalance,
      )
    }
  }
}

run()
module.exports = { run }
