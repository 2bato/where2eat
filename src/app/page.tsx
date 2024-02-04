"use client";
import Filters from "@/components/filter";
import NearbySearch from "@/utils/nearby-search";
import { useState, useEffect } from "react";

interface Result {
  displayName: string;
  photoUrl: string;
  rating: number;
}

export default function Home() {
  const [location, setLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

  const [fetchLocation, setFetchLocation] = useState<boolean>(true);
  const [displayName, setDisplayName] = useState<string>("");
  const [displayRating, setDisplayRating] = useState<number>(0);
  const [displayPhoto, setDisplayPhoto] = useState<string>("");
  const [rating, setRating] = useState<number>(0);
  const [price, setPrice] = useState<string>("");
  const [cuisine, setCuisine] = useState<string>("restaurant");

  const handleButtonClick = async () => {
    setFetchLocation(true);
    const result: Result = await NearbySearch(cuisine, rating, price);
    setDisplayName(result.displayName);
    setDisplayRating(result.rating);
    setDisplayPhoto(result.photoUrl);
    console.log(displayName);
  };

  const handleFilterChange = (
    newRating: number,
    newPrice: string,
    newCuisine: string
  ) => {
    setRating(newRating);
    setPrice(newPrice);
    setCuisine(newCuisine);
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
    <main className="flex min-h-screen flex-col items-center justify-between p-24 text-white">
      <div>
        {" "}
        {displayName} {displayRating}{" "}
        <img src={displayPhoto} alt="Image Description" />
      </div>
      <button
        onClick={handleButtonClick}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      ></button>
      {location?.latitude},{location?.longitude}
      <Filters onFilterChange={handleFilterChange} />
    </main>
  );
}
