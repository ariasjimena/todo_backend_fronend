import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import instance from '../services/api';

function TaskList() {
    const [tasks, setTasks] = useState([]);
    const [editingTask, setEditingTask] = useState(null);
    const [editedTitle, setEditedTitle] = useState('');

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = () => {
        instance.get('/tasks/tasks')
            .then(response => {
                setTasks(response.data);
            })
            .catch(error => {
                console.error('Error fetching tasks:', error);
            });
    };

    const handleEdit = (task) => {
        setEditingTask(task);
        setEditedTitle(task.title);
    };

    const handleTitleChange = (event) => {
        setEditedTitle(event.target.value);
    };

    const handleSave = () => {
        if (!editedTitle) {
            return; // No guardar si el título está vacío
        }

        instance.put(`/tasks/tasks/${editingTask._id}`, { title: editedTitle })
            .then(response => {
                fetchTasks(); // Actualiza la lista después de editar
                setEditingTask(null); // Limpia la tarea en edición
            })
            .catch(error => {
                console.error('Error editing task:', error);
            });
    };

    const handleDelete = (taskId) => {
        instance.delete(`/tasks/tasks/${taskId}`)
            .then(response => {
                fetchTasks(); // Actualiza la lista después de eliminar
            })
            .catch(error => {
                console.error('Error deleting task:', error);
            });
    };

    return (
        <div className="container">
            <h1 className="mt-4 mb-3">Task List</h1>
            <ul className="list-group">
                {tasks.map(task => (
                    <li key={task._id} className="list-group-item d-flex justify-content-between align-items-center">
                        {task.title}
                        <button className="btn btn-primary mx-1" onClick={() => handleEdit(task)}>Edit</button>
                        <button className="btn btn-danger mx-1" onClick={() => handleDelete(task._id)}>Delete</button>
                    </li>
                ))}
            </ul>
            <Link to="/taks">
                <button className="btn btn-success mt-3">Add Task</button>
            </Link>
            {editingTask && (
                <div className="mt-3">
                    <h2>Edit Task</h2>
                    <input
                        type="text"
                        className="form-control mb-2"
                        value={editedTitle}
                        onChange={handleTitleChange}
                    />
                    <button className="btn btn-primary mr-2" onClick={handleSave}>Save</button>
                    <button className="btn btn-danger" onClick={() => setEditingTask(null)}>Cancel</button>
                </div>
            )}
        </div>
    );
}

export default TaskList;
