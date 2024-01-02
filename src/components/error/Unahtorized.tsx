import React from "react";

const Unauthorized: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-lg">
        <div className="flex  items-center mb-4 gap-6">
          <h2 className="text-2xl font-bold ">Unauthorized Access</h2>
          <span className="text-gray-600">401</span>
        </div>
        <p className="text-gray-600">
          Sorry, you don't have permission to access this page.
        </p>
      </div>
    </div>
  );
};

export default Unauthorized;
