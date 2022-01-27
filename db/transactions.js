const Entry = require("./schemas/entries");
const Transactions = require("./schemas/transactions");
const users = require("./users");

const addTransaction = async (req) => {
  const { coinsCount, userName, price, type } = req;
  if (!coinsCount || !userName || !price || !type) {
    return { success: false };
  }
  const newEntry = new Entry({
    coinsCount: coinsCount,
    userName: userName,
    price: price,
    type: type
  });
  try {
    await newEntry.save();
    return { success: true };
  } catch (err) {
    return { success: false, err: err };
  }
};

const getTransactions = async (query = {}) => {
  try {
    const transactions = await Transactions.find(query);
    return { success: true, transactions };
  } catch (err) {
    return { success: false, error: err };
  }
};

const getUserTransactionsByUsername = async (userName) => {
  try {
    const data = await Entry.find({ userName: userName });
    return { success: true, data: data };
  } catch (err) {
    return { success: false, err: err };
  }
};

const buyCoin = async (count, rate, username) => {
  try {
    const userData = await users.getUserByName(username);
    const prevData = userData.data[0];
    const isUserUpdated = await users.updateUser(prevData._id, {
      coinsCount: prevData.coinsCount + count,
      balance: prevData.balance - count * rate
    });
    if (isUserUpdated) {
      const isTransactioncompleted = await addTransaction({
        coinsCount: prevData.coinsCount + count,
        userName: username,
        price: rate,
        type: "buy"
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

const sellCoin = async (count, rate, username) => {
  try {
    const userData = await users.getUserByName(username);
    const prevData = userData.data[0];
    const isUserUpdated = await users.updateUser(prevData._id, {
      coinsCount: prevData.coinsCount - count,
      balance: prevData.balance + count * rate
    });
    if (isUserUpdated) {
      const isTransactioncompleted = await addTransaction({
        coinsCount: prevData.coinsCount - count,
        userName: username,
        price: rate,
        type: "sell"
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

module.exports = {
  addTransaction,
  getTransactions,
  getUserTransactionsByUsername,
  buyCoin,
  sellCoin
};
