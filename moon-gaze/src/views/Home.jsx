import { Link } from "react-router-dom";
import { Header, SearchCity } from "../components";
export const Home = () => {

  return (
    <>
      <Header />
      <h2>Waxing Crescent</h2>
      <SearchCity />

      <h2>Location</h2>
      <h3>
        <Link to="/conditions">Conditions</Link>
      </h3>
      <h3>
        <Link to="/places">Places</Link>
      </h3>
      <h3>
        <Link to="/alerts">Alerts</Link>
      </h3>
    </>
  );
};
