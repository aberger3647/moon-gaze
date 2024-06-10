import { Header, Conditions, Alerts, Places } from "../components";
import { useLocation } from "react-router-dom";

export const Details = () => {
  let conditions = useLocation().state;
  console.log(conditions);
  return (
    <>
      <Header />
      <h2>Waxing Crescent</h2>

      <h2>{conditions.name}</h2>
      <Conditions conditions={conditions} />
      <Alerts location={conditions.name} />
      <Places location={conditions.name} />
    </>
  );
};
