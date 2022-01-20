const ccxt = require("ccxt");
const account = require("./utils/account");
const constants = require("./constant");

exports.averagePrice = async function(req, res) {
  const { asset, base, tmp } = req.body;
  if (!asset || !base || !tmp) {
    return res.json({ success: false, message: "Invalid data." })
  }
  
  if (tmp !== process.env.SECRET_VAR) {
    return res.json({ success: false, message: "Unauthorized." })
  }
  
  const market = `${asset}/${base}`;
  const binanceClient = new ccxt.binance({
    apiKey: process.env.API_KEY,
    secret: process.env.API_SECRET
  });

  const orders = await binanceClient.fetchClosedOrders(market, new Date().getTime() - 2 * constants.YEAR)
  // console.log("orders: ", orders)

  // const trades = await binanceClient.fetchMyTrades(
  //   market, new Date().getTime() - 2 * constants.YEAR
  // );
  const averageRate = account.averageRateWithoutContext(orders);
  return res.json({ success: true, ...averageRate })
}