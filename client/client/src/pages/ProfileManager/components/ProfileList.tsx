import React from "react";
import { FaTrashAlt } from "react-icons/fa";
import { useDeleteProfile } from "../api/query";


interface ProfileListProps {
  profiles: Array<{
    _id: string;
    profileId: {
      _id: string;
      profileName: string;
      status: string;
      __v: number;
    };
  }>;
  isLoading: boolean;
}


const ProfileList: React.FC<ProfileListProps> = ({ profiles, isLoading }) => {
  const deleteProfile = useDeleteProfile(); 

  const handleDelete = (profileId: string) => {
    deleteProfile.mutate(profileId);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="text-center">
          <p className="text-gray-700 font-medium">Page is loading, please wait...</p>
        </div>
      </div>
    );
  }
  
  
  return (
    <div className="flex flex-wrap gap-4">
      {profiles.map((profile, index) => (
        <div
          key={index}
          className="flex justify-between items-center bg-gray-100 p-3 rounded-lg shadow gap-3"
        >
          <span className="text-gray-700 font-medium">{profile?.profileId.profileName}</span>
          <button onClick={() => handleDelete(profile._id)} className="text-red-500 hover:text-red-700">
          <FaTrashAlt />
          </button>
        </div>
      ))}
    </div>
  );
};

export default ProfileList;
