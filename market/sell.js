

const MINIMUM_SELL_VALUE = 10;

const getQuantityToSell = (averagePrice, currentPrice, quantity) => {
  let totalValue = currentPrice * quantity;
  // We have to sell at least 10 USDT
  if (totalValue >= MINIMUM_SELL_VALUE) {
    if (currentPrice > averagePrice) {
      let sellRatio = 0;
      let profitPercentage =
        ((currentPrice - averagePrice) / averagePrice) * 100;
      if (profitPercentage >= 100) {
        return totalAsset;
      } else if (profitPercentage >= 70) {
        sellRatio = 0.7;
      } else if (profitPercentage >= 50) {
        sellRatio = 0.5;
      } else if (profitPercentage > 30) {
        sellRatio = 0.3;
      } else if (profitPercentage < 10) {
        sellRatio = 0.1;
      }
      if (sellRatio > 0) {
        let coinToSell = sellRatio * totalAsset;
        const leftSellCoins = totalAsset - coinToSell;
        const leftCoinValue = currentPrice * leftSellCoins;
        const coinsToSell = leftCoinValue < MINIMUM_SELL_VALUE ? totalAsset : coinToSell;
        return coinsToSell * currentPrice < MINIMUM_SELL_VALUE ? MINIMUM_SELL_VALUE/currentPrice : coinsToSell
      }
    }
  }
  return 0;
};

const makeSell = (averagePrice, currentPrice, quantity) => {
  const quantityToSell = getQuantityToSell(averagePrice, currentPrice, quantity)
  // console.log("quantityToSell: ", quantityToSell)

  return { quantity: quantityToSell }
};

module.exports = { makeSell };
