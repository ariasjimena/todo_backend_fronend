const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');//impota el modelo de usuario
const config = require('../config/config');

//fincion para generar un token
function generateToken(userId) {
    const token = jwt.sign({ userId }, config.jwtSecret, { expiresIn: '1h'});
    return token;
}

//funcion para registrar un nuevo usuario
async function registerUser(req, res) {
    const { name, email, password } = req.body;

    try {
        //verificar si el usuario ya esta registrado
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: 'The user is already register'})
        }

        //encriptar la contrasena antes de almacenarla en la base de datos
        const salt = await bcrypt.genSalt(10);
        const hanshedPassword = await bcrypt.hash(password, salt);

        //crear un nuevo usuario utilizando el modelo user
        const newUser = new User({
            name,
            email,
            password: hanshedPassword,
        });

        //guardar el nuevo usuario en la base de datos
        const saveUser = await newUser.save();

        return res.status(201).json(saveUser);
    }
    catch (error) {
        return res.status(500).json({ message: 'Error registerrin user', error });
    }
}

//funcion para inisiar sesion
async function loginUser(req, res) {
    const { email, password } = req.body;
    
    try {
        //verificar si el usuario existe en la base de datos 
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'The user is not registered' });
        }

        //verificar la contrasena ingresada con la contrasena alamcenada
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: 'Incorrect password' });
        }

        return res.status(200).json({ message: 'Successful login' });
    }
    catch (error) {
        return res.status(500).json({ message: 'Failed to login', error });
    }
}

module.exports = {
    registerUser,
    loginUser
};