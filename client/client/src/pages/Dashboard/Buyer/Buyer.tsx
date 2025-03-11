import { FC, useState } from "react";
import ProfileView from "./components/ProfileView";
import MapView from "./components/MapView";
import LeftSidebar from "./components/LeftSidebar";

export const Buyer: FC = () => {
  const [activeTab, setActiveTab] = useState<"map" | "profile">("profile");
  const [nameFilter, setNameFilter] = useState<string>("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  // Function to apply filters
  const handleApplyFilter = (name: string, categories: string[]) => {
    setNameFilter(name);
    setSelectedCategories(categories);
  };

  return (
    <div className="mx-auto min-h-screen">
      {/* Header Section */}
      <section className="h-48 flex flex-col justify-center items-center bg-blue-500 text-white">
        <h1 className="text-3xl font-bold">Buyer Dashboard</h1>
      </section>

      <div className="flex h-screen md:flex-row flex-col container mx-auto my-5">
        {/* Sidebar with Filters */}
        <LeftSidebar onFilterChange={handleApplyFilter} />

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
          <div className="">
            {activeTab === "profile" ? (
              <ProfileView nameFilter={nameFilter} selectedCategories={selectedCategories} />
            ) : (
              <MapView />
              // <MapView nameFilter={nameFilter} selectedCategories={selectedCategories} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
