
import './App.css';
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";

import Home from './pages/Home/Home';
import Profile from "./pages/Profile/Profile";
import Explore from "./pages/Explore/Explore";
import Signin from "./pages/Signin/Signin";
import Signup from "./pages/Signin/Signup";
import Navbar from "./components/Navbar/Navbar";
import Error from "./pages/Error/Error";
const Layout = () => {
  return (
    <div className="md:w-8/12 mx-auto">
      <Navbar />
 
      <Outlet></Outlet>
     
    </div>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <Error />,
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/profile/:id",
        element: <Profile />,
      },
      {
        path: "/explore",
        element: <Explore />,
      },
      {
        path: "/signin",
        element: <Signin />,
      },
      {
        path: "/signin/signup",
        element: <Signup/>,
      },
      {
        path: "/signout",
        element: <Signin />,
      },
    ],
  },
]);

function App() {
  return (
    <div>
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;
