import React from 'react';
import { useQuery } from "@tanstack/react-query";
import './UserManagement.css'; // Import the CSS file
import UserTable from './User-Table';
import { UserManagementAPI } from './api/query-slice';
 

const UserManagement: React.FC = () => {
  const { data = { data: [] }, isLoading, isError, error } = useQuery({
    queryKey: ["users"],
    queryFn: () => UserManagementAPI.LoadAllUsers(),
  });

  console.log("API response data:", data);

  const users = data.data.map((user: any) => ({
    id: user._id,
    email: user.loginInfo?user.loginInfo.email :'',
    role : user.loginInfo?user.loginInfo.userRoleId.role : '',
    ...user
  }));

  console.log("API response array:", users);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading users: {error.message}</div>;
  }

  return (
    <div className="user-management-container">
      <h2>User-Management</h2>
      <div className="user-table-wrapper">
        <UserTable users={users} />
      </div>
    </div>
  );
};

export default UserManagement;
