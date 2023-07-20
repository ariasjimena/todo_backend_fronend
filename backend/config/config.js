require('dotenv').config();

const config = {
    port: process.env.PORT || 5001,
    mongoURI: process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/todo-list',
    jwtSecret: process.env.JWT_SECRET || 'my-beautiful-love',
};
module.exports = config;