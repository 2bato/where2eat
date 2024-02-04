import { useState } from "react";

interface filterProps {
  onFilterChange: (rating: number, price: string, cuisine: string) => void;
}

export default function Filters({ onFilterChange }: filterProps) {
  const [rating, setRating] = useState<number>(0);
  const [price, setPrice] = useState<string>("");
  const [cuisine, setCuisine] = useState<string>("");

  const handleRatingChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newRating: number = parseInt(event.target.value, 10);
    setRating(newRating);
    onFilterChange(newRating, price, cuisine);
  };

  const handlePriceChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newPrice: string = event.target.value;
    setPrice(newPrice);
    onFilterChange(rating, newPrice, cuisine);
  };

  const handleCuisineChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newCuisine: string = event.target.value;
    setCuisine(newCuisine);
    onFilterChange(rating, price, newCuisine);
  };

  return (
    <div>
      <label htmlFor="rating">Rating:</label>
      <select
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        id="rating"
        value={rating}
        onChange={handleRatingChange}
      >
        <option value={3}>3</option>
        <option value={4}>4</option>
        <option value={5}>5</option>
      </select>

      <label htmlFor="price">Price:</label>
      <select
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        id="price"
        value={price}
        onChange={handlePriceChange}
      >
        <option value={"PRICE_LEVEL_INEXPENSIVE"}>$</option>
        <option value={"PRICE_LEVEL_MODERATE"}>$$</option>
        <option value={"PRICE_LEVEL_EXPENSIVE"}>$$$</option>
        <option value={"PRICE_LEVEL_VERY_EXPENSIVE"}>$$$$</option>
      </select>

      <label htmlFor="cuisine">Cuisine:</label>
      <select
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        id="cuisine"
        value={cuisine}
        onChange={handleCuisineChange}
      >
        <option value="thai_restaurant">Thai</option>
        <option value="chinese_restaurant">Chinese</option>
        <option value="italian_restaurant">Italian</option>
        <option value="mexican_restaurant">Mexican</option>
        <option value="japanese_restaurant">Japanese</option>
        <option value="indian_restaurant">Indian</option>
      </select>
    </div>
  );
}
