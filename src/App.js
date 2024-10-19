import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Map from './components/Map';
import IncidentsTable from './components/IncidentsTable';
import Account from './components/Account';
import CameraManagement from './components/CameraManagement';
import IncidentsManagement from './components/IncidentsManagement';
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
        <Router>
            <div className="App">
                <Header />
                <main>
                    <Routes>
                        <Route path="/" element={
                            <>
                                <Map cameras={cameras} />
                                <IncidentsTable incidents={incidents} cameras={cameras} />
                            </>
                        } />
                        <Route path="/incidents" element={<IncidentsManagement incidents={incidents} />} />
                        <Route path="/account" element={<Account />} />
                        <Route path="/camera-management" element={<CameraManagement cameras={cameras} setCameras={setCameras} />} />
                    </Routes>
                </main>
            </div>
        </Router>
    );
}

export default App;
