const convertToKilometers = (distanceInMeters) => {
  const distanceInKilometers = distanceInMeters * 0.001;
  return distanceInKilometers;
}

const convertToMiles = (distanceInMeters) => {
  const distanceInMiles = distanceInMeters * 0.000621371
  return distanceInMiles;
}

export const calculateDistance = async (origin, destination) => {
  const url = `/api/distance?origins=${origin}&destinations=${destination}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    // Check if the response is JSON
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      const result = await response.json();
      // console.log("distance api result: ", result);
      const distanceInMeters = result.rows[0].elements[0].distance.value;
      console.log("distance in m: ", distanceInMeters)
      console.log("distance in km: ", convertToKilometers(distanceInMeters))
      console.log("distance in miles: ", convertToMiles(distanceInMeters))
    } else {
      throw new Error("Received non-JSON response");
    }
  } catch (error) {
    console.error("Error fetching data: ", error);
  }
};
