import React, { useState, useEffect } from 'react';

// Function to fetch the organization data by its ID
const getOrganizationNameById = async (organizationId) => {
  try {
    const response = await fetch(`https://localhost:7220/api/Organization/${organizationId}`);
    const data = await response.json();
    return data.name;
  } catch (error) {
    console.error('Error fetching organization:', error);
    return "No organization specified"; // Fallback if an error occurs
  }
};

const OrganizationName = ({ organizationId }) => {
  const [organizationName, setOrganizationName] = useState(null);

  useEffect(() => {
    const fetchOrganizationName = async () => {
      const name = await getOrganizationNameById(organizationId);
      setOrganizationName(name);
    };

    if (organizationId) {
      fetchOrganizationName();
    }
  }, [organizationId]);

  return (
    <>
      {organizationName ? organizationName : "Loading..."}
    </>
  );
};

export default OrganizationName;
