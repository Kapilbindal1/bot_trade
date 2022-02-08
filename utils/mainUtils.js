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

const getDescription = (
  advice,
  asset,
  currentPrice,
  averageRate,
  pendingAsset,
  indicatorResult
) => {
  if (advice === "sell") {
    let difference = currentPrice - averageRate;
    let percentage = (Math.abs(averageRate - currentPrice) / averageRate) * 100;
    return `Our Asset is;-${asset}. ${indicatorResult}. Advice is:-${advice}. ${
      difference > 0 ? "Profit on assst is:-" : "Loss on asset is:-"
    }${percentage}. We CAN ${
      shouldSell(currentPrice, averageRate)
        ? "SELL our asset."
        : "NOT SELL our asset."
    }`;
  } else if (advice === "buy") {
    if (asset === 0) {
      return `Our Asset is;-${asset}. ${indicatorResult}. Advice is:-${advice}. We CAN BUY some asset.`;
    } else {
      let avgBuyRate = averageRate * Math.pow(1.025, pendingAsset);
      let percent = ((currentPrice - avgBuyRate) * 100) / avgBuyRate;
      return `Our Asset is;-${asset}. ${indicatorResult}. Advice is:-${advice}. ${
        percent > 2.5
          ? "We CAN SELL 50% of our asset."
          : percent > 0
          ? "We WILL HOLD our position."
          : `We have LOSS of ${Math.abs(percent)}%.${
              percent >= 1.5
                ? "We WILL SELL our all assets"
                : "We WILL HOLD our position."
            }`
      }`;
    }
  } else {
    return `Our Asset is;-${asset}. ${indicatorResult}. Advice is:-${advice}.`;
  }
};

const pendingAsset = (array) => {
  let index = array.length - 1;
  for (let i = index; i >= 0; i--) {
    if (array[i].side === "buy") return index - i;
  }
};

module.exports = {
  getCloseInputData,
  shouldSell,
  sellAdvice,
  getStochasticInputData,
  getDescription,
  pendingAsset,
};
