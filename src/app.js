const express = require('express');
const app = express();
var cookieParser = require('cookie-parser')

const dotenv = require("dotenv");
dotenv.config();

// const {pool} = require('./db/index.js');

const {userAuthentication} = require('./middlewares/auth');
// const userErrorHandle = require('./middlewares/handleError');

const userRoutes = require('./routes/user.route');
const loginRoutes = require('./routes/login.route');

// Middleware to parse JSON bodies
app.use(express.json());
// Middleware to parse cookies
app.use(cookieParser());

// Middleware to handle authentication and errors
app.use('/user', userAuthentication, userRoutes);

// Middleware to handle authentication and errors
app.use('/login', loginRoutes);




// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});

module.exports = app;