import React, { useState, useEffect } from 'react';

const IncidentsManagement = () => {
  const [incidents, setIncidents] = useState([]);

  useEffect(() => {
    // Fetch incidents from API
    fetch(`${process.env.REACT_APP_API_URL}/api/incidents`)
      .then(response => response.json())
      .then(data => setIncidents(data))
      .catch(error => console.error('Error fetching incidents:', error));
  }, []);

  return (
    <div className="incidents-management">
      <h2>Incidents Management</h2>
      <ul>
        {incidents.map(incident => (
          <li key={incident.id}>
            {incident.type} - Camera ID: {incident.cameraId} - {new Date(incident.timestamp).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default IncidentsManagement;
