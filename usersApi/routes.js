"use strict";
module.exports = function (app) {
  var users = require("./controller");
  var bots = require("../botsApi/controller");

  // todoList Routes
  app.get("/users", users.getUsers);

  // todoList Routes
  app.get("/bots", bots.getBots);
  app.get("/getTransactionsByUser/:user", users.getUserTransactionsByUsername);
  app.get("/logs", users.getLogs);
  app.post("/addLog", users.addLog);
};
