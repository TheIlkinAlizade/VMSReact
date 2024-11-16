import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import VolunteerOpportunities from './components/VolunteerOpportunities ';
// import Register from './components/Register';
// import Login from './components/Login';
// import Profile from './components/Profile';
// import Admin from './components/Admin';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './components/Login';
import RegisterOrg from './components/RegisterOrg';
import RegisterUser from './components/RegisterUser';
import Navbar from './components/Navbar';
import OpportunityCard from './components/OpportunityCard';
import ApplicantsList from './components/ApplicantsList';
import MyApplications from './components/MyApplications';


const App = () => {
  return (
    <Router>
      <Navbar/>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/opportunities" element={<VolunteerOpportunities />} />
        <Route path="/opportunity/:id" element={<OpportunityCard />} />

        <Route path="/register/user" element={<RegisterUser />} />
        <Route path="/register/org" element={<RegisterOrg />} />
        <Route path="/login/user" element={<Login role="User" />} />
        <Route path="/login/org" element={<Login role="Organization" />} />
        <Route path="/applicants" element={<ApplicantsList />} />
        <Route path="/applicantions" element={<MyApplications />} />
        {/* Protected routes */}
        <Route path="/profile" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/admin" element={<ProtectedRoute><Home /></ProtectedRoute>} />
      </Routes>
    </Router>
  );
};

export default App;




// import React, { useState } from 'react';
// import axios from 'axios';
// import RequestOpportunityForm from './components/RequestOpportunityForm ';
// import Home from './components/Home';

// const App = () => {
//     const [username, setUsername] = useState('');
//     const [password, setPassword] = useState('');
//     const [token, setToken] = useState('');

//     const registerUser = async () => {
//         try {
//             const response = await axios.post('http://localhost:5001/api/account/register', {
//                 username,
//                 password,
//             });
//             console.log(response.data); // Log the response data
//             console.log("Registration successful!"); // Log success message
//         } catch (error) {
//             console.error("Registration error:", error.response ? error.response.data : error.message); // Log error message
//             console.log("Registration failed."); // Log failure message
//         }
//     };

//     const loginUser = async () => {
//         try {
//             const response = await axios.post('http://localhost:5001/api/account/login', {
//                 username,
//                 password,
//             });
//             setToken(response.data.token);
//             console.log("Login successful!"); // Log success message
//             console.log(response.data); // Log the response data
//         } catch (error) {
//             console.error("Login error:", error.response ? error.response.data : error.message); // Log error message
//             console.log("Login failed."); // Log failure message
//         }
//     };

//     return (
//         <div>
//             <Home></Home>
//         </div>
//     );
// };

// export default App;



// <h1>Volunteer Management System</h1>
// <h2>Register</h2>
// <input 
//     placeholder="Username" 
//     onChange={(e) => setUsername(e.target.value)} 
// />
// <input 
//     placeholder="Password" 
//     type="password" 
//     onChange={(e) => setPassword(e.target.value)} 
// />
// <button onClick={registerUser}>Register</button>

// <h2>Login</h2>
// <button onClick={loginUser}>Login</button>

// {token && (
//     <div>
//         <h2>Create a Request</h2>
//         <RequestOpportunityForm opportunityId={1} /> {/* Example opportunity ID */}
//     </div>
// )}

