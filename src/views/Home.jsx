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
  const [sortedPlaces, setSortedPlaces] = useState([]);

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
        setUserCoords(currentCoords);
        setMoonPhase(determineMoonPhase(conditions.days[0].moonphase));

        const distanceArr = [];
        for (let i = 0; i < placesCoords.length; i++) {
          if (typeof placesCoords[i].coords !== "string") {
            console.error("Invalid coords format:", placesCoords[i].coords);
            continue;
          }

          const originCoords = currentCoords.trim().replace(/['"]/g, "");
          const destCoords = placesCoords[i].coords.trim().replace(/['"]/g, "");
          const distance = await calculateDistance(originCoords, destCoords);

          if (distance !== null) {
            distanceArr.push({
              placeName: placesCoords[i].placeName,
              category: placesCoords[i].category,
              distance: distance,
            });
          } else {
            console.log(`Failed to calculate distance for coords ${i}`);
          }
        }
        // sort Places by distance to user's coords, from least to most
        // filter list by distance eg: <5, <25, <50
        console.log("distanceArr", distanceArr);
        const sorted = distanceArr.sort((a, b) => a.distance - b.distance);
        console.log("sorted places with distances", sorted.map(place => ({
          name: place.placeName,
          distance: place.distance,
          category: place.category
        })))
        setSortedPlaces(sorted);
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
          <Places location={data.resolvedAddress} sortedPlaces={sortedPlaces} userCoords={userCoords} />
          <Alerts location={data.resolvedAddress} />
        </>
      ) : null}
    </main>
  );
};
