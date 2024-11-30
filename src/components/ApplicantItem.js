import React, { useState, useEffect } from "react";
import axios from "axios";
import OpportunityName from "./OpportunityName";
import { Link } from "react-router-dom";

const ApplicantItem = ({ applicant, opportunityId, onDelete }) => {
  const [status, setStatus] = useState(applicant.isAccepted ? "Accepted" : "Pending");
  const [user, setUser] = useState(null);
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  const [feedback, setFeedback] = useState({ comment: "", rating: 0 });

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      setUser(JSON.parse(loggedInUser)); // Assuming user info is stored as JSON
    }
  }, []);

  const handleAccept = async () => {
    try {
      await axios.patch(
        `https://localhost:7220/api/VolunteerApplication/accept/${applicant.applicationId}`,
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
        `https://localhost:7220/api/VolunteerApplication/accept/${applicant.applicationId}`,
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
      await axios.delete(`https://localhost:7220/api/VolunteerApplication/delete/${applicant.applicationId}`);
      alert("Applicant deleted!");
      if (onDelete) {
        onDelete(applicant.id); // Notify parent to update the list
      }
    } catch (error) {
      console.error("Error deleting applicant:", error);
      alert("Error deleting applicant.");
    }
  };

  const handleFeedbackSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `https://localhost:7220/api/Feedback/submit`,
        {
          userId: applicant.user.id,
          opportunityId: opportunityId,
          organizationId: user.userId,
          comment: feedback.comment,
          rate: feedback.rate,
        },
        {
          headers: {
            "Content-Type": "application/json",
          }
        }
      );
      alert("Feedback submitted successfully!");
      setShowFeedbackForm(false);
      setFeedback({ comment: "", rating: 0 });
    } catch (error) {
      console.error("Error submitting feedback:", error);
      alert("Error submitting feedback.");
    }
  };

  return (
    <li className="applicant">
    <Link to={`/volunteer/${applicant.user.id}`} style={{textDecoration:'none'}}>
      <h3>
        {applicant.user.name} {applicant.user.surname}
      </h3>
    </Link>
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
          {!showFeedbackForm && (
            <button onClick={() => setShowFeedbackForm(true)}>Leave Feedback</button>
          )}
        </div>
      )}

      {showFeedbackForm && (
        <form onSubmit={handleFeedbackSubmit} className="feedback-form">
          <h4>Leave Feedback</h4>
          <textarea
            placeholder="Write your feedback..."
            value={feedback.comment}
            onChange={(e) => setFeedback({ ...feedback, comment: e.target.value })}
            required
          ></textarea>
          <input type="number" name="rate"  onChange={(e) => setFeedback({ ...feedback, rate: e.target.value })} />
          <button type="submit">Submit Feedback</button>
          <button type="button" onClick={() => setShowFeedbackForm(false)}>Cancel</button>
        </form>
      )}
    </li>
  );
};

export default ApplicantItem;
