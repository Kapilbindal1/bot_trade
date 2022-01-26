const Entry = require('./schemas/entries');

const addTransaction = async (req) => {
    const { cointsCount, userName, price, type } = req;
    if (!cointsCount || !userName || !price || !type) {
        return { success: false }
    }
    const newEntry = new Entry({
        cointsCount: cointsCount,
        userName: userName,
        price: price,
        type: type
    })
    try {
        await newEntry.save();
        return { success: true }
    }
    catch (err) {
        return { success: false, err: err }
    }
}

const getAllTransactions = async () => {
    try {
        const transactions = await Entry.find({});
        return { success: true, data: transactions }
    }
    catch (err) {
        return { success: false, err: err }
    }

}

const getUserTransactions = async (userName) => {
    try {
        const data = await Entry.findOne({userName: userName});
        return { success: true, data: data }
    }
    catch (err) {
        return { success: false, err: err }
    }
}

module.exports = { addTransaction, getAllTransactions, getUserTransactions };