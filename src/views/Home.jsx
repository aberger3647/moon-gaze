import { Conditions, Alerts, Places } from "../components";
import {
  getConditions,
  determineMoonPhase,
  convertToCamelCase,
  calculateDistance
} from "../utils";
import { useState } from "react";

export const Home = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [moonPhase, setMoonPhase] = useState("");
  const [userCoords, setUserCoords] = useState('0,0')

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    let location = formData.get("location");

    try {
      setLoading(true);
      const conditions = await getConditions(location);
      if (conditions && conditions.resolvedAddress) {
        setData(conditions);
        setUserCoords(`${conditions.latitude}, ${conditions.longitude}` )
        setMoonPhase(determineMoonPhase(conditions.days[0].moonphase));
        // calculateDistance(userCoords, '34.0200374,-118.7420562');
        console.log("user coords", userCoords)
        // user coords to string
        calculateDistance(userCoords, '34.0200374,-118.7420562');
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
    <main>
      <h1>Moon Phase</h1>

      <form onSubmit={onSubmit}>
        <label htmlFor="location">Enter location</label>
        <input name="location" id="location" placeholder="city"></input>
        <button type="submit">Submit</button>
      </form>
      {loading ? (
        <p>Loading...</p>
      ) : data ? (
        <>
          <img
            src={`./moon/${convertToCamelCase(moonPhase)}.svg`}
            width="200px"
            height="200px"
            alt={moonPhase}
          />
          <h2>{moonPhase}</h2>
          <h2>{data.resolvedAddress}</h2>

          <Conditions data={data} />
          <Places location={data.resolvedAddress} />
          <Alerts location={data.resolvedAddress} />
        </>
      ) : null}
    </main>
  );
};
