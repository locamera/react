import React from 'react';
import '../styles/IncidentsTable.css';

const IncidentsTable = ({ incidents, cameras }) => {
  // Function to get camera details
  const getCameraDetails = (cameraId) => {
    return cameras.find(camera => camera.id === cameraId) || {};
  };

  // Function to get icon based on incident type
  const getIncidentIcon = (type) => {
    switch (type) {
      case 'Motion Detected': return '🏃';
      case 'Person Detected': return '👤';
      case 'Vehicle Detected': return '🚗';
      case 'Sound Detected': return '🔊';
      default: return '❓';
    }
  };

  // Function to format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="incidents-table-container">
      <h2>Recent Incidents</h2>
      <table className="incidents-table">
        <thead>
          <tr>
            <th>Icon</th>
            <th>Type</th>
            <th>Date</th>
            <th>Camera</th>
            <th>IP</th>
            <th>Protocol</th>
            <th>Location</th>
            <th>Description</th>
            <th>Status</th>
            <th>Weekly Incidents</th>
          </tr>
        </thead>
        <tbody>
          {incidents.map(incident => {
            const camera = getCameraDetails(incident.cameraId);
            return (
              <tr key={incident.id}>
                <td>{getIncidentIcon(incident.type)}</td>
                <td>{incident.type}</td>
                <td>{formatDate(incident.timestamp)}</td>
                <td>{camera.id}</td>
                <td>{camera.ip}</td>
                <td>{camera.protocol}</td>
                <td>{`${camera.country || 'N/A'}, ${camera.city || 'N/A'}, ${camera.street || 'N/A'}`}</td>
                <td>{incident.description || 'No description'}</td>
                <td>{incident.status || 'Pending'}</td>
                <td>{incident.weeklyIncidentCount}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default IncidentsTable;
