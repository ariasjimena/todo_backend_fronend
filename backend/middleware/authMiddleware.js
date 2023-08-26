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
        jwt.verify(token.split(' ')[1], config.jwtSecret, async (err, decoded)=>{
            if(err) return res.json('error')
            console.log(decoded)

        const user = await User.findById(decoded.userId).lean();

        if (!user) {
            return res.status(401).json({ message: 'Invalid token. User not found' });
        }
        
        //agregar el usuario al objeto req para que este disponible
        req.user = user;

        next();
    });
    }
    catch (error) {
        return res.status(401).json({ message: 'Invalid token' });
    }
}

module.exports = authMiddleware;