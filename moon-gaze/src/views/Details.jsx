import { Header, Conditions, Alerts, Places } from "../components";
import { useLocation } from "react-router-dom";

export const Details = () => {
  let data = useLocation().state;
  console.log("details", data);
  return (
    <>
      <Header />
      <h2>{data.resolvedAddress}</h2>
      {/* <h3>{data.}</h3> */}

      <Conditions data={data} />
      {/* <Alerts location={data} />
      <Places location={data} /> */}
    </>
  );
};
