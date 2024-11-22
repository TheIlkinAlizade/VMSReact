import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; // To access URL parameters
import axios from 'axios';

const OpportunityDetail = () => {
  const { id } = useParams(); // Retrieve the opportunity ID from the URL
  const [opportunity, setOpportunity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hasApplied, setHasApplied] = useState(false); // New state for application status

  useEffect(() => {
    const fetchOpportunity = async () => {
      try {
        const response = await axios.get(`https://localhost:7220/api/VolunteerOpportunity/${id}`);
        setOpportunity(response.data);
      } catch (err) {
        console.error('Error fetching opportunity:', err);
        setError('Failed to load opportunity details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    const checkApplicationStatus = async () => {
      const loggedInUser = localStorage.getItem('user');
      if (!loggedInUser) return; // No user logged in, skip check

      const user = JSON.parse(loggedInUser);

      try {
        const response = await axios.get(`https://localhost:7220/api/VolunteerApplication/check`, {
          params: { userId: user.userId, opportunityId: id },
        });
        setHasApplied(response.data.applied);
      } catch (err) {
        console.error('Error checking application status:', err);
      }
    };

    fetchOpportunity();
    checkApplicationStatus();
  }, [id]);

  const handleApply = async () => {
    const loggedInUser = localStorage.getItem('user');
    if (!loggedInUser) {
      alert('User not logged in. Please log in to apply.');
      return;
    }

    const user = JSON.parse(loggedInUser);

    const application = {
      userId: user.userId,
      volunteerOpportunityId: id,
      isAccepted: false,
    };

    try {
      await axios.post('https://localhost:7220/api/VolunteerApplication/apply', application);
      alert('Application submitted successfully!');
      setHasApplied(true); // Update the application status
    } catch (error) {
      console.error('Error submitting application:', error);
      alert('Failed to submit application. Please try again.');
    }
  };

  if (loading) {
    return <div className="text-center my-4">Loading opportunity details...</div>;
  }

  if (error) {
    return <div className="alert alert-danger text-center my-4">{error}</div>;
  }

  return (
    <div className="container my-4">
{opportunity ? (
    <div className="card post">
      <img
        src={opportunity.imageUrl || 'http://localhost:3000/static/media/env.cd78f17d0d8207eef9f1.jpg'}
        className="card-img-top"
        alt={opportunity.title}
        style={{height:'80vh', objectFit:'cover', objectPosition:'start'}}
      />
      <div className="container">
        <h3 className="card-title">{opportunity.title}</h3>
        <p className="card-text">{opportunity.description}</p>
        <p>
          <strong>Start Date:</strong> {new Date(opportunity.startDate).toLocaleDateString()}
        </p>
        <p>
          <strong>End Date:</strong> {new Date(opportunity.endDate).toLocaleDateString()}
        </p>
        <p>
          <strong>Location:</strong> {opportunity.location}
        </p>
        <div className="product-about">
                <div className="column">
                    <div className="property">
                        <label for="">Organizer</label>
                        <span>{opportunity.name}</span>
                    </div>
                    <div className="property">
                        <label for="">Start Date</label>
                        <p>
                            {new Date(opportunity.startDate).toLocaleDateString()}
                        </p>
                    </div>
                </div>
                <div className="column">
                    <div className="property">
                        <label for="">Location</label>
                        <p>
                            {opportunity.location}
                        </p>
                    </div>
                    <div className="property">
                        <label for="">End Date</label>
                        <p>
                            {new Date(opportunity.endDate).toLocaleDateString()}
                        </p>
                    </div>
                </div>
        </div>
        {hasApplied ? (
          <p className="text-success">You have already applied for this opportunity.</p>
        ) : (
          <button className="btn btn-primary" onClick={handleApply}>
            Apply for Opportunity
          </button>
        )}
      </div>
    </div>
  ) : (
    <div className="text-center">Opportunity not found.</div>
  )}
    </div>
  );
};

export default OpportunityDetail;
