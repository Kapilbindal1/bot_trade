const numeral = require("numeral");
const averageRate = (trades, context) => {

  console.log("Trades: ", trades)

  let averageBuyRate = numeral(0);
  let purchaseCount = numeral(0);
  let buySum = numeral(0);
  let averageSellRate = numeral(0);
  let sellCount = numeral(0);
  let sellSum = numeral(0);
  const avgBuyRateLastUpdatedAt = new Date().getTime();
  const avgSellRateLastUpdatedAt = new Date().getTime();

  // console.log('trades: ', trades)

  trades.slice(-50).forEach((trade) => {
    if (trade.info) {
      const { quoteQty, qty } = trade.info;
      if (trade.info.isBuyer) {
        purchaseCount = purchaseCount.add(qty);
        buySum = buySum.add(quoteQty);
      } else {
        sellCount = sellCount.add(qty);
        sellSum = sellSum.add(quoteQty);
      }
    }
  });

  
  averageBuyRate = purchaseCount.value() > 0 ? buySum.divide(purchaseCount.value()) : numeral(0);
  averageSellRate = sellCount.value() > 0 ? sellSum.divide(sellCount.value()) : numeral(0);
  // console.log("buySum", buySum, averageBuyRate)
  if (context && context.buy && context.buy.purchaseCount) {
    // console.log("connnn: ", buySum,  buySum
    // .add(context.buy.averageBuyRate * context.buy.purchaseCount), buySum
    // .add(context.buy.averageBuyRate * context.buy.purchaseCount)
    // .divide(purchaseCount.value()))
    purchaseCount = purchaseCount.add(context.buy.purchaseCount);
    if (context.buy.averageBuyRate) {
      averageBuyRate = buySum
        .add(context.buy.averageBuyRate * context.buy.purchaseCount)
        .divide(purchaseCount.value());
    }
  }
  if (context && context.sell && context.sell.sellCount) {
    sellCount = sellCount.add(context.sell.sellCount);
    if (context.sell.averageSellRate) {
      averageSellRate = sellSum
        .add(context.sell.averageSellRate * context.sell.sellCount)
        .divide(sellCount.value());
    }
  }

  return {
    buy: {
      averageBuyRate: averageBuyRate.value(),
      avgBuyRateLastUpdatedAt,
      purchaseCount: purchaseCount.value()
    },
    sell: {
      averageSellRate: averageSellRate.value(),
      avgSellRateLastUpdatedAt,
      sellCount: sellCount.value()
    },
    lastUpdatedAt: avgSellRateLastUpdatedAt
  };
};

const averageRateWithoutContext = (trades) => {
  let averageBuyRate = numeral(0);
  let purchaseCount = numeral(0);
  let buySum = numeral(0);
  let averageSellRate = numeral(0);
  let sellCount = numeral(0);
  let sellSum = numeral(0);
  // const avgBuyRateLastUpdatedAt = new Date().getTime();
  // const avgSellRateLastUpdatedAt = new Date().getTime();

  console.log('trades: ', trades)

  trades.forEach((trade) => {
    if (trade.info) {
      const { side, executedQty, status, cummulativeQuoteQty } = trade.info;
      if (status !== 'FILLED') {
        return
      }
      if (side === 'BUY') {
        purchaseCount = purchaseCount.add(executedQty);
        buySum = buySum.add(cummulativeQuoteQty);
      } else {
        sellCount = sellCount.add(executedQty);
        sellSum = sellSum.add(cummulativeQuoteQty);
      }
    }
  });

  
  averageBuyRate = purchaseCount.value() > 0 ? buySum.divide(purchaseCount.value()) : numeral(0);
  averageSellRate = sellCount.value() > 0 ? sellSum.divide(sellCount.value()) : numeral(0);
  // console.log("buySum", buySum, averageBuyRate)
  // if (context && context.buy && context.buy.purchaseCount) {
  //   // console.log("connnn: ", buySum,  buySum
  //   // .add(context.buy.averageBuyRate * context.buy.purchaseCount), buySum
  //   // .add(context.buy.averageBuyRate * context.buy.purchaseCount)
  //   // .divide(purchaseCount.value()))
  //   purchaseCount = purchaseCount.add(context.buy.purchaseCount);
  //   if (context.buy.averageBuyRate) {
  //     averageBuyRate = buySum
  //       .add(context.buy.averageBuyRate * context.buy.purchaseCount)
  //       .divide(purchaseCount.value());
  //   }
  // }
  // if (context && context.sell && context.sell.sellCount) {
  //   sellCount = sellCount.add(context.sell.sellCount);
  //   if (context.sell.averageSellRate) {
  //     averageSellRate = sellSum
  //       .add(context.sell.averageSellRate * context.sell.sellCount)
  //       .divide(sellCount.value());
  //   }
  // }

  return {
    averageBuyRate: averageBuyRate.value(),
    purchaseCount: purchaseCount.value(),
    averageSellRate: averageSellRate.value(),
    sellCount: sellCount.value(),
    // buy: {
    //   // avgBuyRateLastUpdatedAt,
    // },
    // sell: {
    //   // avgSellRateLastUpdatedAt,
    // },
    // lastUpdatedAt: avgSellRateLastUpdatedAt
  };
};

module.exports.averageRate = averageRate;
module.exports.averageRateWithoutContext = averageRateWithoutContext;

