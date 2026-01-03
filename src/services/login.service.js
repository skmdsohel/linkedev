const { getUserFromDB } = require('../db/index');
const { comparePassword } = require('../utills/password');
const { generateToken } = require('../utills/jwtToken');


async function loginUserService(email, password) {
    try {
        const user = await getUserFromDB(email);

        if (!user) {
            throw new Error(`${email} Not Found!`);
        }

        const isPasswordMatch = await comparePassword(password, user.password);

        if (!isPasswordMatch) {
            throw new Error("Invalid Password!");
        }

        delete user.password;

        const loginResponse = {
            "token": generateToken(user),
            message: "Login successful"
        }

        return loginResponse;

    } catch (error) {
        throw (error);
    }
};

module.exports = { loginUserService };