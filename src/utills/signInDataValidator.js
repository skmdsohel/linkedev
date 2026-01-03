const validator = require("validator");

function validateSignInData(data) {

    if (!data.email || !data.password) {
        throw new Error("Email and Password are required");
    }

    // validate email safely
    if (data.email && !validator.isEmail(String(data.email || ''))) {
        throw new Error("Invalid Email");
    }

    // validate password safely
    if (data.password && !validator.isStrongPassword(String(data.password))) {
        throw new Error("Password must be at least 8 characters long, include uppercase, lowercase, number, and symbol");
    }

    // validate mobile_number safely
    // if (data.mobile_number && !validator.isMobilePhone(String(data.mobile_number), "any", { strictMode: true })) {
    //     throw new Error("Invalid phone number");
    // }
}

module.exports = { validateSignInData };