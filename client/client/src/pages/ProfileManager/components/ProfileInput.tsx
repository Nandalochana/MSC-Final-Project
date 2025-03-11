import React, { useState } from "react";
import Select from "react-select";

interface ProfileInputProps {
  profiles: { id: string; profileName: string }[] | undefined;
  isLoading: boolean;
  onAddProfile: (profileId: string) => void;
}

const ProfileInput: React.FC<ProfileInputProps> = ({ profiles, isLoading, onAddProfile }) => {
  const [selectedOption, setSelectedOption] = useState<{ value: string; label: string } | null>(
    null
  );

  const options =
    profiles?.map((profile) => ({
      value: profile.id,
      label: profile.profileName,
    })) || [];

  const handleAdd = () => {
    if (selectedOption) {
        onAddProfile(selectedOption.value);
        setSelectedOption(null);
    }
  };

  return (
    <div className="mb-4">
    <div className="flex items-center space-x-4">
      <div className="flex-1">
        <Select
          options={options}
          isLoading={isLoading}
          value={selectedOption}
          onChange={(option) => setSelectedOption(option)}
          placeholder="Search and select a profile"
        />
      </div>
      <button
        onClick={handleAdd}
        className="bg-blue-500 text-white px-4 py-2 rounded"
        disabled={!selectedOption}
      >
        Add Profile
      </button>
    </div>
  </div>
  );
};

export default ProfileInput;
