import React, { useState, useEffect } from "react";
import {Link} from 'react-router-dom';
import axios from "axios";
import ApplicantCount from "./ApplicantCount";

const OrganizationOpportunities = () => {
  const [opportunities, setOpportunities] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loggedInOrg = localStorage.getItem("user");
    if (loggedInOrg) {
      const parsedOrg = JSON.parse(loggedInOrg);
      fetchOpportunities(parsedOrg.userId);
      console.log(parsedOrg.userId);
    } else {
      setMessage("Organization not logged in.");
      setLoading(false);
    }
  }, []);

  const fetchOpportunities = async (organizationId) => {
    try {
      // Fetching the list of opportunity IDs
      const response = await axios.get(
        `https://localhost:7220/api/VolunteerOpportunity/organization/${organizationId}`
      );
      
      // Assuming the response contains an array of opportunity IDs under $values
      const opportunityIds = response.data.$values;

      // Fetching details of each opportunity by its ID
      const opportunityDetailsPromises = opportunityIds.map((id) =>
        axios.get(`https://localhost:7220/api/VolunteerOpportunity/${id}`)
      );

      const detailsResponses = await Promise.all(opportunityDetailsPromises);

      // Extracting the opportunity data from the responses
      const opportunitiesData = detailsResponses.map((resp) => resp.data);

      setOpportunities(opportunitiesData);
      setLoading(false);
    } catch (error) {
      setMessage("Error fetching opportunities.");
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (message) return <div>{message}</div>;

  return (
    <div className="oppform">
      <h2>Your Opportunities</h2>
      {opportunities.map((opp) => (
        <div key={opp.id} className="opp-item">
          <Link to={`/opportunity/${opp.id}`}>
          <h3>{opp.title}#{opp.id}</h3>
          </Link>
          <p>Location: {opp.location}</p>
          <p>Applicants: <ApplicantCount opportunityId={opp.id} /></p>
        </div>
      ))}
    </div>
  );
};

export default OrganizationOpportunities;
