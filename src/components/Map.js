import React, { useEffect } from 'react';
import L from 'leaflet';

const Map = ({ cameras }) => {
    useEffect(() => {
        const map = L.map('map').setView([51.505, -0.09], 13);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        cameras.forEach(camera => {
            L.marker([camera.lat, camera.lng]).addTo(map)
                .bindPopup(`<b>${camera.protocol}</b><br><img src="${camera.preview}" alt="Preview" />`);
        });
    }, [cameras]);

    return <div id="map" style={{ height: '500px' }}></div>;
};

export default Map;
