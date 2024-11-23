import React, { useState, useEffect } from "react";
import axios from "axios";

const ApplicantCount = ({ opportunityId }) => {
  const [applicantCount, setApplicantCount] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchApplicantCount = async () => {
      try {
        const response = await axios.get(
          `https://localhost:7220/api/VolunteerApplication/applications/${opportunityId}`
        );
        setApplicantCount(response.data.$values.length); // Assuming the response is an array of applications
        setLoading(false);
      } catch (error) {
        setError("Error fetching applicant count.");
        setLoading(false);
      }
    };

    fetchApplicantCount();
  }, [opportunityId]);

  if (loading) return <span>Loading...</span>;
  if (error) return <span>No Applicants found</span>;

  return <span>{applicantCount}</span>;
};

export default ApplicantCount;
