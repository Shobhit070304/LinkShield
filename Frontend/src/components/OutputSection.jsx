import React from "react";

function OutputSection({ link }) {
  if (!link) return null;

  return (
    <div className="p-4">
      <p className="mb-2 font-medium">Your shareable link:</p>
      <div className="bg-gray-100 p-2 rounded break-all">{link}</div>
    </div>
  );
}

export default OutputSection;
