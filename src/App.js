import React, { useState, useEffect } from 'react';
import Map from './components/Map';

function App() {
    const [cameras, setCameras] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3002/api/cameras')
            .then(response => response.json())
            .then(data => setCameras(data));
    }, []);

    return (
        <div className="App">
            <h1>Camera Map</h1>
            <Map cameras={cameras} />
        </div>
    );
}

export default App;
