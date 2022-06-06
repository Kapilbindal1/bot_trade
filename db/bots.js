const Bots = require("./schemas/bots");

const getBots = async () => {
  try {
    const bots = await Bots.find({});
    return { success: true, data: bots };
  } catch (err) {
    return { success: false, err: err };
  }
};
