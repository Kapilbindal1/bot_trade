const getMyTrades = async (binanceClient,market,timestamp) =>{
  if (binanceClient.has['fetchMyTrades']) {
    const trades = await binanceClient.fetchMyTrades(
      market,
      timestamp
    )
    return trades
  }
  return []
}

const averageRate = (trades) => {
  let qty = 0;
  let cost = 0;
  let averagePrice;

  trades.forEach(item => {
    let qtyTotal = (Number(item.info.qty))
    let costTotal = item.cost

    qty = qty + qtyTotal
    cost = cost + costTotal

  });
  averagePrice = cost / qty
  console.log("averagePrice", averagePrice,qty)
  return {averagePrice,qty}
}




module.exports = {averageRate,getMyTrades};
