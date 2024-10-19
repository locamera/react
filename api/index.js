const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());

// Example data
const cameras = [
    { id: 1, ip: '192.168.1.1', protocol: 'RTSP', preview: 'image1.gif', lat: 51.505, lng: -0.09 },
    { id: 2, ip: '192.168.1.2', protocol: 'RTSP', preview: 'image2.gif', lat: 51.51, lng: -0.1 },
    // ... more cameras
];

app.get('/api/cameras', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(cameras));
});

// Add more endpoints as needed for user authentication and incidents

app.listen(port, () => {
    console.log(`API running at http://localhost:${port}`);
});
