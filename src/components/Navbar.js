import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../style.css';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check if a token exists in localStorage
    const loggedInUser = localStorage.getItem('user');
    if (loggedInUser) {
      setUser(JSON.parse(loggedInUser)); // Assuming user info is stored as JSON
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user'); // Clear user data
    setUser(null);
    alert('Logged out successfully.');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link to="/" className="navbar-brand">VolunteerConnect</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <a className="nav-link" href="/#about">About</a>
            </li>
            <li className="nav-item">
              <Link to="/opportunities" className="nav-link">Projects</Link>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/#contact">Contact</a>
            </li>
            {user ? (
              <>
                <li className="nav-item">
                  {user.role === 'User' ? (
                    <Link to="/applicantions" className="nav-link">My Applications</Link>
                  ) : user.role === 'Organization' ? (
                    <Link to="/applicants" className="nav-link">View Applicants</Link>
                  ) : null}
                </li>
                <li className="nav-item">
                  {user.role === 'Organization' ? (
                    <Link to="/opportunity/create" className="nav-link">Create Opportunity</Link>
                  ) : null}
                </li>
                <li className="nav-item">
                  {user.role === 'User' ? (
                    <Link to="/user/profile" className="nav-link" style={{textDecoration:'none'}}>Welcome, {user.username || 'User'}!</Link>
                  ) : null}
                 {user.role === 'Organization' ? (
                    <Link to="/org/profile" className="nav-link" style={{textDecoration:'none'}}>Welcome, {user.username || 'Organization'}!</Link>
                  ) : null}
                </li>
                <li className="nav-item">
                  <button className="btn btn-secondary" onClick={handleLogout}>Logout</button>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <Link to="/login/user" className="btn btn-primary">Get Involved</Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
