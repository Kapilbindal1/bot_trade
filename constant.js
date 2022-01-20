const SECOND = 1000;
const MINUTE = SECOND * 60;
const HOUR = MINUTE * 60;
const DAY = HOUR * 24;
const MONTH = DAY * 30;
const YEAR = DAY * 365;
module.exports = Object.freeze({ 
  SECOND,
  MINUTE,
  HOUR,
  DAY,
  MONTH,
  YEAR,

  PREVIOUS_TRADES_COUNT_FOR_AVERAGE_PRICE: 20
})