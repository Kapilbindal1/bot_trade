"use strict";

var Bots = require("../db/schemas/bots");

exports.getBots = async (req, res) => {
  try {
    const bots = await Bots.find({});
    console.log(bots, "bots1234");
    res.send({ success: true, data: bots });
  } catch (err) {
    return { success: false, err: err };
  }
};
