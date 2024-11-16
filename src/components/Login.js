import React, { useState } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';

const Login = ({ role }) => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let response = null;

      if (role === "User") {
        response = await axios.post('https://localhost:7220/api/User/user/login', {
          email: credentials.email,
          password: credentials.password,
        });
        localStorage.setItem('user', JSON.stringify({ userId: response.data.user.id, email: response.data.user.email, username: response.data.user.name, role: role }));
      } else if (role === "Organization") {
        response = await axios.post('https://localhost:7220/api/Organization/organization/login', {
          email: credentials.email,
          password: credentials.password,
        });
        localStorage.setItem('user', JSON.stringify({ userId: response.data.organization.id, email: response.data.organization.email, username: response.data.organization.name, role: role }));
      }

      alert(`${role} logged in successfully!`);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error(
        'Login failed:',
        error.response?.data?.Message || error.message
      );
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login as {role}</h2>
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={credentials.email}
        onChange={handleChange}
        required
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={credentials.password}
        onChange={handleChange}
        required
      />
      <button type="submit">Login</button>

      {role === "User" ? (
        <>
          <Link to='/login/org'>Sign in as an Organization</Link>
          <p>Don't have an account?<Link to='/register/user'>Sign Up</Link></p>
        </>
      ) : (
        <>
          <Link to='/login/user'>Sign in as a User</Link>
          <p>Don't have an account?<Link to='/register/org'>Sign Up</Link></p>
        </>
      )}
    </form>
  );
};

export default Login;
