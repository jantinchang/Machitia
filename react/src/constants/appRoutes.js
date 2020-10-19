import { lazy } from "react";

const blogRoutes = [
  {
    path: "/blogs",
    exact: true,
    roles: ["SystemAdmin", "Organization", "Independent", "Anonymous"],
    isAnonymous: true,
    component: lazy(() => import("./../components/blogs/BlogList")),
  },
  {
    path: "/blog/:id(\\d+)/edit",
    exact: true,
    roles: ["SystemAdmin", "Organization", "Independent"],
    isAnonymous: false,
    component: lazy(() => import("./../components/blogs/Blogform")),
  },
  {
    path: "/blog/create",
    exact: true,
    roles: ["SystemAdmin", "Organization", "Independent"],
    isAnonymous: false,
    component: lazy(() => import("./../components/blogs/Blogform")),
  },
  {
    path: "/blogs/:id(\\d+)/details",
    exact: true,
    roles: ["SystemAdmin", "Organization", "Independent", "Anonymous"],
    isAnonymous: true,
    component: lazy(() => import("./../components/blogs/BlogSingle")),
  },
];
const dashboards = [
  {
    path: "/dashboard",
    exact: true,
    roles: ["SystemAdmin"],
    isAnonymous: true,
    component: lazy(() => import("./../components/dashboard/Admin")),
  },
  {
    path: "/organization/:id(\\d+)/dashboard",
    exact: true,
    roles: ["Organization"],
    isAnonymous: true,
    component: lazy(() => import("./../components/dashboard/Organization")),
  },
  {
    path: "/independent/:id(\\d+)/dashboard",
    exact: true,
    roles: ["Independent"],
    isAnonymous: false,
    component: lazy(() => import("./../components/dashboard/Independent")),
  },
];
const comments = [
  {
    path: "/comments/create",
    exact: true,
    roles: ["Independent", "Organization"],
    isAnonymous: false,
    component: lazy(() =>
      import("./../components/common/comments/CommentForm")
    ),
  },
  {
    path: "/comments/:id(\\d+)/edit",
    exact: true,
    roles: ["Independent", "Organization"],
    isAnonymous: false,
    component: lazy(() =>
      import("./../components/common/comments/CommentForm")
    ),
  },
  {
    path: "/comments",
    exact: true,
    roles: ["Independent", "Organization", "SystemAdmin"],
    isAnonymous: false,
    component: lazy(() => import("./../components/common/comments/Comments")),
  },
];
const groups = [
  {
    path: "/groups",
    exact: true,
    roles: ["Independent", "Organization", "SystemAdmin"],
    isAnonymous: false,
    component: lazy(() => import("./../components/groups/Groups")),
  },
  {
    path: "/groups/create",
    exact: true,
    roles: ["Independent", "Organization"],
    isAnonymous: false,
    component: lazy(() => import("./../components/groups/GroupForm")),
  },
  {
    path: "/groups/:id(\\d+)/edit",
    exact: true,
    roles: ["Independent", "Organization"],
    isAnonymous: false,
    component: lazy(() => import("./../components/groups/GroupForm")),
  },
  {
    path: "/groups/:id(\\d+)",
    exact: true,
    roles: ["Independent", "Organization", "SystemAdmin"],
    isAnonymous: false,
    component: lazy(() => import("./../components/groups/GroupPage")),
  },
];
const locationRoutes = [
  {
    path: "/locations",
    exact: true,
    roles: ["SystemAdmin", "Organization"],
    isAnonymous: true,
    component: lazy(() => import("./../components/locations/LocationList")),
  },
  {
    path: "/locations/create",
    exact: true,
    roles: ["SystemAdmin", "Organization"],
    isAnonymous: true,
    component: lazy(() => import("./../components/locations/LocationAddForm")),
  },
  {
    path: "/locations/:id(\\d+)/edit",
    exact: true,
    roles: ["SystemAdmin", "Organization"],
    isAnonymous: true,
    component: lazy(() => import("./../components/locations/LocationAddForm")),
  },
];

const organization = [
  {
    path: "/organization/:id(\\d+)/edit",
    exact: true,
    roles: ["Organization"],
    isAnonymous: true,
    component: lazy(() =>
      import("./../components/organizations/OrganizationForm")
    ),
  },
  {
    path: "/organization/create",
    exact: true,
    roles: ["Organization"],
    isAnonymous: true,
    component: lazy(() =>
      import("./../components/organizations/OrganizationForm")
    ),
  },
  {
    path: "/organizations",
    exact: true,
    roles: ["Organization", "SystemAdmin", "Independent", "Anonymous"],
    isAnonymous: true,
    component: lazy(() =>
      import("./../components/organizations/OrganizationsList")
    ),
  },
  {
    path: "/organizations/:id(\\d+)/details",
    exact: true,
    roles: ["Organization", "SystemAdmin", "Independent"],
    isAnonymous: true,
    component: lazy(() =>
      import("./../components/organizations/OrganizationView")
    ),
  },
];

const messages = [
  {
    path: "/messages",
    exact: true,
    roles: ["Independent", "Organization", "SystemAdmin"],
    isAnonymous: true,
    component: lazy(() => import("./../components/messages/ChatPage")),
  },
];

const userProfiles = [
  {
    path: "/userProfiles",
    exact: true,
    roles: ["SystemAdmin"],
    isAnonymous: true,
    component: lazy(() => import("./../components/userProfiles/UserProfiles")),
  },
  {
    path: "/userProfiles/create",
    exact: true,
    roles: ["Organization", "Independent"],
    isAnonymous: true,
    component: lazy(() =>
      import("./../components/userProfiles/UserProfileForm")
    ),
  },
  {
    path: "/userProfiles/:id(\\d+)/edit",
    exact: true,
    roles: ["Organization", "Independent"],
    isAnonymous: true,
    component: lazy(() =>
      import("./../components/userProfiles/UserProfileForm")
    ),
  },
];

const plans = [
  {
    path: "/plans",
    exact: true,
    roles: ["Independent", "Organization", "SystemAdmin"],
    isAnonymous: true,
    component: lazy(() => import("./../components/plans/PlanGrid")),
  },
  {
    path: "/plan/:id(\\d+)/detail",
    exact: false,
    roles: ["Independent", "Organization", "SystemAdmin"],
    isAnonymous: true,
    component: lazy(() => import("./../components/plans/ViewPlan2")),
  },
  {
    path: "/plans/create",
    exact: true,
    roles: ["Independent", "Organization"],
    isAnonymous: true,
    component: lazy(() => import("./../components/plans/PlanStepperForm")),
  },
  {
    path: "/plans/:id(\\d+)/edit",
    exact: false,
    roles: ["Independent", "Organization"],
    isAnonymous: true,
    component: lazy(() => import("./../components/plans/PlanStepperForm")),
  },
];

const feed = [
  {
    path: "/feed",
    exact: true,
    roles: ["Independent", "Organization", "SystemAdmin"],
    isAnonymous: true,
    component: lazy(() => import("./../components/feed/FeedList")),
  }
];

const appRoutes = [
  ...blogRoutes,
  ...dashboards,
  ...userProfiles,
  ...locationRoutes,
  ...organization,
  ...groups,
  ...comments,
  ...messages,
  ...plans,
  ...feed,
];
export default appRoutes;
