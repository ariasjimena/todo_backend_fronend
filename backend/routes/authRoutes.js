const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const authController = require('../controllers/authController');
const User = require('../models/user');

//ruta para reistrar un nuevo usuario
router.post('/register', authController.registerUser);

//ruta para iniciar sesion
router.post('/login', authController.loginUser);

//ruta protegida para obtener todos los usuarios
router.get('/users', authMiddleware, async (req, res) => {
    try {
        const users = await User.find();
        return res.status(200).json(users);
    }
    catch (error) {
        return res.status(500).json({ message: 'Error getting user', error });
    }
});

module.exports = router;