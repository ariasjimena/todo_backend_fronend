const express = require('express');
const config = require('./config/config')
require('./config/db');
const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');

const app = express();
//configurar el puerto
const PORT = config.port

//middleware para manejar solicitudes Json
app.use(express.json());

//rutas de autenticacion
app.use('/auth', authRoutes);

//rutas de tareas 
app.use('/tasks', taskRoutes);

app.listen(PORT, () => {
    console.log(`Server express listening on port ${PORT}`);
})