import { useEffect, useState } from 'react';
import axios from 'axios';

const VolunteerAppliedOpportunities = ({ id }) => {
    const [applications, setApplications] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get(`https://localhost:7220/api/VolunteerApplication/user/${id}/applications/`)
            .then(response => {
                setApplications(response.data.$values);
            })
            .catch(error => {
                setError(error.response ? error.response.data : "Error fetching data");
            });
    }, [id]);

    if (error) return <div>Error: {error}</div>;
    if (applications.length === 0) return <div>No applications found.</div>;

    return (
        <div>
            <h3>Applied Opportunities</h3>
            <ul>
                {applications.map(app => (
                    <>
                    <li key={app.id}>{app.volunteerOpportunity.title}#{app.volunteerOpportunityId} - {app.isAccepted ? ('Accepted') : ('Not Accepted')}</li>
                    </>
                ))}
            </ul>
        </div>
    );
}

export default VolunteerAppliedOpportunities;