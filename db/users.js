const User = require("./schemas/users");
const config = require("../constants/config");

const addUser = async (data) => {
  const { name, coinsCount, balance } = data;
  if (!name || isNaN(coinsCount) || !balance) {
    return { success: false };
  }
  const newUser = new User({
    name: name,
    coinsCount: coinsCount,
    balance: balance
  });
  try {
    const user = await newUser.save();
    return { success: true, user };
  } catch (err) {
    return { success: false, err: err };
  }
};

const getUsers = async () => {
  try {
    const users = await User.find({});
    return { success: true, data: users };
  } catch (err) {
    return { success: false, err: err };
  }
};
const getUserByName = async (userName) => {
  try {
    const user = await User.findOne({ name: userName });
    return { success: true, user };
  } catch (err) {
    return { success: false, err: err };
  }
};

const updateUser = async (userId, data) => {
  const { coinsCount, balance } = data;
  if (isNaN(coinsCount) || isNaN(balance)) {
    return { success: false };
  }
  try {
    await User.updateOne(
      { _id: userId },
      {
        $set: {
          coinsCount: coinsCount,
          balance: balance
        }
      }
    );
    return { success: true };
  } catch (err) {
    return { success: false, err: err };
  }
};

const getOrCreateUserByName = async (name) => {
  try {
    const data = await getUserByName(name);
    if (!data.user) {
      const addUserData = await addUser({
        name,
        coinsCount: 0,
        balance: config.initialUserBalance
      });
      return addUserData;
    }
    return data;
  } catch (ex) {
    console.log("ex: ", ex);
    return { success: false, error: ex };
  }
};

module.exports = {
  addUser,
  getUsers,
  getUserByName,
  updateUser,
  getOrCreateUserByName
};
