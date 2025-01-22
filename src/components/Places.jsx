import {useState} from 'react'

export const Places = ({ location, sortedPlaces, userCoords }) => {
const [selectedMiles, setSelectedMiles] = useState("100")
console.log(selectedMiles)
  console.log("sortedPlaces", sortedPlaces);
  const nearbyPlaces = sortedPlaces.filter(place => {
    return place.distance < selectedMiles;
  });

  console.log("nearbyPlaces", nearbyPlaces);

  return (
    <>
      <h2>Dark Sky Places</h2>
      <p>
        Within{" "}
        <span>
        <select onChange={(e) => setSelectedMiles(e.target.value)} defaultValue={100}>
        <option value="25">25</option>
        <option value="50">50</option>
        <option value="100">100</option>
        <option value="500">500</option>
      </select>
        </span>{" "}
        miles of <span>{location}</span>
      </p>

      {nearbyPlaces.map((place, index) => (
        <>
        <div key={index} className='place'>
          <p>{place.placeName}</p>
          <p>{place.category}</p>
          <p>{`Distance: ${place.distance.toFixed(1)} miles`}</p>
        </div>
        <hr/>
        </>
      ))}
    </>
  );
};
