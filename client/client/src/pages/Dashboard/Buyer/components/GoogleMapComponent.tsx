import React, { useEffect, useRef, useState } from "react";
import { GoogleMap, LoadScript, InfoWindow } from "@react-google-maps/api";
const google_map = import.meta.env.VITE_GOOGLE_MAP_API_KEY;

const containerStyle = {
  width: "100%",
  height: "500px",
};

const center = {
  lat: 60.1695,
  lng: 24.9354, // Center of Helsinki
};

interface Location {
  status: string;
  _id: string;
  firstName: string;
  lastName: string;
  profileImg: string;
  address1: string;
  address2: string;
  address3: string;
  telephoneNr: string;
  mobileNr: string;
  rating: number;
  score: number;
  latitude: number;
  longitude: number;
  __v: number;
}

interface GoogleMapComponentProps {
  locations: Location[];
}

const GoogleMapComponent: React.FC<GoogleMapComponentProps> = ({ locations }) => {
  const mapRef = useRef<google.maps.Map | null>(null);
  const markersRef = useRef<google.maps.Marker[]>([]);
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);

  const clearMarkers = () => {
    markersRef.current.forEach((marker) => marker.setMap(null));
    markersRef.current = [];
  };

  const updateMarkers = () => {
    if (isMapLoaded && mapRef.current) {
      clearMarkers();

      locations.forEach((location) => {
        console.log("Location data:", location.profileImg); // Log the Location data

        const marker = new google.maps.Marker({
          map: mapRef.current,
          position: { lat: location.latitude, lng: location.longitude },
          title: `${location.firstName} ${location.lastName}`,
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
      const interval = setInterval(() => {
        updateMarkers();
      }, 2000);

      return () => clearInterval(interval);
    }
  }, [isMapLoaded, locations]);

  return (

    <LoadScript googleMapsApiKey='AIzaSyAor7S-RpoFoX55DBIMaNPtoWZtbFWA_JA'>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={12}
        onLoad={(map) => {
          mapRef.current = map;
          setIsMapLoaded(true);
        }}
      >
        {selectedLocation && (
          <InfoWindow
            position={{
              lat: selectedLocation.latitude,
              lng: selectedLocation.longitude,
            }}
            onCloseClick={() => setSelectedLocation(null)}
          >
            <div>
              <h3>{`${selectedLocation.firstName} ${selectedLocation.lastName}`}</h3>
              <img
                src={selectedLocation.profileImg}
                alt={`${selectedLocation.firstName} ${selectedLocation.lastName}`}
                style={{ width: "50px", height: "50px", borderRadius: "50%", cursor: "pointer" }}
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "/default-profile.png"; // fallback image
                }}
                onClick={() => {
                  if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition((position) => {
                      const { latitude, longitude } = position.coords;
                      const destination = `${selectedLocation.latitude},${selectedLocation.longitude}`;
                      const currentLocation = `${latitude},${longitude}`;
                      window.open(
                        `https://www.google.com/maps/dir/?api=1&origin=${currentLocation}&destination=${destination}&travelmode=driving`,
                        "_blank"
                      );
                    });
                  } else {
                    alert("Geolocation is not supported by your browser.");
                  }
                }}
              />
              <p>Rating: {selectedLocation.rating} ⭐</p>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <p>AI Rating:</p>
                <div
                  style={{
                    width: "100px",
                    height: "10px",
                    backgroundColor: "#e0e0e0",
                    borderRadius: "5px",
                    overflow: "hidden",
                    position: "relative",
                  }}
                  title={`Score: ${selectedLocation.score}`}
                >
                  <div
                    style={{
                      width: `${selectedLocation.score}%`,
                      height: "100%",
                      backgroundColor: selectedLocation.score > 70 ? "green" : selectedLocation.score > 40 ? "orange" : "red",
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </LoadScript>
  );
};

export default GoogleMapComponent;
