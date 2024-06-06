import { Header } from "../components";

export const Alerts = () => {
    return(
      <>
      <Header />
        <h2>Email Alerts</h2>
        <p>Email me when moon-gazing conditions are optimal for</p>
        <h2>Austin</h2>
        <form>
          <input placeholder='hello@email.com'></input>
          <button type='submit'>Submit</button>
          </form>
      </>
    );
  };
  