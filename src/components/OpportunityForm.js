import React, { useState, useEffect } from "react";
import axios from "axios";

const OpportunityForm = ({ opportunityId, onFormSubmit }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    startDate: "",
    endDate: "",
  });

  useEffect(() => {
    if (opportunityId) {
      fetchOpportunity(opportunityId);
    }
  }, [opportunityId]);

  const fetchOpportunity = async (id) => {
    try {
      const response = await axios.get(
        `https://localhost:7220/api/VolunteerOpportunity/${id}`
      );
      const { title, description, location, startDate, endDate } = response.data;
      setFormData({
        title,
        description,
        location,
        startDate: startDate.split("T")[0], // Format for <input type="date">
        endDate: endDate.split("T")[0],
      });
    } catch (error) {
      console.error("Error fetching opportunity:", error);
      alert("Failed to fetch the opportunity.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userData = JSON.parse(localStorage.getItem("user"));

      if (!userData || userData.role !== "Organization") {
        alert("You must be logged in as an Organization to perform this action.");
        return;
      }

      const dataToSubmit = {
        ...formData,
        organizationId: userData.userId, // Take organizationId from logged-in user
      };

      if (opportunityId) {
        await axios.put(
          `https://localhost:7220/api/VolunteerOpportunity/${opportunityId}`,
          dataToSubmit,
          { headers: { "Content-Type": "application/json" } }
        );
        alert("Opportunity updated successfully!");
      } else {
        await axios.post(
          `https://localhost:7220/api/VolunteerOpportunity`,
          dataToSubmit,
          { headers: { "Content-Type": "application/json" } }
        );
        alert("Opportunity created successfully!");
      }
      if (onFormSubmit) onFormSubmit();
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Failed to submit the form.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="oppform">
      <h2>{opportunityId ? "Edit Opportunity" : "Create Opportunity"}</h2>
      <div>
        <label>Title</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Title"
          required
        />
      </div>
      <div>
        <label>Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
          required
        ></textarea>
      </div>
      <div>
        <label>Location</label>
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
          placeholder="Location"
          required
        />
      </div>
      <div>
        <label>Start Date</label>
        <input
          type="date"
          name="startDate"
          value={formData.startDate}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>End Date</label>
        <input
          type="date"
          name="endDate"
          value={formData.endDate}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit">{opportunityId ? "Update" : "Create"}</button>
    </form>
  );
};

export default OpportunityForm;
