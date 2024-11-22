import React, { useState } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';


const RegisterOrg = () => {
  const [organization, setOrganization] = useState({
    name: "",
    email: "",
    password: "",
    location: "",
    socialAccounts: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrganization({ ...organization, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://localhost:7220/api/Organization/register", organization);
      alert("Organization registered successfully!");
      console.log(response.data);
    } catch (error) {
      console.error("Error registering organization", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="signform">
      <h2>Register Organization</h2>
      <input type="text" name="name" placeholder="Organization Name" onChange={handleChange} required />
      <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
      <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
      <input type="text" name="location" placeholder="Location" onChange={handleChange} />
      <textarea name="socialAccounts" placeholder="Social Accounts" onChange={handleChange}></textarea>
      <button type="submit">Register</button>
      <p>Already have an account?<Link to='/login/org'>Sign In</Link></p>
      <p><Link to='/register/user'>Join as a Volunteer</Link></p>
    </form>
  );
};

export default RegisterOrg;
