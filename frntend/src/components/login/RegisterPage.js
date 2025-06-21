import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";

const RegisterPage = ({ onSwitch }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/v1/auth/register", {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });
      alert("Registered successfully!");
      setError("");
      onSwitch(); // switch to login form
    } catch (err) {
      setError(err.response?.data?.error || "Registration failed");
    }
  };

  return (
    <RegisterWrapper>
      <form onSubmit={handleRegister}>
        <h2>Create an Account</h2>
        {error && <p className="error">{error}</p>}
        <input
          type="text"
          placeholder="Your Name"
          value={formData.name}
          onChange={(e) =>
            setFormData({ ...formData, name: e.target.value })
          }
          required
        />
        <input
          type="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={(e) =>
            setFormData({ ...formData, email: e.target.value })
          }
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
          required
        />
        <button type="submit">Register</button>
        <p>
          Already have an account?{" "}
          <span onClick={onSwitch}>Login</span>
        </p>
      </form>
    </RegisterWrapper>
  );
};

const RegisterWrapper = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;

  form {
    background: white;
    padding: 2rem;
    border-radius: 10px;
    box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.1);
    width: 350px;
    display: flex;
    flex-direction: column;

    h2 {
      margin-bottom: 1rem;
      text-align: center;
    }

    .error {
      color: red;
      font-size: 0.9rem;
      margin-bottom: 1rem;
      text-align: center;
    }

    input {
      padding: 0.8rem;
      margin-bottom: 1rem;
      border: 1px solid #ddd;
      border-radius: 5px;
      font-size: 1rem;
    }

    button {
      padding: 0.8rem;
      border: none;
      border-radius: 5px;
      background-color: #007bff;
      color: white;
      font-weight: bold;
      cursor: pointer;
      transition: background-color 0.3s ease;

      &:hover {
        background-color: #0056b3;
      }
    }

    p {
      margin-top: 1rem;
      font-size: 0.9rem;
      text-align: center;

      span {
        color: #007bff;
        cursor: pointer;
        font-weight: 500;
        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
`;

export default RegisterPage;
