import React, { useEffect, useRef, useCallback } from 'react';
import L from 'leaflet';

const Map = ({ cameras }) => {
    const mapRef = useRef(null);
    const mapInstanceRef = useRef(null);

    const initializeMap = useCallback(() => {
        if (mapInstanceRef.current) return;

        const map = L.map(mapRef.current).setView([51.505, -0.09], 13);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        mapInstanceRef.current = map;
    }, []);

    const updateMarkers = useCallback(() => {
        if (!mapInstanceRef.current) return;

        // Clear existing markers
        mapInstanceRef.current.eachLayer((layer) => {
            if (layer instanceof L.Marker) {
                mapInstanceRef.current.removeLayer(layer);
            }
        });

        // Add new markers
        cameras.forEach(camera => {
            const popupContent = `
                <b>${camera.protocol}</b><br>
                <img src="${camera.preview}" alt="Preview" 
                     onerror="this.onerror=null;this.src='/camera-icon.svg';" 
                     width="100" height="100"/>
            `;
            
            L.marker([camera.lat, camera.lng])
                .addTo(mapInstanceRef.current)
                .bindPopup(popupContent);
        });
    }, [cameras]);

    useEffect(() => {
        initializeMap();
        return () => {
            if (mapInstanceRef.current) {
                mapInstanceRef.current.remove();
                mapInstanceRef.current = null;
            }
        };
    }, [initializeMap]);

    useEffect(() => {
        updateMarkers();
    }, [updateMarkers]);

    return <div ref={mapRef} style={{ height: '500px', width: '100%' }}></div>;
};

export default Map;
