import React from "react";
import { Table, Tag, Button } from "antd";
import { useDeleteProfile, useUpdateProfile } from "./api/query";

interface Profile {
  id: string;
  profileName: string;
  status: string;
}

interface ProfileTableProps {
  profiles: Profile[];
}

const ProfileTable: React.FC<ProfileTableProps> = ({ profiles }) => {
  const updateProfile = useUpdateProfile();
  const deleteProfile = useDeleteProfile();

  const handleChangeStatus = (profileId: string) => {
    console.log(`Change status for profile ID: ${profileId}`);
    updateProfile.mutate({ profileId });
  };

  const handleDelete = (profileId: string) => {
    console.log(`Delete profile with ID: ${profileId}`);
    deleteProfile.mutate({ profileId });
  };

  const columns = [
    { title: "Profile Name", dataIndex: "profileName", key: "profileName" },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => (
        <Tag color={status === "active" ? "green" : "red"}>{status}</Tag>
          ),
        },
        {
          title: "Change Status",
          key: "changeStatus",
          render: (_: unknown, record: Profile) => (
        <Button
          type="primary"
          size="small"
          onClick={() => handleChangeStatus(record.id)}
        >
          Change Status
        </Button>
          ),
        },
        {
          title: "Delete Action",
          key: "deleteAction",
          render: (_: unknown, record: Profile) => (
        <Button
          type="default"
          danger
          size="small"
          onClick={() => handleDelete(record.id)}
        >
          Delete
        </Button>
      ),
    },
  ];

  return (
    <div className="profile-table-container">
      <Table
        dataSource={profiles}
        columns={columns}
        rowKey="id"
        pagination={{ pageSize: 5 }}
        bordered
      />
    </div>
  );
};

export default ProfileTable;
