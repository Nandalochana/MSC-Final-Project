import React from "react";
import GoogleMapComponent from "./GoogleMapComponent";

const MapView: React.FC = () => {
  return (
    <div className="flex justify-center items-center max-h-[90vh]">
      <GoogleMapComponent />
    </div>
  );
};

export default MapView;
