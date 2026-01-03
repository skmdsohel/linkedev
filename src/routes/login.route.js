const express = require("express");
const Router = express.Router;
const { loginUserController } = require('../controllers/login.controller');

const router = Router();

// POST user route
router.post('/', loginUserController);


module.exports = router;