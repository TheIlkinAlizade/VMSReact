import React, { useState } from 'react';
import axios from 'axios';

const RequestOpportunityForm = ({ opportunityId }) => {
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const request = {
            OpportunityId: opportunityId,
            Message: message // If you want to add a message with the request
        };

        try {
            const response = await axios.post('https://localhost:5001/api/volunteerrequests', request);
            console.log(response.data);
            alert('Request sent successfully!');
        } catch (error) {
            console.error(error);
            alert('Failed to send request.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Message</label>
                <textarea value={message} onChange={(e) => setMessage(e.target.value)} />
            </div>
            <button type="submit">Send Request</button>
        </form>
    );
};

export default RequestOpportunityForm;
