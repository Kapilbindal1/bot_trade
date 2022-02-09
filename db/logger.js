const Logger = require("./schemas/logger");

const addLogger = ({ userName, data }) => {
  if (!userName) {
    return { success: false };
  }
  const newLog = new Logger({
    userName,
    data
  });

  try {
    newLog.save();
    return { success: true };
  } catch (err) {
    return { success: false, err: err };
  }
};

const getLoggers = async (query = {}) => {
  try {
    const transactions = await Logger.find(query);
    return { success: true, transactions };
  } catch (err) {
    return { success: false, error: err };
  }
};

module.exports = {
  addLogger,
  Logger
};
