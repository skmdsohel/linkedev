function userAuthentication(req, res, next) {
    let token = "xyz123"
    if (token === "xyz123") {
        next();
    } else {
        return res.status(401).send({ "error": "Unauthorized" });
    }
}   

module.exports = userAuthentication;