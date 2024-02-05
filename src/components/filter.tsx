import { ChangeEvent, useState, useEffect } from "react";

interface filterProps {
  onFilterChange: (
    rating: number[],
    price: string[],
    cuisine: string[],
    radius: number
  ) => void;
}

export default function Filters({ onFilterChange }: filterProps) {
  const [ratings, setRatings] = useState<number[]>([]);
  const [prices, setPrices] = useState<string[]>([]);
  const [cuisines, setCuisines] = useState<string[]>([]);
  const [dist, setDist] = useState<number>(1000);

  useEffect(() => {
    onFilterChange(ratings, prices, cuisines, dist);
  }, [ratings, prices, cuisines, dist, onFilterChange]);

  const handleRatingChange = (newRating: number) => {
    setRatings((prevRatings) => {
      const updatedRatings = prevRatings.includes(newRating)
        ? prevRatings.filter((rating) => rating !== newRating)
        : [...prevRatings, newRating];

      return updatedRatings;
    }),
      () => {
        onFilterChange(ratings, prices, cuisines, dist);
      };
  };

  const handlePriceChange = (newPrice: string) => {
    setPrices((prevPrices) => {
      const updatedPrices = prevPrices.includes(newPrice)
        ? prevPrices.filter((price) => price !== newPrice)
        : [...prevPrices, newPrice];
      return updatedPrices;
    }),
      () => {
        onFilterChange(ratings, prices, cuisines, dist);
      };
  };

  const handleCuisineChange = (newCuisine: string) => {
    setCuisines((prevCuisines) => {
      const updatedCuisines = prevCuisines.includes(newCuisine)
        ? prevCuisines.filter((cuisine) => cuisine !== newCuisine)
        : [...prevCuisines, newCuisine];

      return updatedCuisines;
    }),
      () => {
        onFilterChange(ratings, prices, cuisines, dist);
      };
  };

  const handleDistChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const updatedDist = parseInt(event.target.value);
    setDist(updatedDist);
    onFilterChange(ratings, prices, cuisines, updatedDist);
  };

  const ratingOptions = [3, 4, 5];
  const priceOptions = [
    "PRICE_LEVEL_INEXPENSIVE",
    "PRICE_LEVEL_MODERATE",
    "PRICE_LEVEL_EXPENSIVE",
    "PRICE_LEVEL_VERY_EXPENSIVE",
  ];
  const cuisineOptions = [
    "thai_restaurant",
    "chinese_restaurant",
    "italian_restaurant",
    "mexican_restaurant",
    "japanese_restaurant",
    "indian_restaurant",
    "greek_restaurant",
    "french_restaurant",
    "brazilian_restaurant",
    "vegetarian_restaurant",
    "mediterranean_restaurant",
    "vietnamese_restaurant",
    "sushi_restaurant",
  ];
  return (
    <div className="flex flex-col items-center mb-8 space-y-2">
      <div className="space-y-2 items-center flex flex-col">
        <div className="flex flex-row space-x-5">
          {ratingOptions.map((option) => (
            <button
              key={option}
              className={`text-gray-900 text-sm rounded-2xl px-4 py-2 ${
                ratings.includes(option) ? "bg-green-400/75 shadow-lg" : "bg-gray-50"
              }`}
              onClick={() => {
                handleRatingChange(option);
              }}
            >
              {option === 3 && "3 ★"}
              {option === 4 && "4 ★"}
              {option === 5 && "5 ★"}
            </button>
          ))}
          <select
            onChange={handleDistChange}
            className="shadow-lg focus:outline-none bg-green-400/75 text-gray-900 text-sm rounded-2xl pl-2 py-2"
          >
            <option value="1000">1 km</option>
            <option value="500">500 m</option>
            <option value="2000">2 km</option>
          </select>
        </div>
        <div className="flex flex-row space-x-4">
          {priceOptions.map((option) => (
            <button
              key={option}
              className={`text-gray-900 text-sm rounded-2xl px-4 py-2 ${
                prices.includes(option) ? "bg-green-400/75 shadow-lg" : "bg-gray-50 "
              }`}
              onClick={() => {
                handlePriceChange(option);
              }}
            >
              {option === "PRICE_LEVEL_INEXPENSIVE" && "$"}
              {option === "PRICE_LEVEL_MODERATE" && "$$"}
              {option === "PRICE_LEVEL_EXPENSIVE" && "$$$"}
              {option === "PRICE_LEVEL_VERY_EXPENSIVE" && "$$$$"}
            </button>
          ))}
        </div>
      </div>
      <div className="flex flex-row overflow-x-scroll space-x-2 max-w-80">
        {cuisineOptions.map((option) => (
          <button
            key={option}
            className={`text-gray-900 text-sm rounded-2xl p-2.5 ${
              cuisines.includes(option) ? "bg-green-400/75 shadow-lg" : "bg-gray-50 "
            }`}
            onClick={() => {
              handleCuisineChange(option);
            }}
          >
            {option.replace("_restaurant", "")}
          </button>
        ))}
      </div>
    </div>
  );
}
