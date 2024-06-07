// const {REACT_APP_OPEN_WEATHER_API_KEY} = process.env

export const SearchCity = () => {
  const apiKey = process.env.REACT_APP_OPEN_WEATHER_API_KEY;
 

  async function getConditions(location) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}`;
    console.log("url", url)
    const response = await fetch(url, {
      method: "POST",
      body: location,
    });
    const data = await response.json();
    console.log("data", data);
    return data;
  }

  const onSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const location = formData.get("location");
    getConditions(location);
    console.log("apikey", apiKey);
  };

  return (
    <form onSubmit={onSubmit}>
      <label htmlFor="location">Enter location</label>
      <input name="location" id="location"></input>
      <button type="submit">Submit</button>
    </form>
  );
};
