import React, { useEffect, useRef, useState } from "react";
import { GoogleMap, LoadScript, InfoWindow } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "500px",
};

const center = {
  lat: 60.1695,
  lng: 24.9354, // Center of Helsinki
};

const initialLocations = [
  { id: 1, name: "lepp", lat: 60.2139, lng: 24.8105 },
  { id: 2, name: "Place 2", lat: 60.1705, lng: 24.9340 },
];

const GoogleMapComponent: React.FC = () => {
  const mapRef = useRef<google.maps.Map | null>(null);
  const markersRef = useRef<google.maps.Marker[]>([]); 
  const [locations, setLocations] = useState(initialLocations); 
  const [isMapLoaded, setIsMapLoaded] = useState(false); 
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [selectedLocation, setSelectedLocation] = useState<any | null>(null); 

  const clearMarkers = () => {
    markersRef.current.forEach((marker) => marker.setMap(null));
    markersRef.current = []; 
  };


  const updateMarkers = () => {
    if (isMapLoaded && mapRef.current) {
      clearMarkers(); 

      locations.forEach((location) => {
        const marker = new google.maps.Marker({
          map: mapRef.current,
          position: { lat: location.lat, lng: location.lng },
          title: location.name,
        });

        marker.addListener("click", () => {
          setSelectedLocation(location); 
        });

        markersRef.current.push(marker); 
      });
    }
  };

  useEffect(() => {
    if (isMapLoaded) {
      updateMarkers(); 
    }
  }, [isMapLoaded, locations]); 

  useEffect(() => {
    const intervalId = setInterval(() => {
      setLocations((prevLocations) => [
        ...prevLocations,
        { id: prevLocations.length + 1, name: `Place ${prevLocations.length + 1}`, lat: 60 + Math.random(), lng: 24 + Math.random() },
      ]);
    }, 3000); // todo: change to minor time later 

    return () => clearInterval(intervalId);
  }, []);

  return (
    <LoadScript googleMapsApiKey="">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={12}
        onLoad={(map) => {
          mapRef.current = map;
          setIsMapLoaded(true); 
        }}
      >
        {/* Render InfoWindow when a location is selected */}
        {selectedLocation && (
          <InfoWindow
            position={{ lat: selectedLocation.lat, lng: selectedLocation.lng }}
            onCloseClick={() => setSelectedLocation(null)} // Close dialog on click
          >
            <div>
              <h3>{selectedLocation.name}</h3>
              <p>Details about {selectedLocation.name}</p>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </LoadScript>
  );
};

export default GoogleMapComponent;
