import React, { useState, useEffect } from "react";
import axios from "axios";
import ApplicantItem from "./ApplicantItem";

const ApplicantsList = ({ }) => {
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check if a token exists in localStorage
    const loggedInUser = localStorage.getItem('user');
    if (loggedInUser) {
      setUser(JSON.parse(loggedInUser)); // Assuming user info is stored as JSON
    }
  }, []);

  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        const response = await axios.get(`https://localhost:7220/api/VolunteerApplication/organization/${user.userId}/applications`);
        setApplicants(response.data.$values);
      } catch (error) {
        console.error("Error fetching applicants:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchApplicants();
  }, [user]);

  if (loading) return <p>Loading applicants...</p>;

  return (
    <div className="applicantslist">
      <h2>Applicants for {user.username}#{user.userId}</h2>
      <ul className="applicants">
        {applicants.length > 0 ? (
          applicants.map((applicant) => (
            <ApplicantItem key={applicant.id} applicant={applicant} opportunityId={applicant.opportunity.id} />
          ))
        ) : (
          <p>No applicants yet.</p>
        )}
      </ul>
    </div>
  );
};

export default ApplicantsList;
