"use client";
import Filters from "@/components/filter";
import NearbySearch from "@/utils/nearby-search";
import Image from "next/image";
import { useState, useEffect } from "react";

interface Result {
  displayName: string;
  photoUrl: string;
  rating: string;
}

export default function Home() {
  const [location, setLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [fetchLocation, setFetchLocation] = useState<boolean>(true);
  const [displayName, setDisplayName] = useState<string>("Placeholder");
  const [displayRating, setDisplayRating] = useState<string>("4.3");
  const [displayPhoto, setDisplayPhoto] = useState<string>(
    "https://media1.tenor.com/m/GOabrbLMl4AAAAAd/plink-cat-plink.gif"
  );
  const [rating, setRating] = useState<number>(0);
  const [price, setPrice] = useState<string>("");
  const [cuisine, setCuisine] = useState<string>("restaurant");

  const handleButtonClick = async () => {
    setFetchLocation(true);
    const result: Result = await NearbySearch(cuisine, rating, price, location);
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
    <main className="flex min-h-screen flex-col items-center p-10 mt-10">
      <Filters onFilterChange={handleFilterChange} />
      <div className="bg-white text-black font-bold pl-5 pr-5 pb-5 rounded-2xl flex flex-col items-center">
        <div className="flex flex-col items-center">
          <header className="text-xl">{displayName}</header>
          <header className="text-xl flex flex-row">
            <div className="text-yellow-400 mr-2">★</div>{displayRating}
          </header>
        </div>
        <Image
          src={displayPhoto}
          alt="Image Description"
          width={800}
          height={800}
          className="rounded-2xl m-4"
        />
        <button
          onClick={handleButtonClick}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Roll the dice
        </button>
      </div>
    </main>
  );
}
