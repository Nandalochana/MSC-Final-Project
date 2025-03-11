import { FC } from "react";
import { FreelancerDashboard } from "./FreelancerDashBoard/FreelnacerDashBoard";

export const Freelancer: FC = () => {
  return (
    <div className="mx-auto min-h-screen">
      {/* Header Section */}
       <FreelancerDashboard/>
    </div>
  );
};
