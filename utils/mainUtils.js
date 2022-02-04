const getCloseInputData = (array) => {
  return getArray(array, "close");
};

const getStochasticInputData = (array) => {
  let high = getArray(array, "high");
  let low = getArray(array, "low");
  let close = getArray(array, "close");
  return {
    high,
    low,
    close,
  };
};

const getArray = (array, field) => {
  return array.map((val) => val[field]);
};

const shouldSell = (currentPrice, averagePrice) => {
  let loss = (Math.abs(averagePrice - currentPrice) / averagePrice) * 100;
  return currentPrice - averagePrice > 0 ? true : loss >= 1.5 ? true : false;
};

const sellAdvice = (averageRate, currentPrice, pendingAsset, asset) => {
  let avgBuyRate = averageRate * Math.pow(1.025, pendingAsset);
  let profitPercent = ((currentPrice - avgBuyRate) * 100) / avgBuyRate;
  if (profitPercent >= 2.5) {
    return getSellType(currentPrice, asset);
  } else {
    return isStoplossHit(avgBuyRate, currentPrice);
  }
};

const getSellType = (currentPrice, asset) => {
  let totalValue = currentPrice * asset;
  const coinToSellValue = asset * SELL_RATIO * currentPrice;

  if (totalValue - coinToSellValue < MINIMUM_SELL_VALUE * 1.015)
    return "SELL_ALL";
  else return "SELL_HALF";
};

const isStoplossHit = (avgBuyRate, currentPrice) => {
  let lossPercnt = ((avgBuyRate - currentPrice) / avgBuyRate) * 100;
  if (lossPercnt >= 1.5) {
    return "SELL_ALL";
  } else return;
};

module.exports = {
  getCloseInputData,
  shouldSell,
  sellAdvice,
  getStochasticInputData,
};
