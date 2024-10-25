export const calculateDistance = async () => {
  const origin = "37.7576928,-122.4788853"; // San Francisco 
  const destination = "34.0200374,-118.7420562"; // Los Angeles
  // const origin = 'Miami'
  // const destination = 'Boston'

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
      console.log("url: ", url);
      console.log("distance: ", result);
    } else {
      throw new Error("Received non-JSON response");
    }
  } catch (error) {
    console.error("Error fetching data: ", error);
  }
};
