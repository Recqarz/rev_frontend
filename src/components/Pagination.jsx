import React, { useState } from "react";

const Pagination = ({
  currentPage,
  totalPages,
  totalData,
  handleLimit,
  limit,
  handleCurrentPageState,
}) => {
  // console.log("pagination no******", (currentPage - 1) * limit + 1);
  return (
    <div className="shadow-lg flex justify-center gap-2 items-center rounded-bl-lg rounded-br-lg bg-[#073c4e] text-white font-medium">
      <button
        onClick={() => handleCurrentPageState(-1)}
        disabled={currentPage === 1}
        className={`px-3 py-1 rounded hover:bg-gray-600 ${
          currentPage === 1 && "cursor-not-allowed opacity-50"
        }`}
      >
        {"<"}
      </button>
      {/* <span>
        {currentPage * limit - limit + 1}-
        {totalData <= currentPage * limit ? totalData : currentPage * limit} of{" "}
        {totalData}
      </span> */}
      <span>
        {(currentPage - 1) * limit + 1} -{" "}
        {Math.min(totalData, currentPage * limit)} of {totalData}
      </span>

      <button
        onClick={() => handleCurrentPageState(1)}
        disabled={currentPage === totalPages}
        className={`px-3 py-1 rounded hover:bg-gray-600 ${
          currentPage === totalPages && "cursor-not-allowed opacity-50"
        }`}
      >
        {">"}
      </button>
      <select
        className=" border border-gray-500 rounded-md bg-[#073c4e] shadow-sm focus:outline-none cursor-pointer"
        onChange={(e) => handleLimit(e.target.value)}
      >
        <option value={10}>10</option>
        <option value={15}>15</option>
        <option value={20}>20</option>
        <option value={30}>30</option>
        <option value={50}>50</option>
      </select>
    </div>
  );
};

export default Pagination;
