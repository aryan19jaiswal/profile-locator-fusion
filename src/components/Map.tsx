
import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useProfiles } from '@/context/ProfileContext';
import { MapPin } from 'lucide-react';
import LoadingSpinner from './LoadingSpinner';

// Ideally, this token would be stored in an environment variable or Supabase Secrets
// For demo purposes, we're using a placeholder - users will be prompted to provide their own
const DEFAULT_TOKEN = "YOUR_MAPBOX_TOKEN";

interface MapProps {
  className?: string;
}

const Map = ({ className = "" }: MapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markers = useRef<{[id: string]: mapboxgl.Marker}>({});
  const [mapLoaded, setMapLoaded] = useState(false);
  const [mapboxToken, setMapboxToken] = useState(DEFAULT_TOKEN);
  const [showTokenInput, setShowTokenInput] = useState(DEFAULT_TOKEN === "YOUR_MAPBOX_TOKEN");
  
  const { profiles, selectedProfile } = useProfiles();

  // Initialize map
  useEffect(() => {
    if (!mapboxToken || mapboxToken === "YOUR_MAPBOX_TOKEN" || !mapContainer.current) return;

    mapboxgl.accessToken = mapboxToken;
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [0, 20], // Default center (will be updated)
      zoom: 1
    });

    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');
    
    map.current.on('load', () => {
      setMapLoaded(true);
    });

    return () => {
      Object.values(markers.current).forEach(marker => marker.remove());
      markers.current = {};
      map.current?.remove();
    };
  }, [mapboxToken]);

  // Add markers for all profiles
  useEffect(() => {
    if (!mapLoaded || !map.current) return;
    
    // Clear existing markers
    Object.values(markers.current).forEach(marker => marker.remove());
    markers.current = {};

    // Add markers for all profiles
    profiles.forEach(profile => {
      const { id, name, location } = profile;
      
      // Create a custom marker element
      const el = document.createElement('div');
      el.className = 'flex items-center justify-center w-6 h-6 bg-deepBlue text-white rounded-full';
      el.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path><circle cx="12" cy="10" r="3"></circle></svg>';
      
      // Create a popup for the marker
      const popup = new mapboxgl.Popup({ offset: 25 }).setText(name);
      
      // Add marker to map
      const marker = new mapboxgl.Marker(el)
        .setLngLat([location.lng, location.lat])
        .setPopup(popup)
        .addTo(map.current);
      
      // Store marker reference
      markers.current[id] = marker;
    });
  }, [profiles, mapLoaded]);

  // Update map center when selected profile changes
  useEffect(() => {
    if (!map.current || !mapLoaded) return;
    
    if (selectedProfile) {
      // Fly to selected profile location
      map.current.flyTo({
        center: [selectedProfile.location.lng, selectedProfile.location.lat],
        zoom: 13,
        essential: true,
        duration: 1000
      });
      
      // Open popup for selected profile
      const marker = markers.current[selectedProfile.id];
      if (marker) {
        marker.getPopup().addTo(map.current);
      }
    } else if (profiles.length > 0) {
      // Fit map to show all profiles
      const bounds = new mapboxgl.LngLatBounds();
      
      profiles.forEach(profile => {
        bounds.extend([profile.location.lng, profile.location.lat]);
      });
      
      map.current.fitBounds(bounds, { 
        padding: 50,
        duration: 1000
      });
    }
  }, [selectedProfile, profiles, mapLoaded]);

  if (showTokenInput) {
    return (
      <div className={`flex flex-col items-center justify-center p-4 ${className}`}>
        <div className="max-w-md w-full bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Mapbox Token Required</h3>
          <p className="text-sm mb-4">
            To display the map, you need to provide a Mapbox access token. 
            Sign up at <a href="https://mapbox.com" target="_blank" rel="noopener noreferrer" className="text-deepBlue underline">mapbox.com</a> to get your public token.
          </p>
          <input
            type="text"
            value={mapboxToken === DEFAULT_TOKEN ? '' : mapboxToken}
            onChange={(e) => setMapboxToken(e.target.value)}
            placeholder="Enter your Mapbox public token"
            className="w-full p-2 border rounded mb-4"
          />
          <button
            onClick={() => {
              if (mapboxToken && mapboxToken !== DEFAULT_TOKEN) {
                setShowTokenInput(false);
              }
            }}
            className="w-full bg-deepBlue text-white py-2 rounded hover:bg-blue-700"
          >
            Submit
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      {!mapLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-lightGray bg-opacity-75 z-10">
          <LoadingSpinner size="lg" />
        </div>
      )}
      <div ref={mapContainer} className="h-full w-full rounded-lg" />
      {selectedProfile && (
        <div className="absolute bottom-4 left-4 bg-white p-3 rounded-lg shadow-md max-w-xs">
          <div className="flex items-start space-x-2">
            <MapPin className="h-5 w-5 text-deepBlue mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-semibold">{selectedProfile.name}</h4>
              <p className="text-sm text-mediumGray">{selectedProfile.address}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Map;
