import React from 'react';
import TaskForm from './TaskForm';

const TaskPage: React.FC = () => {
    return (
        <div className="min-h-screen bg-gray-100">
          <section className="h-48 flex flex-col justify-center items-center bg-blue-500 text-white">
            <h1 className="text-3xl font-bold">Task Management</h1>
          </section>
          <div className="container mx-auto bg-white shadow-lg rounded-lg p-6 my-8">
            <TaskForm />
          </div>
        </div>
      );
};

export default TaskPage;