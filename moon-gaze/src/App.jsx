import "./App.css";
import { Home, Details } from "./views";
import { NotFound } from "./utils";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
      errorElement: <NotFound />,
    },
    {
      path: "/details/:location",
      element: <Details />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
