import { Link } from "react-router-dom";
import { Header } from "../components";

export const Home = () => {
  return (
    <>
      <Header />
      <h2>Waxing Crescent</h2>
      <form>
          <input placeholder='Enter location'></input>
          <button type='submit'>Submit</button>
          </form>
      <h3>
        <Link to="/conditions" location={location}>Conditions</Link>
      </h3>
      <h3>
        <Link to="/places" location={location}>Places</Link>
      </h3>
      <h3>
        <Link to="/alerts" location={location}>Alerts</Link>
      </h3>
    </>
  );
};
