const bcrypt = require('bcrypt');
const saltRounds = 10;


async function encryptPassword(plainPassword) {
    return await bcrypt.hash(plainPassword, saltRounds);
}

async function comparePassword(plainPassword, hash) {
    return await bcrypt.compare(plainPassword, hash);
}

module.exports = { encryptPassword, comparePassword };