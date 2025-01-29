import React, { useEffect, useState } from "react";
import useGoogleMaps from "../../utils/customHooks/useGoogleMaps";

const GeolocationAutoComplete = ({ onSelect }) => {
  const isGoogleMapsLoaded = useGoogleMaps(); // Load Google Maps dynamically
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    if (!isGoogleMapsLoaded) return;

    const autocomplete = new window.google.maps.places.Autocomplete(
      document.getElementById("autocomplete"),
      { types: ["geocode"] }
    );

    autocomplete.addListener("place_changed", () => {
      const selectedPlace = autocomplete.getPlace();
      setInputValue(selectedPlace.formatted_address || "");
      if (selectedPlace.geometry) {
        const locationData = {
          address: selectedPlace.formatted_address,
          coordinates: [
            selectedPlace.geometry.location.lng(),
            selectedPlace.geometry.location.lat(),
          ],
        };
        onSelect(locationData);
      }
    });
  }, [isGoogleMapsLoaded, onSelect]);

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        geocode location
      </label>
      <input
        id="autocomplete"
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Enter a location"
        className="w-full p-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
};

export default GeolocationAutoComplete;
