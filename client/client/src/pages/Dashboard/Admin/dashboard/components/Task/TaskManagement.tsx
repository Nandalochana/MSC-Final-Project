import React from 'react';
import { useQuery } from "@tanstack/react-query";
import './TaskManagement.css'; // Import the CSS file
import { TaskManagementAPI } from './api/query-slice';
import TaskTable from './TaskSettings';

const TaskManagement: React.FC = () => {
  const { data = { data: [] }, isLoading, isError, error } = useQuery({
    queryKey: ["tasks"],
    queryFn: () => TaskManagementAPI.LoadAllTasks(),
  });

  console.log("API response data:", data);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const tasks = data.data.map((task: any) => ({
    id: task._id,
    title: task.title,
    description: task.description,
    status: task.status,
    createdUserId: {
      id: task.createdUserId._id,
      firstName: task.createdUserId.firstName,
      lastName: task.createdUserId.lastName,
    },
    ...task
  }));

  console.log("API response array:", tasks);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading tasks: {error.message}</div>;
  }

  return (
    <div className="task-management-container">
      <h2 className="task-management-title">Task Management</h2>
      <div className="task-table-wrapper">
        <TaskTable tasks={tasks} />
      </div>
    </div>
  );
};

export default TaskManagement;