const express = require('express');
const cors = require('cors');
const app = express();
const port = 3002;

app.use(cors());

// Example data with more diverse preview types
const cameras = [
    { id: 1, ip: '192.168.1.1', protocol: 'RTSP', preview: 'cam2.gif', lat: 51.50, lng: -0.12 },
    { id: 2, ip: '192.168.1.2', protocol: 'RTSP', preview: 'cam6.gif', lat: 51.49, lng: -0.1 },
    { id: 3, ip: '192.168.1.3', protocol: 'RTMP', preview: 'cam4.gif', lat: 51.515, lng: -0.09 },
    { id: 4, ip: '192.168.1.4', protocol: 'HLS', preview: 'cam3.gif', lat: 51.52, lng: -0.08 },
    { id: 5, ip: '192.168.1.5', protocol: 'MJPEG', preview: 'cam5.gif', lat: 51.518, lng: -0.11 },
    { id: 6, ip: '192.168.1.6', protocol: 'ONVIF', preview: '', lat: 51.508, lng: -0.12 },
    { id: 7, ip: '192.168.1.7', protocol: 'RTSP', preview: 'cam1.gif', lat: 51.503, lng: -0.10 },
    { id: 8, ip: '192.168.1.8', protocol: 'HTTP', preview: 'cam7.gif', lat: 51.51, lng: -0.085 },
];

app.get('/api/cameras', (req, res) => {
    res.json(cameras);
});

// Add more endpoints as needed for user authentication and incidents

// Serve static files from the 'public' directory
app.use(express.static('public'));

app.listen(port, () => {
    console.log(`API running at http://localhost:${port}`);
});
