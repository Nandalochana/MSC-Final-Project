import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import ErrorPage from "./error-page";
import { PrivateRoute, PublicRoute } from "./route-guard";
import { Routes } from "../lib/utils/routes-constants";
import { Login } from "../pages/Login/Login";
import { Register } from "../pages/Register/Register";
import { Home } from "../pages/Home/Home";
import { Freelancer } from "../pages/Dashboard/Freelancer/Freelancer";
import { Buyer } from "../pages/Dashboard/Buyer/Buyer";
import { RoleBasedRoute } from "./RoleBasedRoute";
import CategoriesPage from "../pages/ProfileManager/page";
import SellerProfileView from "../pages/Dashboard/Buyer/SellerProfileView";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: Routes.PROFILE,
        element: (
          <PrivateRoute>
            <h1>Profile Page</h1>
          </PrivateRoute>
        ),
      },
      {
        path: Routes.FREELANCER,
        element: (
          <RoleBasedRoute allowedRole="Freelancer">
            <Freelancer />
          </RoleBasedRoute>
        ),
      },
      {
        path: Routes.PROFILES,
        element: (
          <RoleBasedRoute allowedRole="Freelancer">
            <CategoriesPage />
          </RoleBasedRoute>
        ),
      },
      {
        path: Routes.BUYER,
        element: (
          <RoleBasedRoute allowedRole="Buyer">
            <Buyer />
          </RoleBasedRoute>
        ),
      },
      {
        path: Routes.FREELANCER_DETAILS,
        element: (
          <RoleBasedRoute allowedRole="Buyer">
            <SellerProfileView />
          </RoleBasedRoute>
        ),
      },
      {
        path: Routes.SIGNUP,
        element: (
          <PublicRoute>
            <Register />
          </PublicRoute>
        ),
      },
      {
        path: Routes.SIGNIN,
        element: (
          <PublicRoute>
            <Login />
          </PublicRoute>
        ),
      }
    ]
  }
]);
