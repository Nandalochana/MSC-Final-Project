import React from "react";
import { useQuery } from "@tanstack/react-query";
import "./ProfileManagement.css"; // Import the CSS file
import { ProfileManagementAPI } from "./api/query-slice";
import ProfileTable from "./ProfileTable"; // Import the ProfileTable component

const ProfileManagement: React.FC = () => {
  const { data = { data: [] }, isLoading, isError, error } = useQuery({
    queryKey: ["profiles"],
    queryFn: () => ProfileManagementAPI.LoadAllProfiles(),
  });

  const profiles = data.data.map((profile: any) => ({
    id: profile._id,
    profileName: profile.profileName,
    status: profile.status,
  }));

  if (isLoading) {
    return <div className="profile-management-container">Loading...</div>;
  }

  if (isError) {
    return (
      <div className="profile-management-container">
        <div className="error-message">Error loading profiles: {error.message}</div>
      </div>
    );
  }

  return (
    <div className="profile-management-container">
      <h2 className="profile-management-title">Profile Management</h2>
      <div className="profile-table-wrapper">
        <ProfileTable profiles={profiles} />
      </div>
    </div>
  );
};

export default ProfileManagement;
