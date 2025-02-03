import React, { useEffect, useState } from "react";
import useGoogleMaps from "../../utils/customHooks/useGoogleMaps";

const GeolocationAutoComplete = ({ onSelect, clientGeoFormattedAddress }) => {
  const isGoogleMapsLoaded = useGoogleMaps(); // Load Google Maps dynamically
  const [inputValue, setInputValue] = useState(
    (clientGeoFormattedAddress && clientGeoFormattedAddress) || ""
  );
  const [isUserSelected, setIsUserSelected] = useState(false); // To track manual selection

  useEffect(() => {
    if (!isUserSelected && clientGeoFormattedAddress) {
      setInputValue(clientGeoFormattedAddress);
    }
    if (!isGoogleMapsLoaded) return;

    const autocomplete = new window.google.maps.places.Autocomplete(
      document.getElementById("autocomplete"),
      { types: ["geocode"] }
    );

    autocomplete.addListener("place_changed", () => {
      const selectedPlace = autocomplete.getPlace();
      setInputValue(selectedPlace?.formatted_address || "");
      setIsUserSelected(true);
      if (selectedPlace?.geometry) {
        const locationData = {
          address: selectedPlace.formatted_address,
          longitude: selectedPlace.geometry.location.lng(),
          latitude: selectedPlace.geometry.location.lat(),
        };
        onSelect(locationData);
      }
    });
  }, [clientGeoFormattedAddress, isGoogleMapsLoaded, onSelect]);

  return (
    <div className="flex flex-col gap-1">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Client Geolocation
      </label>
      <input
        id="autocomplete" //make this fix, its from googleAPI
        type="text"
        name="clientGeoFormattedAddress"
        value={inputValue}
        onChange={(e) => {
          setInputValue(e.target.value);
          setIsUserSelected(true);
        }}
        placeholder="Enter Location"
        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
      />
    </div>
  );
};

export default GeolocationAutoComplete;
