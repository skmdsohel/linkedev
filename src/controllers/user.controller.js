const {registerUser, getUserByEmail, deleteUserByEmail, updateUserById} = require('../services/user.service');

async function registerUserController (req, res) {
    console.log("body",req.body);
    try {
        const user = await registerUser(req.body);
        res.status(201).send(user);
    } catch (err) {
        console.log(err)
        res.status(409).send(err);
    }
}

async function getUserController (req, res) {
    console.log("body",req.body);
    try {
        const user = await getUserByEmail(req.body.email);
        res.status(201).send(user);
    } catch (err) {
        console.log(err)
        res.status(409).send(err);
    }
}

async function deleteUserController (req, res) {
    console.log("body",req.body);
    try {
        const user = await deleteUserByEmail(req.body.email);
        res.status(201).send(user);
    } catch (err) {
        console.log(err)
        res.status(409).send(err);
    }
}

async function updateUserController (req, res) {
    try {
        const user = await updateUserById(req.params.id, req.body);
        res.status(201).send(user);
    } catch (err) {
        console.log(err)
        res.status(409).send(err);
    }
}

module.exports = { registerUserController, getUserController, deleteUserController, updateUserController };