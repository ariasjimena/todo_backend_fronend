import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import instance from "../services/api";

const AuthRegister = () => {
    const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await instance.post('/auth/register', {
        name,
        email,
        password,
      });
      alert('successful user registration')
      navigate('/login')
    }
    catch (error) {
      alert('user registration error')
      console.error('user registration error:', error.message);
    }
  };
  return (
    <div className="container mt-5">
      <h2 className="mb-4">User Register</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="userName">User Name:</label>
          <input type="text" className="form-control" id="UserName" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input type="email" className="form-control" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input type="password" className="form-control" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type="submit" className="btn btn-primary">Registrarse</button>
      </form>
    </div>
  )
};

export default AuthRegister;