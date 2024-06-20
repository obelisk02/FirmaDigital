// src/components/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
//import { styled } from "styled-components";

const Login = () => {
  const [email, setEmail] = useState('pruebas@gmail.com');
  const [password, setPassword] = useState('78rR8D]]');
  const [error, setError] = useState('');
  //const [navigate, setNavigate] = useState(false);
  const LOGIN_URL = "https://tableroelectronico-qa.michoacan.gob.mx/api/login";
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(LOGIN_URL, { email, password });
      localStorage.setItem('token', response.data.token);
      navigate('/home');
    } catch (err) {
      setError('Credenciales invalidas');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("Token");
    alert("Tokens have been removed");
    navigate('/login')
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Email</label>
          <input
            type="email"
            value={email}
            defaultValue=""
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            defaultValue=""
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p>{error}</p>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
