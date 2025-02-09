import React from "react";
import { useQuery } from "@tanstack/react-query";
import { ProfileAPI } from "./api/query-slice";
import ProfileInput from "./components/ProfileInput";
import ProfileList from "./components/ProfileList";
import { useAddProfile } from "./api/query";
import { useUserStore } from "../../store/user-store";
import { notification } from "antd";

const ProfileManager: React.FC = () => {
  const { user } = useUserStore();

  // Fetch profiles
  const { data: profiles, isLoading: isProfilesLoading } = useQuery({
    queryKey: ["profiles"],
    queryFn: () => ProfileAPI.getAllProfiles(),
  });


  // Fetch user profiles
  const { data: userProfiles = [], isLoading: isUserProfilesLoading, isError, error } = useQuery({
    queryKey: ["userProfiles"],
    queryFn: () => ProfileAPI.getAllUserProfiles({ userId: user?.user._id || '' }),
  });

  const addProfile = useAddProfile();

  const handleAddCategory = async (profileId: string) => {
    try {
      if (user?.user._id) {
        await addProfile.mutateAsync({ profileId, userId: user.user._id });
      } else {
        console.error('User ID is undefined');
      }
    } catch (error: unknown) {
      console.log('error', error);
      notification.error({
        message: 'Error',
        description: 'An error occurred while adding the profile. Please try again.',
      });
    }
  };

  if (isUserProfilesLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="text-center">
          <p className="text-gray-700 font-medium">Page is loading, please wait...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <p className="text-red-600 font-semibold">Oops! Something went wrong.</p>
          <p className="text-gray-700">{error?.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto min-h-screen">
      <section className="h-48 flex flex-col justify-center items-center bg-blue-500 text-white">
        <h1 className="text-3xl font-bold">Manage Profiles</h1>
        <p className="text-lg mt-2">Add and manage your profiles below</p>
      </section>

      <div className="w-9/12 mx-auto">
        <div className="bg-white shadow-md rounded-lg p-4 mt-6">
          <ProfileInput
            profiles={profiles?.data.map(profile => ({ id: profile._id, profileName: profile.profileName })) || []}
            isLoading={isProfilesLoading}
            onAddProfile={handleAddCategory}
          />
        </div>

        <div className="bg-white shadow-md rounded-lg px-4 py-10 mt-6">
          <h2 className="text-xl font-semibold mb-4">Profile List</h2>
          {Array.isArray(userProfiles) || userProfiles?.data.length === 0 ? (
            <p className="text-gray-500">No profiles added yet.</p>
          ) : (
            <div className="">
              <div className="flex flex-wrap gap-4">
                <ProfileList profiles={userProfiles.data} isLoading={isUserProfilesLoading} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileManager;
