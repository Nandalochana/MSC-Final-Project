import React from "react";

interface TaskListProps {
  tasks: Array<{
    _id: string;
    title: string;
    description: string;
    status: string;
  }>;
  isLoading: boolean;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, isLoading }) => {
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
    <div className="flex flex-wrap gap-4">
      {tasks.map((task, index) => (
        <div
          key={index}
          className="flex flex-col justify-between items-start bg-gray-100 p-3 rounded-lg shadow gap-3"
        >
          <h3 className="font-bold text-blue-600">{task.title}</h3>
          <p className="text-gray-700">{task.description}</p>
          <span className="text-xs text-gray-500">Status: {task.status}</span>
        </div>
      ))}
    </div>
  );
};

export default TaskList;
