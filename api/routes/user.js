const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');

// install the node bcrypt hashing algorithm 
router.post('/signup', userController.SignUp);

router.post('/login',userController.Login);

router.delete('/:userId', userController.DeleteUser);

module.exports = router; 