import React, { useEffect, useRef, useCallback, useState } from 'react';
import L from 'leaflet';

// Create custom icon
const createCameraIcon = (L, preview) => {
    return L.icon({
        iconUrl: preview || '/camera-icon.svg',
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32],
        tooltipAnchor: [16, -16]
    });
};

const Map = ({ cameras }) => {
    const mapRef = useRef(null);
    const mapInstanceRef = useRef(null);
    const markersRef = useRef({});
    const [fallbackImages, setFallbackImages] = useState({});
    const [incidents, setIncidents] = useState([]);

    const initializeMap = useCallback(() => {
        if (mapInstanceRef.current) return;

        const map = L.map(mapRef.current).setView([51.505, -0.09], 13);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        mapInstanceRef.current = map;
    }, []);

    const fetchIncidents = useCallback(async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/incidents`);
            if (!response.ok) {
                throw new Error('Failed to fetch incidents');
            }
            const data = await response.json();
            setIncidents(data);
        } catch (error) {
            console.error('Error fetching incidents:', error);
        }
    }, []);

    const getLastThreeIncidents = useCallback((cameraId) => {
        const cameraIncidents = incidents
            .filter(incident => incident.cameraId === cameraId)
            .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
            .slice(0, 3);
        
        return cameraIncidents.length > 0 ? cameraIncidents : null;
    }, [incidents]);

    const updateMarkers = useCallback(() => {
        if (!mapInstanceRef.current) return;

        // Clear existing markers
        Object.values(markersRef.current).forEach(marker => {
            mapInstanceRef.current.removeLayer(marker);
        });
        markersRef.current = {};

        // Add new markers
        cameras.forEach(camera => {
            const id = camera.id || Math.random().toString(36).substr(2, 9);
            const lat = camera.lat || 0;
            const lng = camera.lng || 0;
            const protocol = camera.protocol || 'Unknown';
            const preview = fallbackImages[id] || camera.preview || '/camera-icon.svg';

            const lastThreeIncidents = getLastThreeIncidents(camera.id);
            let incidentsHtml;
            if (lastThreeIncidents) {
                incidentsHtml = lastThreeIncidents.map(incident => 
                    `<li>${incident.type} - ${new Date(incident.timestamp).toLocaleString()}</li>`
                ).join('');
            } else {
                incidentsHtml = '<li>There are no incidents yet.</li>';
            }

            const popupContent = `
                <b>${protocol}</b><br>
                <img src="${preview}" 
                     alt="Preview" 
                     width="100" height="100"
                     data-camera-id="${id}"/>
                <div>
                    <button onclick="window.playStream(${id})">Play</button>
                    <button onclick="window.pauseStream(${id})">Pause</button>
                    <button onclick="window.stopStream(${id})">Stop</button>
                </div>
                <h3>Last 3 Incidents:</h3>
                <ul>${incidentsHtml}</ul>
            `;

            const tooltipContent = `
                <b>${protocol}</b><br>
                IP: ${camera.ip || 'Unknown'}<br>
                <img src="${preview}" 
                     alt="Preview" 
                     width="100" height="100"
                     data-camera-id="${id}"/>
            `;

            const marker = L.marker([lat, lng], { icon: createCameraIcon(L, preview) })
                .addTo(mapInstanceRef.current)
                .bindPopup(popupContent)
                .bindTooltip(tooltipContent, {
                    direction: 'top',
                    offset: L.point(0, -20),
                    permanent: false,
                    opacity: 0.9
                });

            markersRef.current[id] = marker;
        });
    }, [cameras, fallbackImages, getLastThreeIncidents]);

    const handleImageError = useCallback((cameraId) => {
        setFallbackImages(prev => ({
            ...prev,
            [cameraId]: '/camera-icon.svg'
        }));
    }, []);

    useEffect(() => {
        initializeMap();
        fetchIncidents();
        return () => {
            if (mapInstanceRef.current) {
                mapInstanceRef.current.remove();
                mapInstanceRef.current = null;
            }
        };
    }, [initializeMap, fetchIncidents]);

    useEffect(() => {
        updateMarkers();
    }, [updateMarkers]);

    useEffect(() => {
        // Check all images after markers are added
        cameras.forEach(camera => {
            const id = camera.id || Math.random().toString(36).substr(2, 9);
            if (camera.preview) {
                const img = new Image();
                img.src = camera.preview;
                img.onload = () => {
                    // Image loaded successfully, no action needed
                };
                img.onerror = () => {
                    handleImageError(id);
                };
            } else {
                handleImageError(id);
            }
        });
    }, [cameras, handleImageError]);

    useEffect(() => {
        // Update marker icons when fallbackImages change
        Object.entries(fallbackImages).forEach(([cameraId, fallbackSrc]) => {
            const marker = markersRef.current[cameraId];
            if (marker) {
                marker.setIcon(createCameraIcon(L, fallbackSrc));
            }
        });
    }, [fallbackImages]);

    // Add these functions to the window object to make them accessible from the popup
    useEffect(() => {
        window.playStream = (cameraId) => {
            console.log(`Playing stream for camera ${cameraId}`);
            // Implement play logic here
        };
        window.pauseStream = (cameraId) => {
            console.log(`Pausing stream for camera ${cameraId}`);
            // Implement pause logic here
        };
        window.stopStream = (cameraId) => {
            console.log(`Stopping stream for camera ${cameraId}`);
            // Implement stop logic here
        };
    }, []);

    return <div ref={mapRef} style={{ height: '500px', width: '100%' }}></div>;
};

export default Map;
