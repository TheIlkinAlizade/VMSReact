import React, { useEffect, useState } from 'react';
import axios from 'axios';

const VolunteerOpportunities = () => {
  const [opportunities, setOpportunities] = useState([]);
  const [loading, setLoading] = useState(true); // Add a loading state
  const [error, setError] = useState(null); // Add an error state

  useEffect(() => {
    const fetchOpportunities = async () => {
      try {
        const response = await axios.get('https://localhost:7220/api/VolunteerOpportunity');
        setOpportunities(response.data.$values);
      } catch (err) {
        console.error('Error fetching opportunities:', err);
        setError('Failed to load opportunities. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchOpportunities();
  }, []);

  if (loading) {
    return <div className="text-center my-4">Loading opportunities...</div>;
  }

  if (error) {
    return <div className="alert alert-danger text-center my-4">{error}</div>;
  }

  return (
    <div className="container">
      <h2 className="text-center my-4">Volunteer Opportunities</h2>
      {opportunities.length === 0 ? (
        <div className="text-center">No opportunities available at the moment.</div>
      ) : (
        <div className="row">
          {opportunities.map(opportunity => (
            <div className="col-md-4 col-sm-6 mb-4" key={opportunity.id}>
              <div className="card h-100">
                <img
                  src={opportunity.imageUrl || 'http://localhost:3000/static/media/env.cd78f17d0d8207eef9f1.jpg'}
                  className="card-img-top"
                  alt={opportunity.title}
                />
                <div className="card-body">
                  <h5 className="card-title">{opportunity.title}</h5>
                  <p className="card-text">
                    {opportunity.description.length > 100
                      ? `${opportunity.description.slice(0, 100)}...`
                      : opportunity.description}
                  </p>
                  <a href={`/opportunity/${opportunity.id}`} className="btn btn-primary">
                    Apply
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default VolunteerOpportunities;
