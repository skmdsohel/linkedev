const express = require("express");
const Router = express.Router;
const { registerUserController, getUserController, deleteUserController, updateUserController } = require('../controllers/user.controller');

const router = Router();

// GET user route
router.get('/', getUserController);

// POST user route
router.post('/', registerUserController);

// DELETE user route
router.delete('/', deleteUserController);

// PUT user route
router.put('/:id', updateUserController);

module.exports = router;