import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const ProfilePage = () => {
  const [newPassword, setNewPassword] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [experience, setExperience] = useState('');
  const [message, setMessage] = useState('');
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loggedInUser = localStorage.getItem('user');
    if (loggedInUser) {
      const parsedUser = JSON.parse(loggedInUser);
      setUser(parsedUser);
      fetchUser(parsedUser.userId);
    } else {
      setMessage('User not logged in.');
      setLoading(false);
    }
  }, []);

  // Fetch user data from API
  const fetchUser = async (userId) => {
    try {
      const response = await fetch(`https://localhost:7220/api/User/${userId}`);
      const data = await response.json();
      setUser(data);
      setExperience(data.experience || ''); // Set initial experience value
      setLoading(false);
    } catch (error) {
      setMessage('Error fetching user data.');
      setLoading(false);
    }
  };

  const updatePassword = async () => {
    if (!oldPassword || !newPassword) {
      setMessage('Both old and new passwords are required.');
      return;
    }
  
    try {
      const response = await fetch(`https://localhost:7220/api/User/update-password/${user.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ oldPassword, newPassword }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        setMessage(`Error updating password: ${errorData.Message || 'Unknown error'}`);
      } else {
        const result = await response.json();
        setMessage(result.Message || 'Password updated successfully');
      }
    } catch (error) {
      console.error('Error updating password:', error);
      setMessage('Error updating password');
    }
  };
  
  const updateExperience = async () => {
    if (!experience) {
      setMessage('Experience cannot be empty.');
      return;
    }
  
    try {
      const response = await fetch(`https://localhost:7220/api/User/update-experience/${user.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(experience),  // Send experience directly as a string
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        setMessage(`Error updating experience: ${errorData.Message || 'Unknown error'}`);
      } else {
        const result = await response.json();
        setMessage(result.Message || 'Experience updated successfully');
      }
    } catch (error) {
      console.error('Error updating experience:', error);
      setMessage('Error updating experience');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!user) return <div>User not found</div>;

  return (
    <div className="oppform">
      <h1>{user.name}</h1>
      <p>{user.email} {user.id}</p>

      <div>
        <h3>Update Password</h3>
        <input
          type="password"
          placeholder="Old Password"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <button onClick={updatePassword}>Update Password</button>
      </div>

      <div>
        <h3>Update Experience</h3>
        <textarea
          value={experience}
          onChange={(e) => setExperience(e.target.value)}
        />
        <button onClick={updateExperience}>Update Experience</button>
      </div>

      {message && <div>{message}</div>}
    </div>
  );
};

export default ProfilePage;
