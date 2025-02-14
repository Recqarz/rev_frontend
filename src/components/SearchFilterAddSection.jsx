import React from "react";
import { IoMdSearch } from "react-icons/io";
import { Link } from "react-router-dom";
import { debounce } from "../utils/halper";

const SearchFilterAddSection = ({
  setSearchQuery,
  setCurrentPageState,
  filterOptions,
  handleFilterChange,
  handleResetFilters,
  disabledReset,
  enableReset,
  goToPageLink,
  addBtnEnable,
}) => {
  const handleSearch = (val) => {
    setSearchQuery(val);
    setCurrentPageState(1);
  };

  const debouncedHandleSearch = debounce(handleSearch, 500);

  const handleSearchInput = (e) => {
    debouncedHandleSearch(e.target.value);
  };
  return (
    <div className="w-full flex gap-3 flex-col-reverse lg:flex-row lg:justify-between lg:gap-4">
      <div className="flex lg:gap-5 flex-wrap md:!flex-wrap gap-4 lg:justify-normal">
        {/* Search Bar */}
        <div className="flex items-center border rounded-lg bg-white  py-2 px-3 w-64 focus-within:ring-cyan-600 focus-within:border-cyan-600">
          <span className=" flex items-center text-gray-400 text-md">
            <IoMdSearch />
          </span>
          <input
            onChange={handleSearchInput}
            type="text"
            placeholder="Search here . . ."
            className="ml-2 flex-1 text-sm outline-none"
          />
        </div>

        {/* Filter Role Dropdown */}
        {filterOptions?.map((filter, index) => (
          <select
            key={index}
            className="px-4 py-2 border rounded-lg text-sm bg-white focus:ring-cyan-600 focus:border-cyan-600"
            value={filter.value}
            onChange={(e) => handleFilterChange(filter.name, e.target.value)}
          >
            <option value="">{filter.placeholder}</option>
            {filter.options.map((option) => (
              <option
                key={option.value}
                value={option.value}
                className="!hover:cursor-pointer"
              >
                {option.label}
              </option>
            ))}
          </select>
        ))}

        {/* Reset All Filter */}
        {}
        <button
          onClick={handleResetFilters}
          disabled={disabledReset} // Disable button if no filters are applied
          className={`px-6 py-2 text-sm rounded-lg font-medium ${
            enableReset
              ? "bg-red-400 text-white hover:bg-red-500"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          Reset
        </button>
      </div>

      {/* Add Case Section only access to coordinator */}
      {addBtnEnable && (
        <div className="flex justify-end lg:justify-normal">
          <Link to={goToPageLink}>
            <div className="rounded-md px-6 bg-[#073c4e] py-2 text-white font-semibold">
              ADD
            </div>
          </Link>
        </div>
      )}
    </div>
  );
};

export default SearchFilterAddSection;
