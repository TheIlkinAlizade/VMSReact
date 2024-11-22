import React from "react";

const VolunteerAppliedOpportunities = ({ appliedOpportunities }) => {
  return (
    <div className="volunteer-applied-opportunities">
      <h2>Applied Opportunities</h2>
      {appliedOpportunities.length > 0 ? (
        <ul>
          {appliedOpportunities.map((opportunity) => (
            <li key={opportunity.id}>
              <h3>{opportunity.title}</h3>
              <p><strong>Application Date:</strong> {new Date(opportunity.appliedDate).toLocaleDateString()}</p>
              <p><strong>Status:</strong> {opportunity.isAccepted ? "Accepted" : "Pending"}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No opportunities applied for yet.</p>
      )}
    </div>
  );
};

export default VolunteerAppliedOpportunities;
