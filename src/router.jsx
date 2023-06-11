
import {
  createBrowserRouter,
} from "react-router-dom";

import ProtectedRoute from "./components/ProtectedRoute";
import AnonymousRoute from "./components/AnonymousRoute";
import ErrorPage from "./components/ErrorPage";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import Main from "./components/Main";
import Dashboard from "./components/Dashboard";
import CreateOrder from "./components/CreateOrder";
import Orders from "./components/Orders";
import Order from "./components/Order";

const router = createBrowserRouter([
  {
    path: "/",
    element: <ProtectedRoute><Main /></ProtectedRoute>,
    errorElement: <ErrorPage />,
    children: [
      {
        path: 'dashboard',
        element: <Dashboard />
      },
      {
        path: 'create-order',
        element: <CreateOrder />
      },
      {
        path: 'orders/:id',
        element: <Order />
      },
      {
        path: 'orders',
        element: <Orders />
      }
    ]
  },
  {
    path: "signin",
    element: <AnonymousRoute><SignIn /></AnonymousRoute>,
  },
  {
    path: "signup",
    element: <AnonymousRoute><SignUp /></AnonymousRoute>,
  },
]);

export default router;