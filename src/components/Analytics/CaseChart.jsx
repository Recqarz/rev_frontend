import React from "react";
import Chart from "react-apexcharts";

const CaseChart = ({ allList }) => {
  // Map the status data from allList and transform it to match the expected format
  const caseData = Object.entries(allList?.cases?.status || {}).map(
    ([status, count]) => ({
      status,
      count,
    })
  );

  const categories = caseData.map((item) => item.status);
  const seriesData = caseData.map((item) => item.count);

  // Function to get color based on the case status
  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "#FFA500"; // Orange for pending
      case "rejected":
        return "#FF0000"; // Red for rejected
      case "completed":
        return "#28A745"; // Green for completed
      case "process":
        return "#3498db"; // Blue for process
      default:
        return "#9b9b9b"; // Gray for unknown statuses
    }
  };

  // Dynamically set the colors based on case status
  const statusColors = caseData.map((item) => getStatusColor(item.status));

  const chartOptions = {
    chart: {
      type: "bar",
      height: 350,
    },
    plotOptions: {
      bar: {
        distributed: true,
        borderRadius: 3,
        horizontal: false,
        columnWidth: "30%",
      },
    },
    xaxis: {
      categories,
    },
    colors: statusColors, // Apply dynamic colors based on status
    dataLabels: {
      enabled: true,
    },
    legend: {
      show: true, // Enable legend
      position: "top", // Place legend at the top
      horizontalAlign: "center", // Center align the legend
      markers: {
        width: 8,
        height: 8,
        radius: 6, // Rounded markers
        shape: "circle", // Explicitly ensure circular markers
      },
      itemMargin: {
        horizontal: 10,
        vertical: 5,
      },
    },
    tooltip: {
      enabled: true,
      y: {
        formatter: (value) => `${value} cases`,
      },
    },
  };

  const series = [
    {
      name: "Cases",
      data: seriesData,
    },
  ];

  return (
    <div className="flex flex-col">
      <h1 className="text-lg font-bold text-gray-400 -mb-7">Cases</h1>
      <Chart options={chartOptions} series={series} type="bar" height={290} />
    </div>
  );
};

export default CaseChart;
