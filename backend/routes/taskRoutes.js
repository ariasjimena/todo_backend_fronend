const express = require('express');
const routerTask = express.Router();
const taskController = require('../controllers/taskController');

//ruta para crear una nueva tarea
routerTask.post('/tasks', taskController.createTask);

//ruta para obtener todas las tareas 
routerTask.get('/tasks', taskController.getAllTask);

//ruta para iditar una tarea por su id
routerTask.put('/tasks/:id', taskController.editTask);

//ruta para eliminar una tarea por su id
routerTask.delete('/tasks/:id', taskController.deleteTask);

module.exports = routerTask;