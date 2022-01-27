const Users = require("../../db/users");
const Transactions = require("../../db/transactions");

const buyCoin = async (count, rate, username, market) => {
  try {
    const userData = await Users.getUserByName(username);
    const prevData = userData.user;
    const isUserUpdated = await Users.updateUser(prevData._id, {
      coinsCount: prevData.coinsCount + count,
      balance: prevData.balance - count * rate,
    });
    if (isUserUpdated) {
      const isTransactionCompleted = await Transactions.addTransaction({
        coinsCount: prevData.coinsCount + count,
        userName: username,
        price: rate,
        type: "buy",
        market: market,
      });
      if (isTransactionCompleted) {
        return { success: true };
      }
    }
    return { success: false };
  } catch (err) {
    return { success: false, err: err };
  }
};

const sellCoin = async (count, rate, username, market) => {
  try {
    const userData = await Users.getUserByName(username);
    const prevData = userData.data[0];
    const isUserUpdated = await Users.updateUser(prevData._id, {
      coinsCount: prevData.coinsCount - count,
      balance: prevData.balance + count * rate,
    });
    if (isUserUpdated) {
      const isTransactioncompleted = await Transactions.addTransaction({
        coinsCount: prevData.coinsCount - count,
        userName: username,
        price: rate,
        type: "sell",
        market: market,
      });
      if (isTransactioncompleted) {
        return { success: true };
      }
    }
    return { success: false };
  } catch (err) {
    return { success: false, err: err };
  }
};

const placeOrderDb = async ({ userName, side, price, amount, market }) => {
  try {
    if(side==="buy"){
        const newBuyTransaction = await buyCoin(amount,price,userName,market)
        return newBuyTransaction
    }else{
        const newSellTransaction = await sellCoin(amount,price,userName,market)
        return newSellTransaction
    }
  } catch (err) {
    console.error("Error: ", err);
    return null;
  }
};

module.exports = { placeOrderDb, buyCoin, sellCoin };
