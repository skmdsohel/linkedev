const { verifyToken } = require('../utills/jwtToken');


function userAuthentication(req, res, next) {
    try {
        let token = req.cookies.token;
        const decryptedToken = verifyToken(token);
        next();
        console.log(decryptedToken)
    } catch (error) {
        return res.status(401).send({ "error": error.message });
    }
}

module.exports = { userAuthentication };