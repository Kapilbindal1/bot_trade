

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
  console.log("averagePrice", averagePrice)
  return averagePrice
}


const sellCoins = (averagePrice, currentPrice) => {
  let calculateAverage = 0
  let profitPercentage = 0
  calculateAverage = averagePrice + (averagePrice * 15 / 100)
  profitPercentage = ((currentPrice - averagePrice) / averagePrice) * 100

  if (currentPrice > calculateAverage) {
    if (profitPercentage>=100) {
      console.log("Sell 100%")
      //return 100
    }
    else if (profitPercentage >=70) {
      console.log("Sell 70%")
      //return 70
    }
    else if (profitPercentage >=50) {
      console.log("Sell 50%")
//return 50
    }
    else if ( profitPercentage > 30) {
      console.log("Sell 30%")
      //return 30
    }
    else if (profitPercentage < 10) {
      console.log(" Sell 10%")
      return 10
    }
  }
  else {
    console.log("Not Sell")
  }
}

module.exports.averageRate = averageRate;
module.exports.sellCoins = sellCoins;