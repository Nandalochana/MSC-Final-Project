import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { BuyerAPI } from "../api/query-slice";
import GoogleMapComponent from "./GoogleMapComponent";

interface MapViewProps {
  nameFilter: string;
  selectedCategories: string[];
}

const MapView: React.FC<MapViewProps> = ({ nameFilter, selectedCategories }) => {
  const {
    data: users = { data: [] },
    isLoading: isUsersLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["freelancers", nameFilter, selectedCategories],
    queryFn: () =>
      BuyerAPI.getFreelancers({ name: nameFilter, profiles: selectedCategories }),
    enabled: true,
  });

  interface User {
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

  const [mapUsers, setMapUsers] = useState<User[]>([]);

  useEffect(() => {
    if (!isUsersLoading && users?.data.length > 0) {
      const filteredUsers = users.data.filter(
        (user) => user.latitude && user.longitude
      );
      setMapUsers(filteredUsers);
      console.log("Filtered users with location:", filteredUsers);
    }
  }, [isUsersLoading, users]);

  if (isError) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <p className="text-red-600 font-semibold">
            Oops! Something went wrong.
          </p>
          <p className="text-gray-700">{error?.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-200 w-full rounded-xl p-4">
      {isUsersLoading ? (
        <div className="flex items-center justify-center w-full h-full">
          <p className="text-black text-center animate-pulse">Loading users...</p>
        </div>
      ) : (
        <GoogleMapComponent locations={mapUsers} />
      )}
    </div>
  );
};

export default MapView;
