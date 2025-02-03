import React from "react";
// import { useQuery } from "@tanstack/react-query";
import ProfileCard from "./ProfileCard";
// import { ProfileAPI } from "../../../ProfileManager/api/query-slice";

const ProfileView: React.FC = () => {

   // Fetch profiles
    // const { data: profiles, isLoading: isProfilesLoading, isError, error  } = useQuery({
    //   queryKey: ["profiles"],
    //   queryFn: () => ProfileAPI.getAllProfiles(),
    // });

      // Hardcoded data array
  const profiles = [
    {
      _id: "1",
      imageUrl: "https://via.placeholder.com/150",
      profileName: "John Doe",
      address: "123 Main Street, Springfield",
      rating: 4.5,
    },
    {
      _id: "2",
      imageUrl: "https://via.placeholder.com/150",
      profileName: "Jane Smith",
      address: "456 Elm Street, Shelbyville",
      rating: 4.8,
    },
    {
      _id: "3",
      imageUrl: "https://via.placeholder.com/150",
      profileName: "Emily Johnson",
      address: "789 Oak Avenue, Capital City",
      rating: 4.2,
    },
    {
      _id: "4",
      imageUrl: "https://via.placeholder.com/150",
      profileName: "Emily Johnson",
      address: "789 Oak Avenue, Capital City",
      rating: 4.2,
    },
    {
      _id: "5",
      imageUrl: "https://via.placeholder.com/150",
      profileName: "John Doe",
      address: "123 Main Street, Springfield",
      rating: 4.5,
    },
    {
      _id: "6",
      imageUrl: "https://via.placeholder.com/150",
      profileName: "Jane Smith",
      address: "456 Elm Street, Shelbyville",
      rating: 4.8,
    },
    {
      _id: "7",
      imageUrl: "https://via.placeholder.com/150",
      profileName: "Emily Johnson",
      address: "789 Oak Avenue, Capital City",
      rating: 4.2,
    },
    {
      _id: "8",
      imageUrl: "https://via.placeholder.com/150",
      profileName: "Emily Johnson",
      address: "789 Oak Avenue, Capital City",
      rating: 4.2,
    }
  ];

  // if (isProfilesLoading) return <p>Loading profiles...</p>;
  // if (isError) return <p>Error: {error instanceof Error ? error.message : "Unknown error"}</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-4 max-h-[90vh] overflow-y-auto">
        {/* {Array.isArray(profiles) || profiles?.data.length === 0 ? (
          <p className="text-gray-500">No profiles added yet.</p>
        ) : (
            profiles?.data.map((profile) => (
                <ProfileCard
                  data={hardcodedProfile}
                />
              ))
        )} */}

    {profiles.map((profile, index) => (
        <ProfileCard key={index} data={profile} />
      ))}

     
    </div>
  );
};

export default ProfileView;
