"use strict";
module.exports = function (app) {
  var bots = require("./controller");

  // todoList Routes
  app.get("/bots", bots.getBots);
};
