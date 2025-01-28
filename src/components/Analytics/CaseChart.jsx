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
    colors: ["#FF5733", "#FFC300", "#28A745", "#C70039"], // Custom bar colors
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
    <div>
      <Chart options={chartOptions} series={series} type="bar" height={290} />
    </div>
  );
};

export default CaseChart;
