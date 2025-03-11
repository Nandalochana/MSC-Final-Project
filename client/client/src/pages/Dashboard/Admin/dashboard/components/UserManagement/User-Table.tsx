import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button, Table, Select } from "antd";
import { UserUpdateInfoSchemaType, UserDeleteInfoSchemaType } from "./api/schema";
import { ErrorResponse } from "react-router";
import { AxiosError } from "axios";
import { UserManagementAPI } from "./api/query-slice";
import { useState } from "react";

interface UpdateUserInput {
  userId: number;
}

interface DeleteUserInput {
  userId: number;
}

enum UserStatus {
  Active = "active",
  Disable = "disable",
}

export enum UserRole {
  Admin = "Admin",
  Freelancer = "Freelancer",
  Buyer = "Buyer",
}

interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  status: UserStatus;
  role: UserRole; 
}

interface UserTableProps {
  users: User[];
}

export function useUpdateUser() {
  const queryClient = useQueryClient();

  return useMutation<UserUpdateInfoSchemaType, AxiosError<ErrorResponse>, UpdateUserInput>({
    mutationFn: async (data: UpdateUserInput) => {
      await UserManagementAPI.UpdateUserStatus({ userId: data.userId.toString() });
      return { userId: data.userId.toString() };
    },
    onSuccess: () => {
      // Optionally, invalidate the query to ensure data is refreshed
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (error) => {
      console.error("Error updating user status:", error.response?.data);
    },
  });
}

export function useDeleteUser() {
  const queryClient = useQueryClient();

  return useMutation<UserDeleteInfoSchemaType, AxiosError<ErrorResponse>, DeleteUserInput>({
    mutationFn: async (data: DeleteUserInput) => {
      await UserManagementAPI.DeleteUser({ userId: data.userId.toString() });
      return { userId: data.userId.toString() };
    },
    onSuccess: () => {
      // Optionally, invalidate the query to ensure data is refreshed
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (error) => {
      console.error("Error deleting user:", error.response?.data);
    },
  });
}

interface UpdateUserRoleInput {
  userId: number;
  role: string;
}

export function useUpdateUserRole() {
  const queryClient = useQueryClient();

  return useMutation<void, AxiosError<ErrorResponse>, UpdateUserRoleInput>({
    mutationFn: async (data: UpdateUserRoleInput) => {
      await UserManagementAPI.UpdateUserRole({ userId: data.userId.toString(), role: data.role });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (error) => {
      console.error("Error updating user role:", error.response?.data);
    },
  });
}

export default function UserTable({ users }: UserTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const updateUser = useUpdateUser();
  const deleteUser = useDeleteUser();
  const updateUserRole = useUpdateUserRole();

  const handleEdit = (userId: number) => {
    console.log(`Edit user with id: ${userId}`);
    updateUser.mutate({ userId });
  };

  const handleDelete = (userId: number) => {
    console.log(`Delete user with id: ${userId}`);
    deleteUser.mutate({ userId });
  };

  const handlePageSizeChange = (value: number) => {
    setPageSize(value);
    setCurrentPage(1); // Reset to first page
  };

  const handleRoleChange = (userId: number, value: UserRole) => {
    console.log(`Change role for user with id: ${userId} to ${value}`);
    updateUserRole.mutate({ userId, role: value });
  };

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-end mb-4">
        <Select
          defaultValue={10}
          onChange={handlePageSizeChange}
          options={[
            { value: 1, label: "1" },
            { value: 2, label: "2" },
            { value: 3, label: "3" },
            { value: 4, label: "4" },
            { value: 5, label: "5" },
            { value: 10, label: "10" },
            { value: 20, label: "20" },
            { value: 50, label: "50" },
          ]}
        />
      </div>
      <Table
        dataSource={users}
        rowKey="id"
        pagination={{
          current: currentPage,
          pageSize: pageSize,
          total: users.length,
          onChange: (page, pageSize) => {
            setCurrentPage(page);
            setPageSize(pageSize);
          },
        }}
        sortDirections={['ascend', 'descend']}
      >
        <Table.Column title="Email" dataIndex="email" key="email" sorter={(a, b) => a.email.localeCompare(b.email)} />
        <Table.Column title="First Name" dataIndex="firstName" key="firstName" sorter={(a, b) => a.firstName.localeCompare(b.firstName)} />
        <Table.Column title="Last Name" dataIndex="lastName" key="lastName" sorter={(a, b) => a.lastName.localeCompare(b.lastName)} />
        <Table.Column
          title="Status"
          dataIndex="status"
          key="status"
          sorter={(a, b) => a.status.localeCompare(b.status)}
          render={(status) => (
            <span
              className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${
                status === UserStatus.Active ? "bg-green-200 text-green-800" : "bg-red-200 text-red-800"
              }`}
            >
              {status}
            </span>
          )}
        />
        <Table.Column
          title="Role"
          dataIndex="role"
          key="role"
          render={(role, record: User) => (
            <Select
              defaultValue={role}
              onChange={(value) => handleRoleChange(record.id, value)}
              options={[
                { value: UserRole.Admin, label: "Admin" },
                { value: UserRole.Freelancer, label: "Freelancer" },
                { value: UserRole.Buyer, label: "Buyer" },
              ]}
            />
          )}
        />
        <Table.Column
          title="Change Status"
          key="actions"
          render={(_, record: User) => (
            <div>
              <Button variant="outlined" size="small" onClick={() => handleEdit(record.id)}>
                Change Status
              </Button>
            </div>
          )}
        />
        <Table.Column
          title="Delete Action"
          key="deletactions"
          render={(_, record: User) => (
            <div>
              <Button variant="outlined" size="small" onClick={() => handleDelete(record.id)}>
                Delete Record
              </Button>
            </div>
          )}
        />
      </Table>
    </div>
  );
}

