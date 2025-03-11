import { useQuery } from "@tanstack/react-query";
import { UserDetailsAPI } from "../../../UserSettings/api/query-slice";
import TaskItem from "../../../UserSettings/components/TaskItem";
import { FC } from "react";

export const FreelancerDashboard: FC = () => {
  // Query to Fetch Tasks
  const { data: tasks = [], isLoading: isTasksLoading, isError, error } = useQuery({
    queryKey: ["tasks"],
    queryFn: () => UserDetailsAPI.getAllTasks(),
  });

  if (isTasksLoading) {
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

  if (isError) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <p className="text-red-600 font-semibold">
            Oops! Something went wrong.
          </p>
          <p className="text-gray-700">{error?.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto min-h-screen">
      {/* Header Section */}
      <section className="h-48 flex flex-col justify-center items-center bg-blue-500 text-white">
        <h1 className="text-3xl font-bold">Freelancer Dashboard</h1>
      </section>

      <div className="flex h-screen container mx-auto my-5">
        {/* Main Content */}
        <div className="flex-1 p-4">
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Tasks</h2>

            {Array.isArray(tasks) || tasks?.data.length === 0 ? (
              <p className="text-gray-500">No tasks added yet.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                <TaskItem tasks={tasks.data} isLoading={isTasksLoading} />
                </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
