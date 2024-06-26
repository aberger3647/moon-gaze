import { Header, Conditions, Alerts, Places } from "../components";
import { getConditions, determineMoonPhase } from "../utils";
import { useState } from "react";

export const Home = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    let location = formData.get("location");

    try {
      setLoading(true);
      const conditions = await getConditions(location);
      if (conditions && conditions.resolvedAddress) {
        console.log(conditions);
        setData(conditions);
      } else {
        console.error(`Unexpected data format: ${conditions}`);
      }
    } catch (error) {
      console.error("Error fetching data: ", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />

      <form onSubmit={onSubmit}>
        <label htmlFor="location">Enter location</label>
        <input name="location" id="location"></input>
        <button type="submit">Submit</button>
      </form>
      {loading ? (
        <p>Loading...</p>
      ) : data ? (
        <>
          <h2>{determineMoonPhase(data.days[0].moonphase)}</h2>
          <h2>{data.resolvedAddress}</h2>

          <Conditions data={data} />
          <Alerts location={data.resolvedAddress} />
  <Places location={data.resolvedAddress} />
        </>
      ) : null }
    </>
  );
};
