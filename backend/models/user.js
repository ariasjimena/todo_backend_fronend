const mongoose = require('mongoose');

//define el esquema de usuario
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
        unique: true,
    },
    password: {
        type: String,
        require: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});
//crea el modelo de usuario utilizando el esquema definido
const User = mongoose.model('User', userSchema);

//exporta el modelo para que pueda ser utilizado
module.exports = User;