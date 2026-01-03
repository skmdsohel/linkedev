const validator = require("validator");

const REQUIRED_FIELDS = [
    "first_name",
    "last_name",
    "email",
    "password",
    "gender",
    "age",
    "mobile_number",
    "photo_url",
    "about",
    "skills"
];

function validateSignUpData(data) {
    for (const field of REQUIRED_FIELDS) {
        if (!data[field] || validator.isEmpty(String(data[field]))) {
            throw new Error(`${field} is required`);
        }
    }
    // validate email safely
    if (data.email && !validator.isEmail(String(data.email || ''))) {
        throw new Error("Invalid Email");
    }

    // validate password safely
    if (data.password && !validator.isStrongPassword(String(data.password))) {
        throw new Error("Password must be at least 8 characters long, include uppercase, lowercase, number, and symbol");
    }

    // validate photo_url safely
    if (data.photo_url && !validator.isURL(String(data.photo_url))) {
        throw new Error("Invalid photo URL");
    }

    // validate mobile_number safely
    if (data.mobile_number && !validator.isMobilePhone(String(data.mobile_number), "any", { strictMode: true })) {
        throw new Error("Invalid phone number");
    }
}


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

function valiidateEmail(email) {
    // validate email safely
    if (email && !validator.isEmail(String(email || ''))) {
        throw new Error("Invalid Email");
    }
}

module.exports = { validateSignInData, validateSignUpData, valiidateEmail };