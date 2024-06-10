export const Conditions = ({ conditions }) => {
  return (
    <>
      <h2>Conditions</h2>
      <p>Sunset: 8:15 pm</p>
      <p>Cloudiness: {conditions.weather[0].description}</p>
      <p>Precipitation: 18%</p>
    </>
  );
};
