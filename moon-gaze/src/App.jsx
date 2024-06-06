import './App.css';
import { Home, Conditions, Places, Alerts} from './views';
import { NotFound } from './utils';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

function App() {
  const router = createBrowserRouter([{
    path: '/',
    element: <Home />,
    errorElement: <NotFound />
  },
  {
    path: '/conditions',
    element: <Conditions />
  },
  {
    path: '/places',
    element: <Places />
  },
  {
    path: '/alerts',
    element: <Alerts />
  }
]);


  return (
    <RouterProvider router={router} />
  );
}

export default App;
