interface displayName {
  text: string;
  languageCode: string;
}
interface Place {
  displayName: displayName;
  rating: number;
  priceLevel: string;
  businessStatus: any;
  types: any;
  photos: any;
}

interface Result {
  displayName: string;
  photoUrl: string;
  rating: number;
}

export default async function NearbySearch(
  cuisine: string,
  rating: number,
  price: string
): Promise<Result> {
  const apiKey = "AIzaSyAXpRKeA6lCOiYOwwnJbx7j9GUvBig8MLw";
  const request = {
    includedTypes: [cuisine],
    maxResultCount: 10,
    locationRestriction: {
      circle: {
        center: {
          latitude: 49.27911615277976,
          longitude: -123.12473485914015,
        },
        radius: 800.0,
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
    const filteredData = placesData.filter(
      (place) => place.rating >= rating && place.priceLevel === price
    );

    const randomIndex = Math.floor(Math.random() * filteredData.length);

    console.log(filteredData);
    let photoReference = filteredData[randomIndex].photos[0].name;
    const index = photoReference.indexOf("photos/");
    photoReference = photoReference.substring(index + "photos/".length);
    const imageURL = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photoReference}&key=${apiKey}`;

    const result: Result = {
      displayName: filteredData[randomIndex].displayName.text,
      photoUrl: imageURL,
      rating: filteredData[randomIndex].rating,
    };

    return result;
  } catch (error) {
    console.error("Error fetching nearby places:", error);
    throw error;
  }
}
