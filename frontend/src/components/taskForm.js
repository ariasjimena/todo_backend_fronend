import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import instance from '../services/api';

function CreateTask() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const Navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Realizar la petición para crear una tarea
      const response = await instance.post('/tasks/tasks', {
        title,
        description,
      });

      console.log('Task created:', response.data);
      setTitle('');
      setDescription('');

      Navigate('/listTask')
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Create Task</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <button className="btn btn-primary" type="submit">Create</button>
      </form>
    </div>
  );
}

export default CreateTask;
