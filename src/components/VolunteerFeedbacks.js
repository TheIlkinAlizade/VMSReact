import React from "react";

const VolunteerFeedbacks = ({ feedbacks }) => {
  return (
    <div className="volunteer-feedbacks">
      <h2>Feedbacks</h2>
      {feedbacks.length > 0 ? (
        <ul>
          {feedbacks.map((feedback, index) => (
            <li key={index}>
              <p>{feedback}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No feedbacks available.</p>
      )}
    </div>
  );
};

export default VolunteerFeedbacks;
