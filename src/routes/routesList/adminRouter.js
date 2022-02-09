import { lazy } from "react";

const HomePage = lazy(() =>
  import("./../../views/DashboardPage/HomePage/HomePage"),
);

const adminRouter = [
  {
    link: "/",
    component: HomePage,
  },
  {
    link: "/dashboard",
    component: HomePage,
  },
];

export { adminRouter };
