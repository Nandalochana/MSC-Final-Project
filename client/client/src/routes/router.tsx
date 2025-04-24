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
import FreelancerProfileView from "../pages/Dashboard/Buyer/FreelancerProfileView";
import UserProfilePage from "../pages/UserSettings/UserProfilePage";
import { Admin } from "../pages/Dashboard/Admin/Admin";
import TaskPage from "../pages/UserSettings/components/TaskPage";
import TaskDetailPage from "../pages/TaskDetail/TaskDetailPage";
import BookingCalendar from "../pages/BookingCalendar/page";
import PastBookingsPage from "../pages/PastBookings/page";
import UpcommingBookingsPage from "../pages/UpcomingBookings/page";
import { TaskOffered } from "../pages/TaskOffered/page";
import ServicesPage from "../pages/Services/page";
import AboutPage from "../pages/About/page";

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
        path: Routes.CALENDAR,
        element: (
          <RoleBasedRoute allowedRole="Freelancer">
            <BookingCalendar />
          </RoleBasedRoute>
        ),
      },
      {
        path: Routes.TASK_OFFERED,
        element: (
          <PrivateRoute>
            <TaskOffered />
          </PrivateRoute>
        ),
      },
      {
        path: Routes.COMPLTED_BOOKINGS,
        element: (
          <PrivateRoute>
            <PastBookingsPage />
          </PrivateRoute>
        ),
      },
      {
        path: Routes.UPCOMING_BOOKINGS,
        element: (
          <PrivateRoute>
            <UpcommingBookingsPage />
          </PrivateRoute>
        ),
      },
      {
        path: Routes.TASK_DETAIL,
        element: (
          <PrivateRoute>
            <TaskDetailPage />
          </PrivateRoute>
        ),
      },
      {
        path: Routes.TASK_MANAGEMENT,
        element: (
          <RoleBasedRoute allowedRole="Buyer">
            <TaskPage />
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
            <FreelancerProfileView />
          </RoleBasedRoute>
        ),
      },
      {
        path: Routes.ADMIN,
        element: (
          <RoleBasedRoute allowedRole="Admin">
            <Admin />
          </RoleBasedRoute>
        ),
      },
      {
        path: Routes.USER_SETTINGS,
        element: (
          <PrivateRoute>
            <UserProfilePage />
          </PrivateRoute>
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
      },
      {
        path: Routes.SERVICES,
        element: (
          // <PublicRoute>
            <ServicesPage />
          // </PublicRoute>
        ),
      },
      {
        path: Routes.ABOUT,
        element: (
          // <PublicRoute>
            <AboutPage />
          // </PublicRoute>
        ),
      },
    ],
  },
]);
