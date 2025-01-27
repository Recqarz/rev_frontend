import React from "react";

const UserChart = () => {
  const rolesData = [
    { role: "Coordinator", value: 20, max: 30, color: "#38b6ffff" }, // Light blue
    { role: "Field Executive", value: 10, max: 25, color: "#f97316" }, // Orange
    { role: "Supervisor", value: 15, max: 20, color: "#4caf50" }, // Green
    { role: "Auditor", value: 15, max: 20, color: "#f97316" }, // Green
    // Blue
  ];
  return (
    <div className="w-full bg-white shadow-lg shadow-slate-500 rounded-lg p-4 flex flex-col gap-y-6 ">
      <div>
        <h4 className="text-sm font-semibold text-gray-400">Different Users</h4>
      </div>

      <div className="flex flex-col gap-6 ">
        {rolesData.map((item, index) => (
          <div key={index} className="flex gap-4  items-center w-full">
            <div className="w-[20%]">
              <h1>{item?.role}</h1>
            </div>
            <div className="w-[60%] items-center">
              <input
                type="range"
                value={item?.value}
                max={item?.max}
                className="w-full h-2 rounded-full transition duration-300 ease-in-out"
                style={{
                  accentColor: item?.color, // Apply color dynamically
                }}
                readOnly
              />
            </div>
            <div className="w-[20%]">
              <h1>{item?.max}</h1>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserChart;
