import { useNavigate } from "react-router-dom";

export const SearchCity = () => {
  const apiKey = process.env.REACT_APP_OPEN_WEATHER_API_KEY;
  const navigate = useNavigate();

  async function getConditions(location) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}`;
    const response = await fetch(url, {
      method: "POST",
      body: location,
    });
    const data = await response.json();
    // console.log("data", data);
    return data;
  }

  const onSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const location = formData.get("location");
    getConditions(location).then((data) => {
      if (data.cod == 200) {
        navigate(`details/${location}`, { state: data  });
      }
    });
  };

  return (
    <form onSubmit={onSubmit}>
      <label htmlFor="location">Enter location</label>
      <input name="location" id="location"></input>
      <button type="submit">Submit</button>
    </form>
  );
};
