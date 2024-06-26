import { useNavigate } from "react-router-dom";

export const SearchCity = () => {
  const apiKey = process.env.REACT_APP_VISUAL_CROSSING_API_KEY;
  const navigate = useNavigate();

  async function getConditions(location) {
    const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/?key=${apiKey}`;
    
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error. Status: ${response.status}`);
      }
      const data = await response.json();
      // console.log('search', data)
      return data;
  }
  catch (error) {
    console.error('There was a problem fetching the data: ', error);
    throw error;
  }
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    let location = formData.get("location");
    try {
      const data = await getConditions(location);
      if (data && data.resolvedAddress) {
        navigate(`details/${location}`, { state: data });
      } else {
        console.error(`Unexpected data format: ${data}`)
      }
    } catch (error) {
      console.error('Error fetching data: ', error);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <label htmlFor="location">Enter location</label>
      <input name="location" id="location"></input>
      <button type="submit">Submit</button>
    </form>
  );
};
