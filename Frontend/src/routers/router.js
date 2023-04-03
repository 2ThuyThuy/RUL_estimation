import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login/Login";

const publicRoutes = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/auth/login", element: <Login /> },
]);

const privateRoutes = [];

export { publicRoutes, privateRoutes };
