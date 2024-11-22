import React, { useEffect, useState } from "react";
import axios from "axios";
import VolunteerGeneralInfo from "./VolunteerGeneralInfo";
import VolunteerAppliedOpportunities from "./VolunteerAppliedOpportunities";
import VolunteerFeedbacks from "./VolunteerFeedbacks";

const VolunteerDetailsPage = ({ volunteerId }) => {
  const [volunteer, setVolunteer] = useState(null);

  useEffect(() => {
    // Fetch volunteer details, including general info, applied opportunities, and feedbacks
    const fetchVolunteerDetails = async () => {
      try {
        const response = await axios.get(`https://localhost:7220/api/volunteer/${volunteerId}`);
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
    <div className="volunteer-details-page">
      <h1>Volunteer Details</h1>
      <VolunteerGeneralInfo volunteer={volunteer} />
      <VolunteerAppliedOpportunities appliedOpportunities={volunteer.appliedOpportunities} />
      <VolunteerFeedbacks feedbacks={volunteer.feedbacks} />
    </div>
  );
};

export default VolunteerDetailsPage;
