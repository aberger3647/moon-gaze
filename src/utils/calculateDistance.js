export const calculateDistance = async (origin, destination) => {
  const url = `/api/distance?origins=${encodeURIComponent(origin)}&destinations=${encodeURIComponent(destination)}`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      }
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP error! Status: ${response.status}, ${errorText}`);
    }

    const distance = await response.json();
    // console.log("Distance received:", distance);
    return distance;
  } catch (error) {
    console.error("Error calculating distance:", error);
    return null;
  }
};