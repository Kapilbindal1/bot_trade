const getCloseInputData = (array) => {
  return array.map((val) => val.close);
};

const shouldSell = (currentPrice, averagePrice) => {
  let loss = (Math.abs(averagePrice - currentPrice) / averagePrice) * 100;
  return currentPrice - averagePrice > 0 ? true : loss >= 2 ? true : false;
};

module.exports = { getCloseInputData, shouldSell };
