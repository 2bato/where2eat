import { useEffect, useState } from "react";

interface displayName {
  text: string;
  languageCode: string;
}
interface Place {
  displayName: displayName;
  rating: number;
  priceLevel: any;
  businessStatus: any;
  types: any;
  photos: any;
}

export default function NearbySearch() {
  const [places, setPlaces] = useState<Place[]>([]);

  const handleNearbySearch = async () => {
    const apiKey = "AIzaSyAXpRKeA6lCOiYOwwnJbx7j9GUvBig8MLw";

    const request = {
      includedTypes: ["restaurant"],
      maxResultCount: 10,
      locationRestriction: {
        circle: {
          center: {
            latitude: 49.2371968,
            longitude: -123.1618048,
          },
          radius: 500.0,
        },
      },
    };

    try {
      const response = await fetch(
        "https://places.googleapis.com/v1/places:searchNearby",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Goog-Api-Key": apiKey,
            "X-Goog-FieldMask":
              "places.displayName,places.rating,places.priceLevel,places.businessStatus,places.types,places.photos",
          },
          body: JSON.stringify(request),
        }
      );

      if (!response.ok) {
        throw new Error(`${response.status}`);
      }

      const data = await response.json();
      const placesData: Place[] = data.places; 
      setPlaces(placesData);
    } catch (error) {
      console.error("Error fetching nearby places:", error);
    }
  };

  useEffect(() => {
    handleNearbySearch();
  }, []);

  return (
    <div>
      <h2>Nearby Places</h2>
      {places.map((place, index) => (
        <div key={index}>
          <p>{place.displayName.text}</p>
          {/* Render other place information */}
        </div>
      ))}
    </div>
  );
}
