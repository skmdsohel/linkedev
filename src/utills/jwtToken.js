const jwt = require('jsonwebtoken');
const SECRET_KEY = "linkedev";

function generateToken(payload) {
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' });
    return token;
}

function verifyToken(token) {
    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        return decoded;
    } catch (err) {
        throw new Error("Invalid Token");
    }
}

module.exports = { generateToken, verifyToken };