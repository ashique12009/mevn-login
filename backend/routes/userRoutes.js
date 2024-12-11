const express = require('express');
const userController = require('../controllers/userController');
const validate = require('../middlewares/validate');  // Import validate middleware

const router = express.Router();

// Use validateRegister middleware before the register controller
router.post('/register', validate.validateRegister, userController.register);
router.post('/login', userController.login);

module.exports = router;