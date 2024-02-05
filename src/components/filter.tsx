import { useState } from "react";

interface filterProps {
  onFilterChange: (rating: number, price: string, cuisine: string) => void;
}

export default function Filters({ onFilterChange }: filterProps) {
  const [rating, setRating] = useState<number>(0);
  const [price, setPrice] = useState<string>("");
  const [cuisine, setCuisine] = useState<string>("");

  const handleRatingChange = (newRating: number) => {
    setRating(newRating);
    onFilterChange(newRating, price, cuisine);
  };

  const handlePriceChange = (newPrice: string) => {
    setPrice(newPrice);
    onFilterChange(rating, newPrice, cuisine);
  };

  const handleCuisineChange = (newCuisine: string) => {
    setCuisine(newCuisine);
    onFilterChange(rating, price, newCuisine);
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
    "sushi_restaurant",
    "sushi_restaurant",
    "sushi_restaurant",
    "sushi_restaurant",
    "sushi_restaurant",
    "sushi_restaurant",
    "sushi_restaurant",
    "sushi_restaurant",
    "sushi_restaurant",
    "sushi_restaurant",
    "sushi_restaurant",
    "sushi_restaurant",
    "sushi_restaurant",
    "sushi_restaurant",
  ];
  return (
    <div className="flex flex-col items-center mb-8 space-y-2">
      <div className="space-y-2">
        <div className="flex flex-row space-x-2">
          {ratingOptions.map((option) => (
            <button
              key={option}
              className={`text-black text-sm rounded-2xl px-5 py-2 ${
                rating === option ? "bg-blue-500" : "bg-gray-50"
              }`}
              onClick={() => handleRatingChange(option)}
            >
              {option === 3 && "3 ★"}
              {option === 4 && "4 ★"}
              {option === 5 && "5 ★"}
            </button>
          ))}
        </div>
        <div className="flex flex-row justify-between">
          {priceOptions.map((option) => (
            <button
              key={option}
              className={`text-gray-900 text-sm rounded-2xl px-3 py-2 ${
                price === option ? "bg-blue-500" : "bg-gray-50 "
              }`}
              onClick={() => handlePriceChange(option)}
            >
              {option === "PRICE_LEVEL_INEXPENSIVE" && "$"}
              {option === "PRICE_LEVEL_MODERATE" && "$$"}
              {option === "PRICE_LEVEL_EXPENSIVE" && "$$$"}
              {option === "PRICE_LEVEL_VERY_EXPENSIVE" && "$$$$"}
            </button>
          ))}
        </div>
      </div>
      <div className="flex flex-row overflow-x-scroll max-w-80">
        {cuisineOptions.map((option) => (
          <button
            key={option}
            className={`border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5 focus:ring-blue-500 focus:border-blue-500 ${
              cuisine === option ? "bg-blue-500" : "bg-gray-50 "
            }`}
            onClick={() => handleCuisineChange(option)}
          >
            {option.replace("_restaurant", "")}
          </button>
        ))}
      </div>
    </div>
  );
}
