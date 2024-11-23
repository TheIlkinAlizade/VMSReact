import React from "react";

const VolunteerGeneralInfo = ({ volunteer }) => {
  return (
    <div className="volunteer-general-info">
      <p><strong>Name:</strong> {volunteer.name} {volunteer.surname}</p>
      <p><strong>Username:</strong> {volunteer.username}</p>
      <p><strong>Email:</strong> {volunteer.email}</p>
      <p><strong>Phone:</strong> {volunteer.phone}</p>
      <p><strong>Address:</strong> {volunteer.address}</p>
    </div>
  );
};

export default VolunteerGeneralInfo;
