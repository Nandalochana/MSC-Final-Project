import React from "react";

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

const UserProfiles: React.FC<ProfileListProps> = ({ profiles, isLoading }) => {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="text-center">
          <p className="text-gray-700 font-medium">
            Page is loading, please wait...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {profiles.map((profile, index) => (
          <div
            key={index}
            className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-all"
          >
            <h4 className="text-lg font-medium text-gray-800">
              {profile.profileId.profileName}
            </h4>
            <p className="text-sm text-gray-600">
              {/* {profile.profileId.description} */}
            </p>
          </div>
        )
      )}
    </div>
  );
};

export default UserProfiles;
