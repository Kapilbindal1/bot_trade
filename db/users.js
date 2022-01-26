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
const getUserByName = async (userName) => {
    try {
        const user = await User.find({name: userName});
        return { success: true, data: user }
    }
    catch (err) {
        return { success: false, err: err }
    }
}

const updateUser = async (userId, data) => {
    const { coinsCount, balance } = data;
    if ( !coinsCount || !balance) {
        return { success: false }
    }
    try {
         await User.updateOne(
            { _id: userId },
            { $set: {
                coinsCount: coinsCount,
                balance: balance
            } }
        );
        return { success: true}
    }
    catch (err) {
        return { success: false, err: err }
    }
}

module.exports = { addUser, getUsers , getUserByName , updateUser};