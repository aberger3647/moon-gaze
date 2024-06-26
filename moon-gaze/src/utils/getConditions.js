const apiKey = process.env.REACT_APP_VISUAL_CROSSING_API_KEY;

 export async function getConditions(location) {
    const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/?key=${apiKey}`;
    
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error. Status: ${response.status}`);
      }
      const data = await response.json();
      return data;
  }
  catch (error) {
    console.error('There was a problem fetching the data: ', error);
    throw error;
  }
  }