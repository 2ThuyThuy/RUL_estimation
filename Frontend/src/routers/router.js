import { createBrowserRouter } from "react-router-dom";
import Admin from "../pages/Admin/Admin";
import Test from "../pages/Admin/Test";
import Home from "../pages/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import CalendarAdmin from "../pages/Admin/CalendarAdmin";
import AdminDataRaw from "../pages/Admin/AdminDataRaw";
import AdminDataProcessed from "../pages/Admin/AdminDataProcessed"
import UserDashboard from "../pages/User/UserDashboard"

const publicRoutes = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/auth/login", element: <Login /> },
  { path: "/auth/register", element: <Register /> },
  { path: "/admin", element: <Admin /> },
  { path: "/test", element: <Test /> },
  { path: "/admin/calendar", element: <CalendarAdmin />},
  { path: "/admin/data_raw", element: <AdminDataRaw />},
  { path: "/admin/data_processed", element: <AdminDataProcessed />},
  { path: "/user/userdashboard", element: <UserDashboard />}
]);

const privateRoutes = [];

export { publicRoutes, privateRoutes };
