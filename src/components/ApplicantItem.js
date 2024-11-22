import React, { useState, useEffect } from "react";
import axios from "axios";
import OpportunityName from "./OpportunityName";

const ApplicantItem = ({ applicant, opportunityId, onDelete }) => {
  const [status, setStatus] = useState(applicant.isAccepted ? "Accepted" : "Pending");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      setUser(JSON.parse(loggedInUser)); // Assuming user info is stored as JSON
    }
  }, []);

  const handleAccept = async () => {
    try {
      await axios.patch(
        `https://localhost:7220/api/VolunteerApplication/accept/${applicant.id}`,
        true,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setStatus("Accepted");
      alert("Applicant accepted!");
    } catch (error) {
      console.error("Error accepting applicant:", error);
      alert("Error accepting applicant.");
    }
  };

  const handleDeny = async () => {
    try {
      await axios.patch(
        `https://localhost:7220/api/VolunteerApplication/accept/${applicant.id}`,
        false,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setStatus("Denied");
      alert("Applicant denied!");
    } catch (error) {
      console.error("Error denying applicant:", error);
      alert("Error denying applicant.");
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`https://localhost:7220/api/VolunteerApplication/delete/${applicant.id}`);
      alert("Applicant deleted!");
      if (onDelete) {
        onDelete(applicant.id); // Notify parent to update the list
      }
    } catch (error) {
      console.error("Error deleting applicant:", error);
      alert("Error deleting applicant.");
    }
  };

  return (
    <li className="applicant">
      <h3>
        {applicant.user.name} {applicant.user.surname}
      </h3>
      <p>Applied For: <OpportunityName opportunityId={opportunityId} /> </p>
      <p>Email: {applicant.user.email}</p>
      <p>Status: {status}</p>

      {status === "Pending" ? (
        <div>
          <button onClick={handleAccept}>Accept</button>
          <button onClick={handleDeny}>Deny</button>
        </div>
      ) : (
        <div>
          <button onClick={handleDelete}>Delete</button>
        </div>
      )}
    </li>
  );
};

export default ApplicantItem;