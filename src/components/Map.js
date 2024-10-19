import React, { useEffect, useRef, useCallback, useState } from 'react';
import L from 'leaflet';

// Create custom icon
const createCameraIcon = (L, preview) => {
    return L.icon({
        iconUrl: preview,
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32]
    });
};

const Map = ({ cameras }) => {
    const mapRef = useRef(null);
    const mapInstanceRef = useRef(null);
    const markersRef = useRef({});
    const [fallbackImages, setFallbackImages] = useState({});

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
        Object.values(markersRef.current).forEach(marker => {
            mapInstanceRef.current.removeLayer(marker);
        });
        markersRef.current = {};

        // Add new markers
        cameras.forEach(camera => {
            const popupContent = `
                <b>${camera.protocol}</b><br>
                <img src="${fallbackImages[camera.id] || camera.preview}" 
                     alt="Preview" 
                     width="100" height="100"
                     data-camera-id="${camera.id}"/>
            `;

            const marker = L.marker([camera.lat, camera.lng], { icon: createCameraIcon(L, fallbackImages[camera.id] || camera.preview) })
                .addTo(mapInstanceRef.current)
                .bindPopup(popupContent);

            markersRef.current[camera.id] = marker;
        });
    }, [cameras, fallbackImages]);

    const handleImageError = useCallback((cameraId) => {
        setFallbackImages(prev => ({
            ...prev,
            [cameraId]: '/camera-icon.svg'
        }));
    }, []);

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

    useEffect(() => {
        // Check all images after markers are added
        cameras.forEach(camera => {
            const img = new Image();
            img.src = camera.preview;
            img.onload = () => {
                // Image loaded successfully, no action needed
            };
            img.onerror = () => {
                handleImageError(camera.id);
            };
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

    return <div ref={mapRef} style={{ height: '500px', width: '100%' }}></div>;
};

export default Map;
