const express = require('express');
const routerTask = express.Router();
const taskController = require('../controllers/taskController');
const authMiddleware = require('../middleware/authMiddleware');

//ruta para crear una nueva tarea
routerTask.post('/tasks',authMiddleware, taskController.createTask);

//ruta para obtener todas las tareas 
routerTask.get('/tasks',authMiddleware, taskController.getAllTask);

//ruta para iditar una tarea por su id
routerTask.put('/tasks/:id',authMiddleware, taskController.editTask);

//ruta para eliminar una tarea por su id
routerTask.delete('/tasks/:id',authMiddleware, taskController.deleteTask);

module.exports = routerTask;