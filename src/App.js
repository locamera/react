import React, { useState, useEffect } from 'react';
import Map from './components/Map';

function App() {
    const [cameras, setCameras] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch('http://localhost:3002/api/cameras')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => setCameras(data))
            .catch(error => {
                console.error('Error fetching cameras:', error);
                setError('Failed to fetch camera data');
            });
    }, []);

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="App">
            <h1>LoCamera - Local Cameras on the Map</h1>
            <Map cameras={cameras} />
        </div>
    );
}

export default App;
