import React, { useEffect, useState } from "react";
import useGoogleMaps from "../../utils/customHooks/useGoogleMaps";

const LocationAutocomplete = ({ onSelect }) => {
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
          lat: selectedPlace.geometry.location.lat(),
          lng: selectedPlace.geometry.location.lng(),
        };
        onSelect(locationData);
      }
    });
  }, [isGoogleMapsLoaded, onSelect]);

  return (
    <input
      id="autocomplete"
      type="text"
      value={inputValue}
      onChange={(e) => setInputValue(e.target.value)}
      placeholder="Enter a location"
      className="w-full p-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  );
};

export default LocationAutocomplete;
