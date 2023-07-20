const mongoose = require('mongoose');
const config = require('./config')

mongoose.connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log('Database is coneccted');
})
.catch((error) => {
    console.error('Failed to connect to database', error);
});