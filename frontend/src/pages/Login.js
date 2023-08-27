import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import instance from '../services/api';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
      e.preventDefault();
        try {
            const response = await instance.post('/auth/login', { email, password });
            const { token } = response.data;
            localStorage.setItem('token', token);

            window.alert('Inicio de sesion exitoso');

            //redireccionar a la pagina de tareas
            navigate('/listTask')
        }
        catch (error) {
            console.error('Error logging in:', error);
        }
    };
    return (
        <div className="container mt-5">
      <h2 className="mb-4">Login</h2>
      <form>
        <div className="form-group">
          <input
            type="email"
            className="form-control"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            className="form-control"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className="btn btn-primary" onClick={handleLogin}>Login</button>
      </form>
    </div>
    );
};

export default Login;