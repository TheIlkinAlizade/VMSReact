import React, { useState, useEffect } from 'react';

// Define the function outside for reusability
const getOpportunityNameById = async (opportunityId) => {
  try {
    const response = await fetch(`https://localhost:7220/api/VolunteerOpportunity/name/${opportunityId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch opportunity name');
    }
    const name = await response.text();
    return name;
  } catch (error) {
    console.error('Error fetching opportunity name:', error);
    return 'Unknown Opportunity'; // Fallback if an error occurs
  }
};

const OpportunityName = ({ opportunityId }) => {
  const [opportunityName, setOpportunityName] = useState(null);

  useEffect(() => {
    const fetchOpportunityName = async () => {
      const name = await getOpportunityNameById(opportunityId);
      setOpportunityName(name);
    };

    if (opportunityId) {
      fetchOpportunityName();
    }
  }, [opportunityId]);

  return (
    <>
      {opportunityName ? opportunityName : "Loading..."}
    </>
  );
};

export default OpportunityName;
