const dotEnv = require('dotenv')
const ccxt = require('ccxt')

const config = {
  asset: 'FTM',
  base: 'USDT',
  allocation: 0.1,
  spread: 0.005,
  tickInterval: 40000,
}
const market = `${config.asset}/${config.base}`
dotEnv.config()

const binanceClient = new ccxt.binance({
  apiKey: process.env.API_KEY,
  secret: process.env.API_SECRET,
})

module.exports = { config, market, binanceClient }
