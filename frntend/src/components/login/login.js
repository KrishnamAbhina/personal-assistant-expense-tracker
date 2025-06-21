// components/login/login.js
import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

function LoginPage({ onLogin }) {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

 const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const response = await axios.post('http://localhost:5000/api/v1/login', {
      email: formData.email,
      password: formData.password
    });

    console.log('Login Successful:', response.data);
    onLogin(); // You can pass token here if needed
  } catch (error) {
    console.error('Login error:', error.response?.data?.message || error.message);
    alert('Login failed!');
  }
};




  return (
    <LoginStyled>
      <form onSubmit={handleSubmit}>
        <h2>Login</h2>

        {error && <p className="error">{error}</p>}

        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          required
        />

        <button type="submit">Submit</button>
      </form>
    </LoginStyled>
  );
}

const LoginStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  padding: 2rem;

  form {
    display: flex;
    flex-direction: column;
    background: #fff;
    padding: 2rem;
    border-radius: 1rem;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 400px;
    gap: 1rem;

    h2 {
      text-align: center;
      color: #333;
    }

    input,
    button {
      padding: 0.8rem;
      border-radius: 0.5rem;
      border: 1px solid #ccc;
      font-size: 1rem;
    }

    .error {
      color: red;
      font-size: 0.9rem;
      text-align: center;
      margin-bottom: -0.5rem;
    }

    button {
      background-color: #2ecc71;
      color: white;
      cursor: pointer;
      border: none;
      transition: background-color 0.3s;
      &:hover {
        background-color: #27ae60;
      }
    }
  }
`;

export default LoginPage;
