"use client";
import NearbySearch from "@/components/nearby-search";
import { useState, useEffect } from "react";

export default function Home() {
  const [location, setLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

  const [fetchLocation, setFetchLocation] = useState<boolean>(true);

  const handleButtonClick = () => {
    setFetchLocation(true);
  };

  useEffect(() => {
    if (fetchLocation) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });
        });
      }

      setFetchLocation(false);
    }
  }, [fetchLocation]);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div></div>
      <button
        onClick={handleButtonClick}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      ></button>
      {location?.latitude},
      {location?.longitude}
      <NearbySearch />
    </main>
  );
}
