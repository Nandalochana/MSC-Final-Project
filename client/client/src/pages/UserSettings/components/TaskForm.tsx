import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useFormik } from "formik";
import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { useUserStore } from "../../../store/user-store";
import { useCreateTask } from "../api/query";
import { UserDetailsAPI } from "../api/query-slice";
import TaskItem from "./TaskItem";


// Zod Schema for Form Validation
const taskSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(5, "Description must be at least 5 characters"),
});

const TaskForm: React.FC = () => {
  const { user } = useUserStore();

  const createTask = useCreateTask();

  // Query to Fetch Tasks
  const { data: tasks = [], isLoading: isTasksLoading, isError, error } = useQuery({
    queryKey: ["tasks"],
    queryFn: () => UserDetailsAPI.getUserCreatedTasks({ userId: user?.user._id as string }),
  });


  // Formik Setup
  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
    },
    validationSchema: toFormikValidationSchema(taskSchema),
    onSubmit: (values, { resetForm }) => {
      const newTask = {
        createdUserId: user?.user._id as string,
        title: values.title,
        description: values.description,
        status: "active",
      };

      createTask.mutate(newTask);
      resetForm(); // Clear form after submission
    },
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
    <div className="mx-auto p-6 bg-white">
      <h2 className="text-2xl font-bold mb-4">Create Task</h2>

      {/* Task Form */}
      <form onSubmit={formik.handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Title</label>
          <input
            type="text"
            name="title"
            value={formik.values.title}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full px-3 py-2 border rounded-lg focus:ring focus:ring-blue-300"
          />
          {formik.touched.title && formik.errors.title && (
            <p className="text-red-500 text-xs mt-1">{formik.errors.title}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            name="description"
            value={formik.values.description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full px-3 py-2 border rounded-lg focus:ring focus:ring-blue-300"
          />
          {formik.touched.description && formik.errors.description && (
            <p className="text-red-500 text-xs mt-1">{formik.errors.description}</p>
          )}
        </div>

        <button
          type="submit"
          className={`w-full px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 ${formik.isValid ? "opacity-100" : "opacity-50"
            }`}
          disabled={!formik.isValid}
        >
          Create Task
        </button>
      </form>

      {/* Task List */}
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
  );
};

export default TaskForm;
