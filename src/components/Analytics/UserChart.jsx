import React from "react";

const UserChart = ({ allList }) => {
  const getRoleColor = (role) => {
    switch (role) {
      case "coordinator":
        return "#38b6ffff";
      case "fieldExecutive":
        return "#d455aeff";
      case "supervisor":
        return "#4caf50";
      case "auditor":
        return "#f97316";
      default:
        return "#9b9b9b";
    }
  };

  // Calculate total number of users
  const totalUsers = Object.values(allList?.users?.role || {}).reduce(
    (acc, value) => acc + value,
    0
  );

  // Dynamically create rolesData from allList?.users?.role
  const rolesData = Object.entries(allList?.users?.role || {}).map(
    ([role, value]) => ({
      role: role.charAt(0).toUpperCase() + role.slice(1), // Capitalize the first letter
      value, // Number of users in the role
      totalUsers: value,
      percentage: Math.floor(((value / totalUsers) * 100).toFixed(2)), // Calculate percentage
      color: getRoleColor(role), // Dynamically set color based on role
    })
  );

  return (
    <div className="w-full rounded-lg p-4 flex flex-col gap-y-6">
      <div>
        <h4 className="text-lg font-semibold text-gray-400">Users</h4>
      </div>

      <div className="flex flex-col gap-6">
        {rolesData.map((item, index) => (
          <div key={index} className="flex gap-4 items-center w-full">
            <div className="w-[20%]">
              <h1>{item?.role}</h1>
            </div>
            <div className="w-[60%] relative">
              <div
                className="h-2 rounded-full"
                style={{
                  backgroundColor: "#e0e0e0", // Light grey background for the progress bar
                  width: "100%",
                  height: "8px",
                }}
              >
                <div
                  className="h-2 rounded-full"
                  style={{
                    backgroundColor: item?.color,
                    width: `${item?.percentage}%`,
                  }}
                />
              </div>
            </div>
            <div className="w-[20%] text-gray-600">
              <h1>
                {item?.percentage}% ( {item?.totalUsers} )
              </h1>
              {/* Display the percentage of users in each role */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserChart;
