import { useEffect, useState } from 'react';
import axios from 'axios';
import OpportunityName from './OpportunityName';
import OrganizationName from './OrganizationName';

const VolunteerFeedbacks = ({ id }) => {
    const [feedbacks, setFeedbacks] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        // Fetch feedbacks for the given userId
        axios.get(`https://localhost:7220/api/Feedback/user/${id}`)
            .then(response => {
                console.log(response.data.$values);  // Log the response data
                setFeedbacks(response.data.$values); // Assuming the API returns a list of feedbacks
                setLoading(false);
            })
            .catch(error => {
                setError(error.response ? error.response.data : "Error fetching feedbacks");
                setLoading(false);
            });
    }, [id]);
    

    if (loading) return <div>Loading feedbacks...</div>;
    if (error || feedbacks.length === 0) return <div>No feedbacks found for this user.</div>;

    return (
        <div>
            <h3>Feedbacks for User {id}</h3>
            <ul>
                {feedbacks.map(feedback => (
                    <li key={feedback.id}>
                        <p><strong>Opportunity:</strong> <OpportunityName opportunityId={feedback.opportunityId} /></p>
                        <p><strong>Comment:</strong> {feedback.comment}</p>
                        <p><strong>Rate:</strong> {feedback.rate}</p>
                        <p><strong>Given By:</strong> <OrganizationName organizationId={feedback.organizationId} /></p>
                        <hr />
                    </li>
                ))}
            </ul>
        </div>
    );
    
};

export default VolunteerFeedbacks;
