import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import Select from "react-select";
import { ProfileAPI } from "../../../ProfileManager/api/query-slice";
import ReactStars from "react-rating-stars-component";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";

interface LeftSidebarProps {
  onFilterChange: (name: string, categories: string[], rating: string[]) => void;
}

const LeftSidebar: React.FC<LeftSidebarProps> = ({ onFilterChange }) => {
  const [nameFilter, setNameFilter] = useState<string>("");
  const [selectedOptions, setSelectedOptions] = useState<{ value: string; label: string }[]>([]);
  const [selectedRatings, setSelectedRatings] = useState<number[]>([]); // State for selected ratings

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

  const ratingOptions = [
    { value: 5, label: "5.0" },
    { value: 4, label: "4.0 & up" },
    { value: 3, label: "3.0 & up" },
    { value: 2, label: "2.0 & up" },
    { value: 1, label: "1.0 & up" },
  ];

  const handleRatingChange = (e: React.ChangeEvent<HTMLInputElement>, value: number) => {
    if (e.target.checked) {
      setSelectedRatings((prev) => [...prev, value]);
    } else {
      setSelectedRatings((prev) => prev.filter((rating) => rating !== value));
    }
  };

  const handleApplyFilter = () => {
    const selectedCategories = selectedOptions.map((option) => option.value);
    onFilterChange(nameFilter, selectedCategories, selectedRatings.map(String)); // Convert ratings to strings
  };

  const handleClearFilter = () => {
    setNameFilter("");
    setSelectedOptions([]);
    setSelectedRatings([]); // Reset selected ratings
    onFilterChange("", [], []); // Reset filters in the parent component (no change needed here)
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

      {/* Rating Filter */}
      <div className="mb-6">
        <label htmlFor="ratingFilter" className="block text-sm mb-2">
          Filter by Rating:
        </label>
        <ul className="space-y-4">
          {ratingOptions.map((option, index) => (
            <li key={option.value} className="flex items-center gap-3">
              <input
                type="checkbox"
                id={`rating-${index}`}
                onChange={(e) => handleRatingChange(e, option.value)}
                checked={selectedRatings.includes(option.value)}
                className="h-4 w-4 rounded border-gray-300 text-accentYellow focus:ring-accentYellow"
              />
              <ReactStars
                count={5}
                value={option.value}
                size={16}
                activeColor="#FF8A00"
                isHalf={true}
                edit={false}
                emptyIcon={<FaStar className="text-lightOrange" />}
                halfIcon={<FaStarHalfAlt />}
                filledIcon={<FaStar />}
              />
              <label htmlFor={`rating-${index}`} className="text-sm text-gray-200">
                {option.label}
              </label>
            </li>
          ))}
        </ul>
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