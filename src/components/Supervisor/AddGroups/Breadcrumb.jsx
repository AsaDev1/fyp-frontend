import React from "react";

const Breadcrumb = () => {
  return (
    <div className="wrapper mt-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-400">
            Students &gt; FYP-I &gt; <span className="text-gray-800">Add New Group</span>
          </h1>
          <p className="text-gray-600 text-left">Add Students To FYP-I</p>
        </div>
      </div>
    </div>
  );
};

export default Breadcrumb;
