const Task = require('../models/task');

//funcion para crear una nueva tarea 
async function createTask(req, res) {
    const { title, description, user } = req.body;

    try {
        //creamos una tarea utilizando el modelo task
        const newTask = new Task({
            title,
            description,
            user
        });

        //guardamos la tarea en la base de datos
        const savedTask = await newTask.save();

        return res.status(201).json(savedTask);
    }
    catch (error) {
        return res.status(500).json({ message: 'Error creating task', error });
    }
}

//funcion para obtener todas las tareas 
async function getAllTask(req, res) {
    try {
        //utilizamos el metodo fin para obtener todas las tareas
        const task = await Task.find();

        return res.status(200).json(task);
    }
    catch (error) {
        return res.status(500).json({ message: 'Error getting task', error });
    }
}

//funcion para editar una tarea
async function editTask(req, res) {
    const taskId = req.params.id;
    const { title, description } = req.body;

    try {
        //buscar la tarea por su id
        const task = await Task.findById(taskId);

        if (!task) {
            return res.status(404).json({ message: 'Tha task was not found' });
        }

        //actualizar los campos de la tarea
        task.title = title;
        task.description = description;

        //guardar los cambios en la base de datos
        const updatedTask = await task.save();

        return res.status(200).json(updatedTask);
    }
    catch (error) {
       
        return res.status(500).json({ message: 'Error editing task', error });
    }
}

//funcion para eliminar una tarea por su id
async function deleteTask(req, res) {
    const taskId = req.params.id;

    try {
        //buscar la tarea por su id 
        const task = await Task.findById(taskId);

        if (!task) {
            return res.status(404).json({ message: 'The task was not found' });
        }

        //eliminar la tarea de la base de datos
        await task.deleteOne({_id:taskId});

        return res.status(200).json({ message: 'Deleted task' });
    }
    catch (error) {
        return res.status(500).json({ message: 'Error deliting task', error });
    }
}

module.exports = {
    createTask,
    getAllTask,
    editTask,
    deleteTask
}