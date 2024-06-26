import { Link } from "react-router-dom";

export const NotFound = () => {
  return (
    <>
      <p>404 not found</p>
      <Link to="/">Go Back Home</Link>
    </>
  );
};
