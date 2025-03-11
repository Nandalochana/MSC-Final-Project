import React from "react";
import { useNavigate } from "react-router";

interface TaskListProps {
  tasks: Array<{
    _id: string;
    title: string;
    description: string;
    status: string;
  }>;
  isLoading: boolean;
}

const TaskItem: React.FC<TaskListProps> = ({ tasks, isLoading }) => {
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="text-center">
          <p className="text-gray-700 font-medium animate-pulse">
            Page is loading, please wait...
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      {tasks.map((task) => (
        <div
          key={task._id}
          className="flex flex-col justify-between bg-white p-4 rounded-xl shadow-md min-h-[200px] max-w-[300px] border border-gray-200 cursor-pointer"
          onClick={() => navigate(`/task/${task._id}`)}
        >
          <h3 className="font-bold text-lg text-blue-600 truncate">
            {task.title}
          </h3>
          <p className="text-gray-700 text-sm line-clamp-3">
            {task.description}
          </p>
          <span className="text-xs font-semibold text-gray-500 mt-auto">
            Status: {task.status}
          </span>
        </div>
      ))}
    </>
  );
};

export default TaskItem;
