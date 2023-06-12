const WebSocket = require('websocket').w3cwebsocket;

// Replace 'YOUR_API_KEY' with your actual Alpha Vantage API key
const apiKey = 'UFKT7CXUWCO8J35Q';
const symbol = 'NSE:RELIANCE'; // Replace with the desired stock symbol

// Connect to Alpha Vantage WebSocket API
const socket = new WebSocket(`wss://www.alphavantage.co/sockets/v1/stockquotes?key=${apiKey}`);

// Event triggered when the WebSocket connection is established
socket.onopen = () => {
  console.log('Connected to Alpha Vantage WebSocket API');
  
  // Subscribe to real-time quotes for the specified symbol
  socket.send(JSON.stringify({ action: 'subscribe', symbol }));
};

// Event triggered when the WebSocket receives a message
socket.onmessage = (message) => {
  const data = JSON.parse(message.data);
  
  // Handle different types of messages
  if (data['Error Message']) {
    console.error('Error:', data['Error Message']);
  } else if (data['Note']) {
    console.log('Note:', data['Note']);
  } else if (data['Meta Data']) {
    console.log('Received meta data:', data['Meta Data']);
  } else if (data['Global Quote']) {
    console.log('Received real-time quote:', data['Global Quote']);
  } else {
    console.log('Received unknown message:', data);
  }
};

// Event triggered when the WebSocket connection is closed
socket.onclose = (e) => {
  console.log('Disconnected from Alpha Vantage WebSocket API', e);
};
