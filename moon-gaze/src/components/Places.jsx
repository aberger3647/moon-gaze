import { Miles } from ".";

export const Places = ({location}) => {
    return(
      <>
      <h2>Dark Sky Places</h2>
      <p>Within <span><Miles /></span> miles of <span>{location}</span></p>

      <h4>Dripping Springs</h4>
      <p>Community</p>
    </>  
    )
  };
  