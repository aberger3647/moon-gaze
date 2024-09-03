import "./App.css";
import { Home, NotFound } from "./views";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
      errorElement: <NotFound />,
    }
  ]);

  return <RouterProvider router={router} />;
}

export default App;
