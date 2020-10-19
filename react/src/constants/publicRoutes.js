import { lazy } from "react";

const publicRoutes = [
  {
    path: "/contact",
    exact: true,
    roles: [],
    isAnonymous: true,
    component: lazy(() => import("./../components/pages/Maintenance")),
  },
  {
    path: "/login",
    exact: true,
    roles: [],
    isAnonymous: true,
    component: lazy(() => import("./../components/pages/Login")),
  },
  {
    path: "/logout",
    exact: true,
    roles: [],
    isAnonymous: true,
    component: lazy(() => import("./../components/pages/Logout")),
  },
  {
    path: "/register",
    exact: true,
    roles: [],
    isAnonymous: true,
    component: lazy(() => import("./../components/pages/Register")),
  },
  {
    path: "/confirm",
    exact: true,
    roles: [],
    component: lazy(() => import("./../components/pages/PleaseConfirm")),
  },
  {
    path: "/confirm/:token",
    exact: true,
    roles: [],
    component: lazy(() => import("./../components/pages/EmailConfirm")),
  },
  {
    path: "/maintenance",
    exact: true,
    roles: [],
    component: lazy(() => import("./../components/pages/Maintenance")),
  },
  {
    path: "/initial/:id/setup",
    exact: true,
    roles: ["SystemAdmin", "Organization", "Independent"],
    isAnonymous: true,
    component: lazy(() => import("./../components/initialSetup/ProfileSetup")),
  },
  {
    path: "/aboutUs",
    exact: true,
    roles: [],
    isAnonymous: true,
    component: lazy(() => import("./../components/pages/AboutUs")),
  },
  {
    path: "/verify",
    exact: true,
    roles: [],
    isAnonymous: true,
    component: lazy(() => import("./../components/pages/ForgotPassword")),
  },
  {
    path: "/reset/:token",
    exact: true,
    roles: [],
    isAnonymous: true,
    component: lazy(() => import("./../components/pages/ResetPassword")),
  },
  {
    path: "/contactus",
    exact: true,
    roles: [],
    isAnonymous: true,
    component: lazy(() => import("./../components/pages/ContactUsForm")),
  },
];

export default publicRoutes;
