const jwt = require('jsonwebtoken');
const config = require('../config/config');
const User = require('../models/user');

//middleware para verificar el token de autenticacion 
async function authMiddleware(req, res, next) {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ message: 'Missing authentication token' });
    }

    try {
        const decodedToken = jwt.verify(token, config.jwtSecret);
        const user = await User.findById(decodedToken.userId);

        if (!user) {
            return res.status(401).json({ message: 'Invalid token. User not found' });
        }
        
        //agregar el usuario al objeto req para que este disponible
        req.user = user;

        next();
    }
    catch (error) {
        return res.status(401).json({ message: 'Invalid token' });
    }
}

module.exports = authMiddleware;