const sellCoins = (averagePrice, currentPrice, totalAsset,) => {
  let totalValue = currentPrice * totalAsset;
  if (totalValue >= 10) {
    if (currentPrice > averagePrice) {
      let sellRatio = 0;
      let profitPercentage = ((currentPrice - averagePrice) / averagePrice) * 100
      if (profitPercentage >= 100) {
        return totalAsset
      }
      else if (profitPercentage >= 70) {
        sellRatio = 0.7;
      }
      else if (profitPercentage >= 50) {
        sellRatio = 0.5;
      }
      else if (profitPercentage > 30) {
        sellRatio = 0.3;
      }
      else if (profitPercentage < 10) {
        sellRatio = 0.1;
      }
      if (sellRatio > 0) {
        let coinToSell = sellRatio * totalAsset;
        const leftSellcoins = totalAsset - coinToSell;
        temp = currentPrice * leftSellcoins
        let sellCoinCheck=temp.currentPrice
        if (sellCoinCheck > minRequired) {
          return temp > 10 ? coinToSell : totalAsset
        }
        
      }
    }
  }
  return 0;
}

module.exports = { sellCoins }
