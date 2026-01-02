function userErrorHandle(err, req, res, next) {
    if (err) {
        return res.status(500).send({ "error": "something went wrong!" }); 
    } else {
        next();
    }
}   

module.exports = userErrorHandle;