require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.API_PORT || 3002;

app.use(cors());

// Example data with more diverse preview types and location information
const cameras = [
    { id: 1, ip: '192.168.1.1', protocol: 'RTSP', preview: 'cam2.gif', lat: 51.50, lng: -0.12, country: 'UK', city: 'London', street: 'Baker St' },
    { id: 2, ip: '192.168.1.2', protocol: 'RTSP', preview: 'cam6.gif', lat: 51.49, lng: -0.1, country: 'UK', city: 'London', street: 'Oxford St' },
    { id: 3, ip: '192.168.1.3', protocol: 'RTMP', preview: 'cam4.gif', lat: 51.515, lng: -0.09, country: 'UK', city: 'London', street: 'Regent St' },
    { id: 4, ip: '192.168.1.4', protocol: 'HLS', preview: 'cam3.gif', lat: 51.52, lng: -0.08, country: 'UK', city: 'London', street: 'Bond St' },
    { id: 5, ip: '192.168.1.5', protocol: 'MJPEG', preview: 'cam5.gif', lat: 51.518, lng: -0.11, country: 'UK', city: 'London', street: 'Piccadilly' },
    { id: 6, ip: '192.168.1.6', protocol: 'ONVIF', preview: '', lat: 51.508, lng: -0.12, country: 'UK', city: 'London', street: 'Trafalgar Square' },
    { id: 7, ip: '192.168.1.7', protocol: 'RTSP', preview: 'cam1.gif', lat: 51.503, lng: -0.10, country: 'UK', city: 'London', street: 'The Strand' },
    { id: 8, ip: '192.168.1.8', protocol: 'HTTP', preview: 'cam7.gif', lat: 51.51, lng: -0.085, country: 'UK', city: 'London', street: 'Liverpool St' },
];

// Example incident data with more details and dates
const incidents = [
    { id: 1, cameraId: 1, type: 'Motion Detected', timestamp: '2023-10-19T10:30:00Z', description: 'Rapid movement near entrance', status: 'Investigating' },
    { id: 2, cameraId: 1, type: 'Person Detected', timestamp: '2023-10-18T11:15:00Z', description: 'Unidentified person in restricted area', status: 'Resolved' },
    { id: 3, cameraId: 2, type: 'Vehicle Detected', timestamp: '2023-10-17T12:00:00Z', description: 'Unauthorized vehicle in loading zone', status: 'Pending' },
    { id: 4, cameraId: 1, type: 'Sound Detected', timestamp: '2023-10-16T13:45:00Z', description: 'Loud noise detected after hours', status: 'False Alarm' },
    { id: 5, cameraId: 3, type: 'Motion Detected', timestamp: '2023-10-15T14:30:00Z', description: 'Suspicious activity in parking lot', status: 'Investigating' },
    { id: 6, cameraId: 4, type: 'Person Detected', timestamp: '2023-10-14T15:00:00Z', description: 'Individual loitering near ATM', status: 'Resolved' },
    { id: 7, cameraId: 5, type: 'Vehicle Detected', timestamp: '2023-10-13T16:20:00Z', description: 'Speeding vehicle on main road', status: 'Reported' },
    { id: 8, cameraId: 6, type: 'Sound Detected', timestamp: '2023-10-12T17:10:00Z', description: 'Glass breaking sound detected', status: 'Investigating' },
];

app.get('/api/cameras', (req, res) => {
    res.json(cameras);
});

app.get('/api/incidents', (req, res) => {
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    const incidentsWithWeeklyCount = incidents.map(incident => {
        const incidentDate = new Date(incident.timestamp);
        const weeklyIncidentCount = incidents.filter(i => 
            i.cameraId === incident.cameraId && 
            new Date(i.timestamp) > oneWeekAgo
        ).length;

        return {
            ...incident,
            weeklyIncidentCount
        };
    });

    res.json(incidentsWithWeeklyCount);
});

// Serve static files from the 'public' directory
app.use(express.static('public'));

app.listen(port, () => {
    console.log(`API running at http://localhost:${port}`);
});
