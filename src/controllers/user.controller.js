const { registerUser, getUserByEmail, deleteUserByEmail, updateUserById } = require('../services/user.service');
const validator = require('validator');

async function registerUserController(req, res) {
    console.log("body", req.body);
    try {
        // ensure body exists and validate safely
        if (!req.body || !validator.isEmail(String(req.body.email || ''))) {
            throw new Error("Invalid Email");
        }
        if (req.body.photo_url && !validator.isURL(String(req.body.photo_url))) {
            throw new Error("Invalid photo URL");
        }
        const user = await registerUser(req.body);
        res.status(201).send(user);
    } catch (err) {
        console.error(err);
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