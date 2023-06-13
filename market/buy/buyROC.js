

const Market = require("../index");
const MainUtils = require("../../utils/mainUtils");
const { ROC } = require("../indicators");
const DefaultConfig = require("../../constants/config");

const buy = async ({ balance, currentPrice, config = DefaultConfig }) => {
  if (balance < config.minimumBuy)
    return { quantity: 0, message: "less than minimum balance" };
  let historicalData_5m = await Market.getHistoricalData({ config });
  let indicatorInputData_5m = MainUtils.getCloseInputData(historicalData_5m);

  let ROC_result_12 = ROC.calculateROCValue(indicatorInputData_5m);
  let ROC_result_9 = ROC.calculateROCValue(indicatorInputData_5m, 9);
  const ROC_result_value12 = -ROC_result_12[ROC_result_12.length - 1];
  const ROC_result_value9 = -ROC_result_9[ROC_result_9.length - 1]

  console.log("ROC_result_value12: ", ROC_result_value12)
  console.log("ROC_result_value9: ", ROC_result_value9)
  
  const buySignal = { ROC_12: ROC_result_value12, ROC_9: ROC_result_value9 }

  let buyRatio = 0;
  if (ROC_result_value12 > 5 && ROC_result_value9  > ROC_result_value12/2) {
    if (ROC_result_value12 >= 10) {
      buyRatio = 3;
    } else if (ROC_result_value12 >= 7) {
      buyRatio = 2;
    } else {
      buyRatio = 1;
    }
  }


  

  if (buyRatio > 0) {
    let amountOfBuy = 0;
    const amountShouldBuy = buyRatio * config.buyLot;
    if (balance <= amountShouldBuy) {
      amountOfBuy = balance;
    } else if (balance - amountShouldBuy < config.buyLot) {
      amountOfBuy = balance;
    } else {
      amountOfBuy = amountShouldBuy;
    }
    const quantityToBuy = amountOfBuy / currentPrice;
    return { ...buySignal, quantity: quantityToBuy };
  }
  return { ...buySignal, quantity: 0 };
};

module.exports = { buy };

