import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import dotenv from 'dotenv';

dotenv.config();

const containerStyle = {
  width: '100%',
  height: '400px'
};

const center = {
  lat: -3.745,
  lng: -38.523
};

const locations = [
  { lat: -3.745, lng: -38.523 },
  { lat: -3.746, lng: -38.524 },
  { lat: -3.747, lng: -38.525 },
  { lat: -3.748, lng: -38.526 },
  // Add more locations here
];

const App: React.FC = () => {
  return (
    <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY || ''}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
      >
        {locations.map((location, index) => (
          <Marker key={index} position={location} />
        ))}
      </GoogleMap>
    </LoadScript>
  );
};

export default App;