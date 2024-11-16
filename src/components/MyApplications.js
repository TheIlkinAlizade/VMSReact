import React, { useEffect, useState } from "react";
import axios from "axios";

const MyApplications = () => {
  const [applications, setApplications] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const loggedInUser = localStorage.getItem("user");

        if (loggedInUser) {
          const parsedUser = JSON.parse(loggedInUser);
          setUser(parsedUser);

          // Fetch the user's applications
          const response = await axios.get(
            `https://localhost:7220/api/VolunteerApplication/user/${parsedUser.userId}/applications`
          );

          setApplications(response.data.$values); // Assuming response.data is the list of applications
        }
      } catch (error) {
        console.error("Error fetching applications:", error);
      } finally {
        setLoading(false); // Stop loading spinner regardless of success or error
      }
    };

    fetchApplications();
  }, []);

  if (loading) {
    return <p>Loading applications...</p>;
  }

  return (
    <div>
      <h1>My Applications</h1>
      {applications.length === 0 ? (
        <p>You have not applied for any opportunities yet.</p>
      ) : (
        <ul>
        {applications.map((application) => (
          <li key={application.id}>
            <h3>{application.volunteerOpportunity.title}</h3>
            <p>
              Organization:{" "}
              {application.volunteerOpportunity.organization
                ? application.volunteerOpportunity.organization.name
                : "No organization specified"}
            </p>
            <p>Status: {application.isAccepted ? "Accepted" : "Pending"}</p>
            <p>Applied On: {new Date(application.createdAt).toLocaleDateString()}</p>
          </li>
        ))}
      </ul>
      )}
    </div>
  );
};

export default MyApplications;
