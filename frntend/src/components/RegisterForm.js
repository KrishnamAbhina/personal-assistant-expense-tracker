import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // 🔁 import navigate

function RegisterForm() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate(); // 🔁 hook for navigation

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/v1/auth/register', form);
      alert('✅ Registered successfully!');
      navigate('/login'); // 🔁 go to login page
    } catch (err) {
      alert(err.response?.data?.message || '❌ Registration error');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="name"
        placeholder="Name"
        onChange={handleChange}
        required
      />
      <input
        name="email"
        type="email"
        placeholder="Email"
        onChange={handleChange}
        required
      />
      <input
        name="password"
        type="password"
        placeholder="Password"
        onChange={handleChange}
        required
      />
      <button type="submit">Register</button>

      <p style={{ marginTop: '1rem' }}>
        Already have an account?{' '}
        <span
          style={{ color: '#007bff', cursor: 'pointer', textDecoration: 'underline' }}
          onClick={() => navigate('/login')}
        >
          Login
        </span>
      </p>
    </form>
  );
}

export default RegisterForm;
