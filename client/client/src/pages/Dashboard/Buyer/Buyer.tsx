import { FC, useState } from "react";
import LeftSidebar from "./components/LeftSidebar";
import ProfileView from "./components/ProfileView";
import MapView from "./components/MapView";

export const Buyer: FC = () => {
  const [activeTab, setActiveTab] = useState<"map" | "profile">("profile");

  return (
    <div className="mx-auto min-h-screen">
      {/* Header Section */}
      <section className="h-48 flex flex-col justify-center items-center bg-blue-500 text-white">
        <h1 className="text-3xl font-bold">Buyer Dashboard</h1>
      </section>

      <div className="flex h-screen container mx-auto my-5">
        {/* Left Sidebar */}
        <LeftSidebar />

        {/* Main Content */}
        <div className="flex-1 p-4">
          {/* Tab Switcher */}
          <div className="flex justify-end mb-4">
            <button
              className={`px-4 py-2 rounded ${
                activeTab === "profile"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-300"
              }`}
              onClick={() => setActiveTab("profile")}
            >
              Profile View
            </button>
            <button
              className={`ml-2 px-4 py-2 rounded ${
                activeTab === "map" ? "bg-blue-500 text-white" : "bg-gray-300"
              }`}
              onClick={() => setActiveTab("map")}
            >
              Map View
            </button>
          </div>

          {/* Content */}
          <div className="bg-gray-100 p-4 rounded shadow max-h-full overflow-auto">
            {activeTab === "profile" ? <ProfileView /> : <MapView />}
          </div>
        </div>
      </div>
    </div>
  );
};
