import { Miles } from ".";

export const Places = ({ location, sortedPlaces, userCoords }) => {
  console.log("sortedPlaces", sortedPlaces);
  const nearbyPlaces = sortedPlaces.filter(place => {
    return place.distance < 150;
  });

  console.log("nearbyPlaces", nearbyPlaces);

  return (
    <>
      <h2>Dark Sky Places</h2>
      <p>
        Within{" "}
        <span>
          <Miles />
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
