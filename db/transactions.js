const Transactions = require("./schemas/transactions");
const users = require("./users");

const addTransaction = async (req) => {
  const { amount, userName, price, side, info , market, date} = req;
  if (!userName || !price || !side || !market || !date || !info || !amount) {
    return { success: false };
  }
  const newEntry = new Transactions({
    amount: amount,
    userName: userName,
    price: price,
    side: side,
    info: info,
    date: date,
    market: market,
    cost: price * amount
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
    const data = await Transactions.find({ userName: userName });
    return { success: true, data: data };
  } catch (err) {
    return { success: false, err: err };
  }
};

const buyCoin = async (count, rate, username) => {
  try {
    const userData = await users.getUserByName(username);
    const prevData = userData.user;
    const isUserUpdated = await users.updateUser(prevData._id, {
      coinsCount: prevData.coinsCount + count,
      balance: prevData.balance - count * rate
    });
    if (isUserUpdated) {
      const isTransactionCompleted = await addTransaction({
        coinsCount: prevData.coinsCount + count,
        userName: username,
        price: rate,
        type: "buy"
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
