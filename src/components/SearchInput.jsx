import React, { useState, useEffect, useRef } from "react";
import { baseURL } from "../utils/urls/baseURL";

const SearchInput = ({ onSelect, placeholder="placeholder", label="laber" }) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const wrapperRef = useRef(null);

  // Fetch city suggestions
  const fetchCitySuggestions = async (searchQuery) => {
    // if (searchQuery.length < 2) {
    //   setSuggestions([]);
    //   return;
    // }

    setIsLoading(true);
    try {
      const response = await fetch(
        `${baseURL}/api/v1/coordinator/fieldExecutive-list?search=${encodeURIComponent(
          searchQuery
        )}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      const data = await response.json();
      setSuggestions(data?.users);
    } catch (error) {
      console.error("Error fetching city suggestions:", error);
      setSuggestions([]);
    }
    setIsLoading(false);
  };

  // Debounce search
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      //   if (query) {
      fetchCitySuggestions(query);
      //   }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [query]);

  const handleSelect = (city) => {
    setQuery(city.cityName);
    setShowSuggestions(false);
    onSelect(city);
  };

  return (
    <div className="relative" ref={wrapperRef}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <input
        type="text"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setShowSuggestions(true);
        }}
        onFocus={() => setShowSuggestions(true)}
        placeholder={placeholder || "Enter city name"}
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-primary-700"
      />

      {/* Loading indicator */}
      {isLoading && (
        <div className="absolute right-3 top-3">
          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-500"></div>
        </div>
      )}

      {/* Suggestions dropdown */}
      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute z-10 w-full mt-1 bg-white shadow-lg rounded-md border border-gray-200 max-h-60 overflow-auto">
          {suggestions.map((city, index) => (
            <div
              key={`${city?.firstName}-${index}`}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleSelect(city)}
            >
              <div className="font-medium">{city.firstName}</div>
              <div className="text-sm text-gray-500">
                {city.mobile} ({city.email})
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchInput;
