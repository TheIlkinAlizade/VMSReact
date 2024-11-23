import React, { useEffect, useState } from "react";
import axios from "axios";
import VolunteerGeneralInfo from "./VolunteerGeneralInfo";
import VolunteerAppliedOpportunities from "./VolunteerAppliedOpportunities";
import VolunteerFeedbacks from "./VolunteerFeedbacks";
import { Link, useParams } from 'react-router-dom'; 

const VolunteerDetailsPage = () => {
  const { volunteerId } = useParams(); 
  const [volunteer, setVolunteer] = useState(null);
  console.log(volunteerId);
  useEffect(() => {
    const fetchVolunteerDetails = async () => {
      try {
        const response = await axios.get(`https://localhost:7220/api/User/${volunteerId}`);
        setVolunteer(response.data);
      } catch (error) {
        console.error("Error fetching volunteer details:", error);
      }
    };

    fetchVolunteerDetails();
  }, [volunteerId]);

  if (!volunteer) {
    return <p>Loading volunteer details...</p>;
  }

  return (
    <div className="oppform">
      <h1>Volunteer Details</h1>
      <VolunteerGeneralInfo volunteer={volunteer} />
      <VolunteerAppliedOpportunities id={volunteer.id} />
      <VolunteerFeedbacks id={volunteer.id} />
    </div>
  );
};

export default VolunteerDetailsPage;
