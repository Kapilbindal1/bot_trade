const DefaultConfig = require("../../constants/config");
const { getClient } = require("../../binance");
const MarketUtils = require("../../utils/market");
const { addLogger } = require("../../db/logger");

const cancelPreviousOrders = async (config = DefaultConfig) => {
  try {
    const binanceClient = getClient();
    const { asset, base } = config;
    const market = MarketUtils.getMarket(asset, base);
    const orders = await binanceClient.fetchOpenOrders(market);

    orders.forEach(async (order) => {
      await binanceClient.cancelOrder(order.id, order.symbol);
    });
  } catch (ex) {
    console.log("Cancel previous order: ", ex);
  }
};

const buyCoin = async (
  count,
  rate,
  username,
  market,
  averageBuyRate,
  pendingAsset
) => {
  try {
    const binanceClient = getClient();
    const order = await binanceClient.createOrder(
      market,
      "market",
      "buy",
      count,
      rate
    );

    // console.log("buy order: ", order);

    const userData = await Users.getOrCreateUserByName(username);
    if (!!userData.user) {
      const prevData = userData.user;
      const isUserUpdated = await Users.updateUser(prevData._id, {
        coinsCount: prevData.coinsCount + count,
        balance: prevData.balance - count * rate
      });
      if (isUserUpdated && isUserUpdated.success) {
        const isTransactionCompleted = await Transactions.addTransaction({
          amount: count,
          userName: username,
          cost: count * rate,
          side: "buy",
          market: market,
          averageBuyRate,
          pendingAsset
        });
        if (isTransactionCompleted) {
          return { success: true };
        }
      }
    }
    return { success: false };
  } catch (err) {
    console.log("err: ", err);
    addLogger({ userName: username, data: JSON.stringify(err) })
    return { success: false, err: err };
  }
};

const sellCoin = async (
  count,
  rate,
  username,
  market,
  averageBuyRate,
  pendingAsset
) => {
  try {
    const binanceClient = getClient();
    const order = await binanceClient.createOrder(
      market,
      "market",
      "sell",
      count,
      rate
    );

    // console.log("sell order: ", order);

    const userData = await Users.getOrCreateUserByName(username);
    if (!!userData.user) {
      const prevData = userData.user;
      const isUserUpdated = await Users.updateUser(prevData._id, {
        coinsCount: prevData.coinsCount - count,
        balance: prevData.balance + count * rate
      });

      if (isUserUpdated && isUserUpdated.success) {
        console.log("isUserUpdated");
        const isTransactioncompleted = await Transactions.addTransaction({
          amount: count,
          userName: username,
          cost: count * rate,
          side: "sell",
          market: market,
          averageBuyRate,
          pendingAsset
        });
        if (isTransactioncompleted) {
          return { success: true };
        }
      }
    }
    return { success: false };
  } catch (err) {
    console.log("Err in sell coin: ", err);
    addLogger({ userName: username, data: JSON.stringify(err) })
    return { success: false, err: err };
  }
};

const placeOrder = async ({
  userName,
  side,
  price,
  amount,
  market,
  averageBuyRate,
  pendingAsset,
  config
}) => {
  try {
    await cancelPreviousOrders(config || DefaultConfig);
    if (side === "buy") {
      const newBuyTransaction = await buyCoin(
        amount,
        price,
        userName,
        market,
        averageBuyRate,
        pendingAsset
      );
      console.log("newBuyTransaction: ", newBuyTransaction);
      return newBuyTransaction;
    } else {
      const newSellTransaction = await sellCoin(
        amount,
        price,
        userName,
        market,
        averageBuyRate,
        pendingAsset
      );
      return newSellTransaction;
    }
  } catch (err) {
    console.error("Error: ", err);
    addLogger({ userName: username, data: JSON.stringify(err) })
    return null;
  }
};

module.exports = { placeOrder };