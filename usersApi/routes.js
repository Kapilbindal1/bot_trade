'use strict';
module.exports = function(app) {
  var users = require('./controller');

  // todoList Routes
  app.get('/users',users.getUsers)
  app.get('/getTransactionsByUser/:user', users.getUserTransactionsByUsername)
  app.get('/logs', users.getLogs)
  app.post('/addLog', users.addLog)
};