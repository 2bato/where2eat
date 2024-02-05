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
  rating: string;
  success: boolean;
}

interface Location {
  latitude: number;
  longitude: number;
}

export default async function NearbySearch(
  cuisine: string[],
  rating: number[],
  price: string[],
  location: Location | null,
  dist: number
): Promise<Result> {
  let includedTypes;
  if (cuisine.length === 0) {
    includedTypes = ["restaurant"];
  } else {
    includedTypes = cuisine;
  }
  const apiKey = "AIzaSyAXpRKeA6lCOiYOwwnJbx7j9GUvBig8MLw";
  const request = {
    includedTypes: includedTypes,
    maxResultCount: 20,
    locationRestriction: {
      circle: {
        center: {
          latitude: location?.latitude,
          longitude: location?.longitude,
        },
        radius: dist,
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
    let filteredData: Place[] = placesData;
    console.log(price);
    if (price.length !== 0) {
      filteredData = filteredData.filter(
        (place) => place.priceLevel && price.includes(place.priceLevel)
      );
    }

    if (rating.length !== 0) {
      filteredData = filteredData.filter(
        (place) => place.rating >= Math.min(...rating)
      );
    }

    const randomIndex = Math.floor(Math.random() * filteredData.length);

    console.log(filteredData);
    let photoReference = filteredData[randomIndex].photos[0].name;
    const index = photoReference.indexOf("photos/");
    photoReference = photoReference.substring(index + "photos/".length);
    const imageURL = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photoReference}&key=${apiKey}`;

    const result: Result = {
      displayName: filteredData[randomIndex].displayName.text,
      photoUrl: imageURL,
      rating: filteredData[randomIndex].rating.toString(),
      success: true,
    };
    return result;
  } catch (error) {
    console.error("Error fetching nearby places:", error);
    const result: Result = {
      displayName: "Too picky :((",
      photoUrl: "https://media1.tenor.com/m/t7_iTN0iYekAAAAd/sad-sad-cat.gif",
      rating: "",
      success: false,
    };
    return result;
  }
}
