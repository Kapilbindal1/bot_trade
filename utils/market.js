
const getMarket = (asset, base) => {
  return `${asset}/${base}`;
}

const getPeriodObject = (array) => {
  return {
    timeStamp: array[0],
    open: array[1], 
    high: array[2], 
    low: array[3], 
    close: array[4], 
    volume: array[5]
  }
}

module.exports = { getMarket,getPeriodObject }