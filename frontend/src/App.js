import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import AuthRegister from './pages/Register';
import Login from "./pages/Login";
import CreateTask from "./components/taskForm";
import HomePage from "./pages/homePage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/register" element={<AuthRegister/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/taks" element={<CreateTask/>} />
      </Routes>
    </Router>
  )}

export default App;