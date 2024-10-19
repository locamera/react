import React, { useState, useEffect } from 'react';
import Map from './components/Map';
import Header from './components/Header';
import IncidentsTable from './components/IncidentsTable';
import './styles/App.css';

function App() {
    const [cameras, setCameras] = useState([]);
    const [incidents, setIncidents] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/api/cameras`)
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

        fetch(`${process.env.REACT_APP_API_URL}/api/incidents`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => setIncidents(data))
            .catch(error => {
                console.error('Error fetching incidents:', error);
                setError('Failed to fetch incident data');
            });
    }, []);

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="App">
            <Header />
            <main>
                <Map cameras={cameras} />
                <IncidentsTable incidents={incidents} cameras={cameras} />
            </main>
        </div>
    );
}

export default App;
