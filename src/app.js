const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
// app.use(express.json());

// Sample route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// test route
app.get('/test', (req, res) => {
  res.send('Hello World! from test route');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

module.exports = app;