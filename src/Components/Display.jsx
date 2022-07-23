import React from "react";

export const Display = ({ perfData }) => {
  console.log(perfData);
  const { Ground_Roll, Fifty_Foot_Obstacle } = perfData;
  return (
    <div className="text-center mt-8">
      <div className="space-y-4 px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <p className="bold">Landing Ground Roll:</p>
          <p>{Math.ceil(Ground_Roll)} ft</p>
        </div>
      </div>
      <div className="space-y-4 px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <p className="bold">50-ft obstacle distance:</p>
          <p>{Fifty_Foot_Obstacle}</p>
        </div>
      </div>
    </div>
  );
};
