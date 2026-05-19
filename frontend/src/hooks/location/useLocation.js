import { useEffect, useState } from "react";

const useLocation = () => {
  const [location, setLocation] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser");
      setIsLoading(false);
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (possition) => {
        setLocation({
          lat: possition.coords.latitude,
          lng: possition.coords.longitude,
        });
        setIsLoading(false);
      },
      (error) => {
        setLocation({
          lat: 21.175,
          lng: 72.8350,
        });
        setError("Unable to retrieve your location, using default location");
        setIsLoading(false);
      },
    );
  }, []);
  return { location, isLoading, error };
};

export default useLocation;
