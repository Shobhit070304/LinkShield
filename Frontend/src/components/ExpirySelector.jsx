import React from "react";

const ExpirySelector = ({ onSelect }) => {
  return (
    <div className="p-4">
      <label className="block mb-2 font-medium">Select Expiry Time:</label>
      <select
        onChange={(e) => onSelect(e.target.value)}
        className="border p-2 rounded w-full cursor-pointer"
      >
        <option className="text-black" value="3600">1 Hour</option>
        <option className="text-black" value="86400">1 Day</option>
        <option className="text-black" value="604800">7 Days</option>
      </select>
    </div>
  );
};

export default ExpirySelector;
