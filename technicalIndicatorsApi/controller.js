"use strict";

var TechnicalIndicators = require("../db/schemas/technical_Indicators");

exports.getTechnicalIndicators = async (req, res) => {
  try {
    const techIndicators = await TechnicalIndicators.find({});
    console.log(techIndicators, "techIndicators1234");
    res.send({ success: true, data: techIndicators });
  } catch (err) {
    return { success: false, err: err };
  }
};
