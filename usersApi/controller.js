"use strict";

const res = require("express/lib/response");
var mongoose = require("mongoose"),
 User = require("../db/schemas/users");
 Entry = require("../db/schemas/transactions")
 const Logs = require("../db/schemas/logs");

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find({}); 
    res.send({success: true, data: users});
  } catch (err) {
    return { success: false, err: err };
  }
};

exports.getUserTransactionsByUsername = async (req, res) => {
  var userName = req.params.user;
  try {
    const data = await Entry.find({ userName: userName });
    res.send({ success: true, data: data });
  } catch (err) {
    return { success: false, err: err };
  }
};

exports.getLogs = async (req, res) => {
  console.log("shsc")
  try {
      const Log = await Logs.find({}).limit(10);  
      res.send({ success: true,  Log });
  } catch (err) {
      return res.send({ success: false, error: err });
  }
}

exports.addLog = async(req, res) => {
  const { advice, currentPrice, userName, isBuySellSuccessful, balance, market, asset, quantity } = req.body;

  if (!advice || !currentPrice || !userName || !isBuySellSuccessful || !balance || !market || !asset || !quantity) {
      return { success: false };
  }
  const newLog = new Logs({
      advice,
      currentPrice,
      userName,
      isBuySellSuccessful,
      balance,
      market,
      asset,
      quantity
  });

  try {
       newLog.save();
      res.send({ success: true });
  } catch (err) {
      return res.send({ success: false, err: err });
  }
};
