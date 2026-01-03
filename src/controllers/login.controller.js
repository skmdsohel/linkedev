const { loginUserService } = require('../services/login.service');
const { validateSignInData } = require('../utills/validator');



async function loginUserController(req, res) {
    console.log("body", req.body);
    try {

        validateSignInData(req.body);

        const loginResponse = await loginUserService(req.body.email, req.body.password);

        res.cookie('token', loginResponse.token, { httpOnly: true });
        res.status(200).json({ message: loginResponse.message });
    } catch (err) {
        console.error(err);
        res.status(400).json({ Error: err && err.message ? err.message : String(err) });
    }
}

module.exports = { loginUserController };