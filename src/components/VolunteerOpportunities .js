import React, { useEffect, useState } from "react";
import axios from "axios";

const VolunteerOpportunities = () => {
  const [opportunities, setOpportunities] = useState([]);
  const [filteredOpportunities, setFilteredOpportunities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTag, setSelectedTag] = useState("");

  useEffect(() => {
    const fetchOpportunities = async () => {
      try {
        const response = await axios.get(
          "https://localhost:7220/api/VolunteerOpportunity"
        );
        const data = response.data.$values;
        setOpportunities(data);
        setFilteredOpportunities(data);
      } catch (err) {
        console.error("Error fetching opportunities:", err);
        setError("Failed to load opportunities. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchOpportunities();
  }, []);

  // Update filtered opportunities when search term or selected tag changes
  useEffect(() => {
    let filtered = opportunities;

    if (searchTerm) {
      filtered = filtered.filter((opp) =>
        opp.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedTag) {
      filtered = filtered.filter((opp) => opp.tag === selectedTag);
    }

    setFilteredOpportunities(filtered);
  }, [searchTerm, selectedTag, opportunities]);

  if (loading) {
    return <div className="text-center my-4">Loading opportunities...</div>;
  }

  if (error) {
    return <div className="alert alert-danger text-center my-4">{error}</div>;
  }

  return (
    <div className="container">
      <h2 className="text-center my-4">Volunteering Opportunities</h2>

      <div className="mb-4">
        <input
          type="text"
          className="form-control"
          placeholder="Search by title..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="mb-4">
        <label className="mr-3">Filter by category:</label>
        <div>
          <label className="mr-2">
            <input
              type="radio"
              name="category"
              value=""
              checked={selectedTag === ""}
              onChange={() => setSelectedTag("")}
            />
            All
          </label>
          <label className="mr-2">
            <input
              type="radio"
              name="category"
              value="Eco"
              checked={selectedTag === "Eco"}
              onChange={() => setSelectedTag("Eco")}
            />
            Eco
          </label>
          <label className="mr-2">
            <input
              type="radio"
              name="category"
              value="Water"
              checked={selectedTag === "Water"}
              onChange={() => setSelectedTag("Water")}
            />
            Water
          </label>
        </div>
      </div>

      {filteredOpportunities.length === 0 ? (
        <div className="text-center">No opportunities found.</div>
      ) : (
        <div className="row">
          {filteredOpportunities.map((opportunity) => (
            <div className="col-md-4 col-sm-6 mb-4" key={opportunity.id}>
              <div className="card h-100 opportunitycard">
                <img
                  src={
                    opportunity.imageUrl ||
                    "http://localhost:3000/static/media/env.cd78f17d0d8207eef9f1.jpg"
                  }
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
                  <a
                    href={`/opportunity/${opportunity.id}`}
                    className="btn btn-primary"
                  >
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
