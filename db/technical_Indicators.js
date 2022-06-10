const TechnicalIndicators = require("./schemas/technical_Indicators");

const getTechnicalIndicators = async () => {
  try {
    const techIndicators = await TechnicalIndicators.find({});
    return { success: true, data: techIndicators };
  } catch (err) {
    return { success: false, err: err };
  }
};
