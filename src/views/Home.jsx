import { Conditions, Alerts, Places } from "../components";
import {
  getConditions,
  determineMoonPhase,
  convertToCamelCase,
  calculateDistance,
} from "../utils";
import { useState } from "react";
import placesCoords from "../places/placesCoords.json";

export const Home = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [moonPhase, setMoonPhase] = useState("");
  const [userCoords, setUserCoords] = useState("0,0");

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    let location = formData.get("location");

    try {
      setLoading(true);
      const conditions = await getConditions(location);

      if (conditions && conditions.resolvedAddress) {
        setData(conditions);
        const currentCoords = `${conditions.latitude},${conditions.longitude}`;
        // console.log("Current coordinates:", currentCoords);
        // console.log("Places coordinates:", placesCoords);
        setUserCoords(currentCoords);
        setMoonPhase(determineMoonPhase(conditions.days[0].moonphase));
       
        console.log("user coords", userCoords, "current coords", currentCoords);
       
        const distances = [];
        for (let i = 0; i < 1; i++) {
          console.log(`${i}. Current coord:`, placesCoords[i].coords);
          // compare user's coords to every Place's coords in ../places/placesCoords.json
          // console.log("placesCoords[i].coords", placesCoords[i].coords);
          // const distance = await calculateDistance(
          //   currentCoords,
          //   placesCoords[i].coords
          // );

          const distance = await calculateDistance(
           '37.7576928,-122.4788853', '34.0200374,-118.7420562'
          );

          console.log(`${i}. Distance:`, distance);

          if (distance !== null) {
            distances.push(distance);
          } else {
            console.log(`Failed to calculate distance for coords ${i}`);
          }
        }
        // sort Places by distance to user's coords, from least to most
        // filter list by distance eg: <5, <25, <50
        // console.log(distances);
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
