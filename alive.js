const axios = require('axios');

const keepAlive = () => {
  setInterval(() => {
    axios.get('https://trader-bot-app.herokuapp.com/test')
    .then(function (response) {
      // handle success
      console.log(response);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .then(function () {
      // always executed
    });
  }, 5 * 60 * 1000)
}

module.exports = { keepAlive }