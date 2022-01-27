const Users = require("../../db/users");
const Transactions = require("../../db/transactions");

const buyCoin = async (count, rate, username, market, averageBuyRate) => {
  try {
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
          averageBuyRate
        });
        if (isTransactionCompleted) {
          return { success: true };
        }
      }
    }
    return { success: false };
  } catch (err) {
    console.log("err: ", err)
    return { success: false, err: err };
  }
};

const sellCoin = async (count, rate, username, market, averageBuyRate) => {
  try {
    const userData = await Users.getOrCreateUserByName(username);
    if (!!userData.user) {
      const prevData = userData.user;
      const isUserUpdated = await Users.updateUser(prevData._id, {
        coinsCount: prevData.coinsCount - count,
        balance: prevData.balance + count * rate
      });
      
      if (isUserUpdated && isUserUpdated.success) {
        const isTransactioncompleted = await Transactions.addTransaction({
          amount: count,
          userName: username,
          cost: count * rate,
          side: "sell",
          market: market,
          averageBuyRate
        });
        if (isTransactioncompleted) {
          return { success: true };
        }
      }
    }
    return { success: false };
  } catch (err) {
    return { success: false, err: err };
  }
};

const placeOrder = async ({ userName, side, price, amount, market, averageBuyRate }) => {
  try {
    if (side === "buy") {
      const newBuyTransaction = await buyCoin(amount, price, userName, market, averageBuyRate);
      console.log("newBuyTransaction: ", newBuyTransaction)
      return newBuyTransaction;
    } else {
      const newSellTransaction = await sellCoin(
        amount,
        price,
        userName,
        market,
        averageBuyRate
      );
      return newSellTransaction;
    }
  } catch (err) {
    console.error("Error: ", err);
    return null;
  }
};

module.exports = { placeOrder };
