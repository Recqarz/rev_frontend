import { useEffect, useState } from "react";

const googleMapsApiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

const useGoogleMaps = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!googleMapsApiKey) {
      console.error("Google Maps API key is missing! Check your .env file.");
      return;
    }

    // ✅ Ensure `window.initGoogleMaps` exists before script execution
    window.initGoogleMaps = () => {
      console.log("Google Maps API loaded successfully.");
      setIsLoaded(true);
    };

    // ✅ Check if the script is already loaded
    if (window.google && window.google.maps) {
      setIsLoaded(true);
      return;
    }

    // ✅ Avoid duplicate script injection
    if (!document.querySelector("#google-maps-script")) {
      const script = document.createElement("script");
      script.id = "google-maps-script";
      script.src = `https://maps.googleapis.com/maps/api/js?key=${googleMapsApiKey}&libraries=places&callback=initGoogleMaps`;
      script.async = true;
      script.defer = true;
      script.setAttribute("loading", "async"); // ✅ Fixes the warning

      document.head.appendChild(script);

      script.onerror = () => {
        console.error("Failed to load Google Maps API.");
      };
    }
  }, []);

  return isLoaded;
};

export default useGoogleMaps;
