

const MINIMUM_SELL_VALUE = 10;

const getQuantityToSell = async (averagePrice, currentPrice, quantity) => {
  let totalValue = currentPrice * quantity;
  // We have to sell at least 10 USDT
  if (totalValue >= MINIMUM_SELL_VALUE) {



    let sellRatio = 0;


    let historicalData_5m = await Market.getHistoricalData({ config });
    let indicatorInputData_5m = MainUtils.getCloseInputData(historicalData_5m);
  
    let ROC_result_12 = ROC.calculateROCValue(indicatorInputData_5m);
    let ROC_result_9 = ROC.calculateROCValue(indicatorInputData_5m, 9);
    const ROC_result_value12 = ROC_result_12[ROC_result_12.length - 1];
    const ROC_result_value9 = ROC_result_9[ROC_result_9.length - 1]
  
    console.log("ROC_result_value12: ", ROC_result_value12)
    console.log("ROC_result_value9: ", ROC_result_value9)
  

    let profitPercentage =
      ((currentPrice - averagePrice) / averagePrice) * 100;
    if (profitPercentage >= 100) {
      sellRatio = 1.0
    } else if (profitPercentage >= 70) {
      sellRatio = 0.7;
    } else if (profitPercentage >= 50) {
      sellRatio = 0.5;
    } else if (profitPercentage > 30) {
      sellRatio = 0.3;
    } else if (profitPercentage > 5) {
      sellRatio = 0.1;
    } 
    // else if (profitPercentage > 0.5) {
    //   sellRatio = MINIMUM_SELL_VALUE/quantity;
    // }
    if (sellRatio > 0) {
      let coinToSell = sellRatio * quantity;
      const coinToSellValue = coinToSell * currentPrice;
      coinToSell = coinToSellValue < MINIMUM_SELL_VALUE ? MINIMUM_SELL_VALUE/currentPrice : coinToSell;

      const leftSellCoins = quantity - coinToSell;
      const leftCoinValue = currentPrice * leftSellCoins;
      const coinsToSell = leftCoinValue < MINIMUM_SELL_VALUE ? quantity : coinToSell;
      return coinsToSell;
    }
  }
  return 0;
};

const sell = async ({averageBuyRate, currentPrice, quantity}) => {
  const quantityToSell = await getQuantityToSell(averageBuyRate, currentPrice, quantity)
  return { quantity: quantityToSell }
};

module.exports = { sell };
