import React, { useState, useEffect } from 'react';

const CameraManagement = () => {
  const [cameras, setCameras] = useState([]);

  useEffect(() => {
    // Fetch cameras from API
    fetch(`${process.env.REACT_APP_API_URL}/api/cameras`)
      .then(response => response.json())
      .then(data => setCameras(data))
      .catch(error => console.error('Error fetching cameras:', error));
  }, []);

  const addCamera = () => {
    // Implement add camera logic
  };

  const removeCamera = (id) => {
    // Implement remove camera logic
  };

  const updateCamera = (id, newData) => {
    // Implement update camera logic
  };

  return (
    <div className="camera-management">
      <h2>Camera Management</h2>
      <button onClick={addCamera}>Add New Camera</button>
      <ul>
        {cameras.map(camera => (
          <li key={camera.id}>
            {camera.ip} - {camera.protocol}
            <button onClick={() => updateCamera(camera.id)}>Edit</button>
            <button onClick={() => removeCamera(camera.id)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CameraManagement;
