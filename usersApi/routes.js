"use strict";
module.exports = function (app) {
  var users = require("./controller");
  var bots = require("../botsApi/controller");
  var technicalIndicators = require("../technicalIndicatorsApi/controller");

  // todoList Routes
  app.get("/users", users.getUsers);

  // todoList Routesj  
  app.get("/bots", bots.getBots);
  app.get("/technicalIndicators", technicalIndicators.getTechnicalIndicators);
  app.get("/technicalIndicators/markets", technicalIndicators.getMarketCurrencies);
  app.get("/technicalIndicators/prices", technicalIndicators.getMarketPrices);
  app.get("/getTransactionsByUser/:user", users.getUserTransactionsByUsername);
  app.get("/logs", users.getLogs);
  app.post("/addLog", users.addLog);
  app.post("/binanceBotUsers", users.binanceBotUsers);
  app.get("/getBinanceBotUsers", users.getBinanceBotUsers);
};
