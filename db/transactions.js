const Transactions = require("./schemas/transactions");

const addTransaction = async (req) => {
  const { amount, userName, side, cost, market, averageBuyRate } = req;

  if (!userName || !side || !market || !amount) {
    return { success: false };
  }
  const newEntry = new Transactions({
    amount: amount,
    userName: userName,
    side,
    market: market,
    cost: cost,
    averageBuyRate
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



module.exports = {
  addTransaction,
  getTransactions,
  getUserTransactionsByUsername,
};
