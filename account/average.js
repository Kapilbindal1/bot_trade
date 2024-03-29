const numeral = require("numeral");

const getAverageRate = (trades, currentPrice) => {
  let averageBuyRate = numeral(0);
  let purchaseCount = numeral(0);
  let buySum = numeral(0);
  let averageSellRate = numeral(0);
  let sellCount = numeral(0);
  let sellSum = numeral(0);
  let balanceCount = numeral(0);
  let averageRate = numeral(0);

  trades.forEach((trade) => {
    if (trade.info) {
      const { side, status, cost,fee } = trade;
      if (side === "buy") {
        let tmpA = numeral(trade.amount);
        if (fee && fee.cost) {
          tmpA = tmpA.subtract(fee.cost)
        }
        const amount = tmpA.value()

        purchaseCount = purchaseCount.add(amount);
        buySum = buySum.add(cost);

        const countTmp = balanceCount.clone();
        const tmpBalanceCount = balanceCount.add(amount);
        if (tmpBalanceCount.value() >= 0) {
          const tmpR = averageRate
            .multiply(countTmp.value())
            .add(cost)
            .divide(tmpBalanceCount.value());
          averageRate = tmpR;
        }
        balanceCount = tmpBalanceCount.clone();
      } else {
        sellCount = sellCount.add(trade.amount);
        sellSum = sellSum.add(cost);

        balanceCount = balanceCount.subtract(trade.amount);
        if (balanceCount.value() <= 0 || (currentPrice && currentPrice * balanceCount.value() < 1)) {
          averageRate = numeral(0);
          balanceCount = numeral(0);
        }
      }
    }
  });

  averageBuyRate =
    purchaseCount.value() > 0
      ? buySum.divide(purchaseCount.value())
      : numeral(0);
  averageSellRate =
    sellCount.value() > 0 ? sellSum.divide(sellCount.value()) : numeral(0);

  return {
    averageBuyRate: averageBuyRate.value(),
    purchaseCount: purchaseCount.value(),
    averageSellRate: averageSellRate.value(),
    sellCount: sellCount.value(),
    averageRate: averageRate.value(),
    balanceCount: balanceCount.value()
  };
};

module.exports = { getAverageRate };
