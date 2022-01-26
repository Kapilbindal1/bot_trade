const User = require('./schemas/users');

const addUser= async (req) => {
    const { name, coinsCount, balance } = req;
    if (!name || !coinsCount || !balance) {
        return { success: false }
    }
    const newUser = new User({
        name: name,
        coinsCount: coinsCount,
        balance: balance
    })
    try {
        await newUser.save();
        return { success: true }
    }
    catch (err) {
        return { success: false, err: err }
    }
}

const getUsers = async () => {
    try {
        const users = await User.find({});
        return { success: true, data: users }
    }
    catch (err) {
        return { success: false, err: err }
    }

}
module.exports = { addUser, getUsers };