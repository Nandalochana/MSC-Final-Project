import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import Select from "react-select";
import { ProfileAPI } from "../../../ProfileManager/api/query-slice";

interface LeftSidebarProps {
  onFilterChange: (name: string, categories: string[]) => void;
}

const LeftSidebar: React.FC<LeftSidebarProps> = ({ onFilterChange }) => {
  const [nameFilter, setNameFilter] = useState<string>("");
  const [selectedOptions, setSelectedOptions] = useState<{ value: string; label: string }[]>([]);

  // Fetch profiles
  const { data: profiles, isLoading: isProfilesLoading } = useQuery({
    queryKey: ["profiles"],
    queryFn: () => ProfileAPI.getAllProfiles(),
  });

  const options =
    profiles?.data?.map((profile) => ({
      value: profile._id,
      label: profile.profileName,
    })) || [];

  const handleApplyFilter = () => {
    const selectedCategories = selectedOptions.map((option) => option.value);
    onFilterChange(nameFilter, selectedCategories);
  };

  // Function to clear filters
  const handleClearFilter = () => {
    setNameFilter("");
    setSelectedOptions([]);
    onFilterChange("", []); // Reset filters in the parent component
  };

  return (
    <div className="md:w-1/4 h-full bg-blue-600 text-white p-4 rounded-xl max-md:mx-4">
      <h2 className="text-xl font-bold mb-6">Filters</h2>

      {/* Name Filter */}
      <div className="mb-6">
        <label htmlFor="nameFilter" className="block text-sm mb-2">
          Filter by Name:
        </label>
        <input
          type="text"
          id="nameFilter"
          className="w-full p-2 rounded-md text-black"
          placeholder="Enter name"
          value={nameFilter}
          onChange={(e) => setNameFilter(e.target.value)}
        />
      </div>

      {/* Category Filter */}
      <div className="mb-6">
        <label htmlFor="categoryFilter" className="block text-sm mb-2">
          Filter by Category:
        </label>
        <Select
          options={options}
          isLoading={isProfilesLoading}
          value={selectedOptions}
          isMulti
          onChange={(options) => setSelectedOptions(options as { value: string; label: string }[])}
          placeholder="Select profiles"
          className="text-black"
        />
      </div>

      <div className="flex gap-2">
        <button
          onClick={handleClearFilter}
          className="mt-2 w-full bg-white text-blue-600 p-2 rounded-md font-bold"
        >
          Clear
        </button>

        <button
          onClick={handleApplyFilter}
          className="mt-2 w-full bg-white text-blue-600 p-2 rounded-md font-bold"
        >
          Apply Filter
        </button>
      </div>
    </div>
  );
};

export default LeftSidebar;
