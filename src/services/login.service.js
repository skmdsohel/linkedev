const { getUserFromDB } = require('../db/index');
const { comparePassword } = require('../utills/password');


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

        const loginResponse = {
            ...user,
            message: "Login successful"
        }

        return loginResponse;

    } catch (error) {
        throw (error);
    }
};

module.exports = { loginUserService };