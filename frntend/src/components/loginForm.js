
// frontend/components/LoginForm.js
import React, { useState } from 'react';
import axios from 'axios';

function LoginForm({ onLogin }) {
  const [form, setForm] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/v1/login', form);
      localStorage.setItem('token', res.data.token);
      alert('Login successful');
      onLogin(res.data.user);
    } catch (err) {
      alert(err.response?.data?.message || 'Login error');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="email" type="email" placeholder="Email" onChange={handleChange} required />
      <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
      <button type="submit">Login</button>
    </form>
  );
}

export default LoginForm;
