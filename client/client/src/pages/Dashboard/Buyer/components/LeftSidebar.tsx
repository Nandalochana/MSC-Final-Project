import React, { useState } from "react";

const LeftSidebar: React.FC = () => {
  const [nameFilter, setNameFilter] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNameFilter(event.target.value);
    // Add logic here to handle name filter changes (e.g., send to parent component or apply directly)
  };

  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(event.target.value);
    // Add logic here to handle category filter changes
  };

  return (
    <div className="w-1/4 h-full bg-blue-600 text-white p-4 rounded-xl">
      {/* Sidebar Title */}
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
          onChange={handleNameChange}
        />
      </div>

      {/* Category Filter */}
      <div className="mb-6">
        <label htmlFor="categoryFilter" className="block text-sm mb-2">
          Filter by Category:
        </label>
        <select
          id="categoryFilter"
          className="w-full p-2 rounded-md text-black"
          value={selectedCategory}
          onChange={handleCategoryChange}
        >
          <option value="">Select category</option>
          <option value="electronics">Electronics</option>
          <option value="fashion">Fashion</option>
          <option value="home">Home</option>
          <option value="beauty">Beauty</option>
        </select>
      </div>

     
    </div>
  );
};

export default LeftSidebar;
