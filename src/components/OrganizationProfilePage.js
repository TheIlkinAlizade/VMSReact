import React, { useState, useEffect } from 'react';
import OrganizationOpportunities from './OrganizationOpportunities ';

const OrganizationProfilePage = () => {
  const [organization, setOrganization] = useState({});
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [location, setLocation] = useState('');
  const [socialAccounts, setSocialAccounts] = useState('');

  useEffect(() => {
    const loggedInOrg = localStorage.getItem('user');
    if (loggedInOrg) {
      const parsedOrg = JSON.parse(loggedInOrg);
      setOrganization(parsedOrg);
      fetchOrganization(parsedOrg.userId);
    } else {
      setMessage('Organization not logged in.');
      setLoading(false);
    }
  }, []);

  // Fetch organization data
  const fetchOrganization = async (id) => {
    try {
      const response = await fetch(`https://localhost:7220/api/Organization/${id}`);
      const data = await response.json();
      setOrganization(data);
      setLocation(data.location || '');
      setSocialAccounts(data.socialAccounts || '');
      setLoading(false);
    } catch (error) {
      setMessage('Error fetching organization data.');
      setLoading(false);
    }
  };

  const updatePassword = async () => {
    if (!newPassword) {
      setMessage('New password cannot be empty.');
      return;
    }

    try {
      const response = await fetch(`https://localhost:7220/api/Organization/${organization.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...organization, password: newPassword }),
      });

      if (!response.ok) {
        setMessage('Error updating password.');
      } else {
        setMessage('Password updated successfully.');
      }
    } catch (error) {
      setMessage('Error updating password.');
    }
  };

  const updateProfile = async () => {
    try {
      const response = await fetch(`https://localhost:7220/api/Organization/${organization.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...organization,
          location,
          socialAccounts,
        }),
      });

      if (!response.ok) {
        setMessage('Error updating profile.');
      } else {
        setMessage('Profile updated successfully.');
      }
    } catch (error) {
      setMessage('Error updating profile.');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!organization) return <div>Organization not found.</div>;

  return (
    <div className="oppform">
      <h1>{organization.name}</h1>
      <p>Email: {organization.email}</p>

      <div>
        <h3>Update Password</h3>
        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <button onClick={updatePassword}>Update Password</button>
      </div>

      <div>
        <h3>Update Profile</h3>
        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <textarea
          placeholder="Social Accounts"
          value={socialAccounts}
          onChange={(e) => setSocialAccounts(e.target.value)}
        />
        <button onClick={updateProfile}>Update Profile</button>
      </div>

      {message && <div>{message}</div>}
      <OrganizationOpportunities></OrganizationOpportunities>
    </div>
  );
};

export default OrganizationProfilePage;
