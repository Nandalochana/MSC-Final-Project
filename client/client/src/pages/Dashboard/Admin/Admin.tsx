import { FC } from "react";
import AdminDashboard from "./dashboard/AdminDashBoard";

export const Admin: FC = () => {
  return (
    <div className="mx-auto min-h-screen">
      {/* Header Section */}
      <section className="h-48 flex flex-col justify-center items-center bg-blue-500 text-white">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
     
      </section>

      <AdminDashboard />
    </div>
  );
};
