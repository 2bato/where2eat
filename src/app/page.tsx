"use client";
import Filters from "@/components/filter";
import NearbySearch from "@/utils/nearby-search";
import Image from "next/image";
import { useState, useEffect } from "react";

interface Result {
  displayName: string;
  photoUrl: string;
  rating: string;
  success: boolean;
}

export default function Home() {
  const [location, setLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [fetchLocation, setFetchLocation] = useState<boolean>(true);
  const [displayName, setDisplayName] = useState<string>("");
  const [displayRating, setDisplayRating] = useState<string>("");
  const [displayPhoto, setDisplayPhoto] = useState<string>(
    "https://media1.tenor.com/m/GOabrbLMl4AAAAAd/plink-cat-plink.gif"
  );
  const [rating, setRating] = useState<number[]>([]);
  const [price, setPrice] = useState<string[]>([]);
  const [cuisine, setCuisine] = useState<string[]>([]);
  const [dist, setDist] = useState<number>(1000);
  const [success, setSuccess] = useState<boolean>(false);

  const handleButtonClick = async () => {
    setFetchLocation(true);
    const result: Result = await NearbySearch(
      cuisine,
      rating,
      price,
      location,
      dist
    );
    setDisplayName(result.displayName);
    setDisplayRating(result.rating);
    setDisplayPhoto(result.photoUrl);
    setSuccess(result.success);
  };

  const handleFilterChange = (
    newRating: number[],
    newPrice: string[],
    newCuisine: string[],
    dist: number
  ) => {
    setRating(newRating);
    setPrice(newPrice);
    setCuisine(newCuisine);
    setDist(dist);
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
    <main className="flex min-h-screen flex-col items-center p-8 mt-2">
      <Filters onFilterChange={handleFilterChange} />
      <div className="shadow-2xl text-gray-900 font-bold pl-5 pr-5 pb-5 rounded-2xl flex flex-col items-center">
        <div className="flex flex-col items-center">
          {" "}
          <header className="text-xl">{displayName}</header>
          <header className="text-xl flex flex-row">
            {success ? <div className="text-yellow-400 mr-2">★</div> : <></>}
            {displayRating}
          </header>
        </div>
        <Image
          src={displayPhoto}
          alt="Restaurant image"
          width={280}
          height={300}
          className="rounded-2xl m-4"
        />
        <button
          onClick={handleButtonClick}
          className="bg-green-400/75 shadow-lg hover:bg-green-500/75 text-gray-900 font-bold py-2 px-4 rounded"
        >
          Roll the dice
        </button>
      </div>
    </main>
  );
}
