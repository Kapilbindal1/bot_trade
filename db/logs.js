const Logs = require("./schemas/logs");

const addLog =  (data) => {
    const { advice, currentPrice, userName, isBuySellSuccessful, balance, market, asset } = data;

    if (!advice || !currentPrice || !userName || !isBuySellSuccessful || !balance || !market || !asset) {
        return { success: false };
    }
    const newLog = new Logs({
        advice,
        currentPrice,
        userName,
        isBuySellSuccessful,
        balance,
        market,
        asset
    });

    try {
         newLog.save();
        return { success: true };
    } catch (err) {
        return { success: false, err: err };
    }
};

const getLogs = (query = {}) => {
    try {
        const transactions = await Transactions.find(query);
        return { success: true, transactions };
    } catch (err) {
        return { success: false, error: err };
    }
}

module.exports = {
    addLog,
    getLogs
};
