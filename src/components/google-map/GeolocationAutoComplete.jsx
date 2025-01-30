import React, { useEffect, useState } from "react";
import useGoogleMaps from "../../utils/customHooks/useGoogleMaps";

const GeolocationAutoComplete = ({ onSelect }) => {
  // console.log("onSelect==>", onSelect);
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
          longitude: selectedPlace.geometry.location.lng(),
          latitude: selectedPlace.geometry.location.lat(),
        };
        onSelect(locationData);
        // console.log("locationData==>", locationData);
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
        name="clientGeolocation"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Enter a location"
        className="w-full p-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />
    </div>
  );
};

export default GeolocationAutoComplete;
