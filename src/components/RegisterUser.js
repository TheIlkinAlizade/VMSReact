import React, { useState } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';

const RegisterUser = () => {
  const [user, setUser] = useState({
    name: "",
    surname: "",
    email: "",
    password: "",
    dateOfBirth: "",
    cv: null,
    experience: "",
    phone: "",
    address: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://localhost:7220/api/User/register", user);
      alert("User registered successfully!");
      console.log(response.data);
    } catch (error) {
      console.error("Error registering user", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="signform">
      <h2>Register User</h2>
      <input type="text" name="name" placeholder="Name" onChange={handleChange} required />
      <input type="text" name="surname" placeholder="Surname" onChange={handleChange} required />
      <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
      <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
      <input type="date" name="dateOfBirth" onChange={handleChange} required />
      <input type="text" name="address" placeholder="Address(Optional)" onChange={handleChange} />
      <input type="text" name="phone" placeholder="Phone" onChange={handleChange} required />
      <textarea name="experience" placeholder="Experience" onChange={handleChange}></textarea>
      <button type="submit">Register</button>
      <p>Already have an account?<Link to='/login/user'>Sign In</Link></p>
      <p><Link to='/register/org'>Join as Organization account</Link></p>
    </form>
  );
};

export default RegisterUser;
