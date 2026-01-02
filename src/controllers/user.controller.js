const { registerUser, getUserByEmail, deleteUserByEmail, updateUserById } = require('../services/user.service');
const validator = require('validator');

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


async function registerUserController(req, res) {
    console.log("body", req.body);
    try {
        for (const field of REQUIRED_FIELDS) {
            if (!req.body[field] || validator.isEmpty(String(req.body[field]))) {
                return `${field} is required`;
            }
        }
        // validate email safely
        if (req.body.email && !validator.isEmail(String(req.body.email || ''))) {
            throw new Error("Invalid Email");
        }

        // validate photo_url safely
        if (req.body.photo_url && !validator.isURL(String(req.body.photo_url))) {
            throw new Error("Invalid photo URL");
        }
        // validate mobile_number safely
        if (req.body.mobile_number && !validator.isMobilePhone(String(req.body.mobile_number), "any", { strictMode: true })) {
            throw new Error("Invalid phone number");
        }
        const user = await registerUser(req.body);
        res.status(201).send(user);
    } catch (err) {
        console.error("sohel", err);
        res.status(400).json({ error: err && err.message ? err.message : String(err) });
    }
}

async function getUserController(req, res) {
    console.log("body", req.body);
    try {
        if (!req.body || !validator.isEmail(String(req.body.email || ''))) {
            throw new Error("Invalid Email");
        }
        const user = await getUserByEmail(req.body.email);
        if (!user) return res.status(404).json({ error: 'User not found' });
        res.status(200).json(user);
    } catch (err) {
        console.error(err);
        res.status(400).json({ error: err && err.message ? err.message : String(err) });
    }
}

async function deleteUserController(req, res) {
    console.log("body", req.body);
    try {
        if (!req.body || !validator.isEmail(String(req.body.email || ''))) {
            throw new Error("Invalid Email");
        }
        const user = await deleteUserByEmail(req.body.email);
        if (!user) return res.status(404).json({ error: 'User not found' });
        res.status(200).json(user);
    } catch (err) {
        console.error(err);
        res.status(400).json({ error: err && err.message ? err.message : String(err) });
    }
}

async function updateUserController(req, res) {
    try {
        const user = await updateUserById(req.params.id, req.body);
        if (!user) return res.status(404).json({ error: 'User not found or no fields to update' });
        res.status(200).json(user);
    } catch (err) {
        console.error(err);
        res.status(400).json({ error: err && err.message ? err.message : String(err) });
    }
}

module.exports = { registerUserController, getUserController, deleteUserController, updateUserController };