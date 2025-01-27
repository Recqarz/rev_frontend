import React from "react";

const UserChart = ({ allList }) => {
  const getRoleColor = (role) => {
    switch (role) {
      case "coordinator":
        return "#38b6ffff"; // Light blue
      case "fieldExecutive":
        return "#d455aeff"; // Orange
      case "supervisor":
        return "#4caf50"; // Green
      case "auditor":
        return "#f97316"; // Orange
      default:
        return "#9b9b9b"; // Gray for unknown roles
    }
  };

  // Dynamically create rolesData from allList?.users?.role
  const rolesData = Object.entries(allList?.users?.role || {}).map(
    ([role, value]) => ({
      role: role.charAt(0).toUpperCase() + role.slice(1), // Capitalize the first letter
      value, // Directly use the value from entries
      color: getRoleColor(role), // Dynamically set color based on role
    })
  );

  return (
    <div className="w-full rounded-lg p-4 flex flex-col gap-y-6 ">
      <div>
        <h4 className="text-sm font-semibold text-gray-400">Different Users</h4>
      </div>

      <div className="flex flex-col gap-6">
        {rolesData.map((item, index) => (
          <div key={index} className="flex gap-4 items-center w-full">
            <div className="w-[20%]">
              <h1>{item?.role}</h1>
            </div>
            <div className="w-[60%] items-center">
              <input
                type="range"
                // value={100} // Dynamically set value for each role
                value={item?.value} // Dynamically set value for each role
                className="w-full h-2 rounded-full transition duration-300 ease-in-out"
                style={{
                  accentColor: item?.color, // Apply color dynamically
                }}
                readOnly
              />
            </div>
            <div className="w-[20%]">
              <h1>{item?.value}</h1>{" "}
              {/* Display the value (number of users in each role) */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserChart;
