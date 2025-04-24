import React from "react";
import { useQuery } from "@tanstack/react-query";
import ProfileCard from "./ProfileCard";
import { BuyerAPI } from "../api/query-slice";

interface ProfileViewProps {
  nameFilter: string;
  selectedCategories: string[];
  selectedRatings: string[]; // Assuming selectedRatings is an array of numbers
}

const ProfileView: React.FC<ProfileViewProps> = ({ nameFilter, selectedCategories, selectedRatings }) => {
  const {
    data: users = { data: [] },
    isLoading: isUsersLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["freelancers", nameFilter, selectedCategories, selectedRatings],
    queryFn: () =>
      BuyerAPI.getFreelancers({ name: nameFilter, profiles: selectedCategories, rating: selectedRatings }),
    enabled: true,
  });

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
      ) : users?.data.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-h-[90vh] overflow-y-auto relative">
          <ProfileCard users={users?.data} isLoading={isUsersLoading} />
        </div>
      ) : (
        <div className="flex items-center justify-center w-full h-full">
          <p className="text-black text-center">No users found.</p>
        </div>
      )}
    </div>
  );
};

export default ProfileView;
