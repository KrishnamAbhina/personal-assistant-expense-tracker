// src/components/login/LoginPage.js
import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const LoginPage = ({ onLoginSuccess, onSwitchToRegister }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await axios.post('http://localhost:5000/api/v1/auth/login', {
        email,
        password
      });
      onLoginSuccess(res.data.token);
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <LoginStyled>
      <form onSubmit={handleLogin}>
        <h2>Login</h2>
        {error && <p className="error">{error}</p>}
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">Login</button>
        <p className="switch">New user? <span onClick={onSwitchToRegister}>Register</span></p>
      </form>
    </LoginStyled>
  );
};


const LoginStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;

  form {
    display: flex;
    flex-direction: column;
    padding: 2rem;
    background: white;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0,0,0,0.1);

    input, button {
      margin: 0.5rem 0;
      padding: 0.8rem;
      border-radius: 5px;
      border: 1px solid #ccc;
    }

    .error {
      color: red;
      margin-bottom: 1rem;
    }

    .switch {
      margin-top: 1rem;
      span {
        color: blue;
        cursor: pointer;
        text-decoration: underline;
      }
    }
  }
`;

export default LoginPage;


// src/components/login/RegisterPage.js