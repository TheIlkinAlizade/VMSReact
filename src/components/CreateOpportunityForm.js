import React, { useState } from 'react';
import axios from 'axios';

const CreateOpportunityForm = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const opportunity = {
            Title: title,
            Description: description,
            Date: new Date(date) // Ensure this is in the right format
        };

        try {
            const response = await axios.post('https://localhost:5001/api/volunteeropportunities', opportunity);
            console.log(response.data);
            alert('Opportunity created successfully!');
        } catch (error) {
            console.error(error);
            alert('Failed to create opportunity.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Title</label>
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
            </div>
            <div>
                <label>Description</label>
                <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
            </div>
            <div>
                <label>Date</label>
                <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
            </div>
            <button type="submit">Create Opportunity</button>
        </form>
    );
};

export default CreateOpportunityForm;
