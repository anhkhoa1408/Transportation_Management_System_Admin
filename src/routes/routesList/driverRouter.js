import { lazy } from "react";

const HomePage = lazy(() =>
  import("./../../views/DashboardPage/HomePage/HomePage"),
);

const VehicleList = lazy(() =>
  import("./../../views/DashboardPage/VehiclePage/VehicleList"),
);

const VehicleDetail = lazy(() =>
  import("./../../views/DashboardPage/VehiclePage/VehicleDetail"),
);

const AccountPage = lazy(() =>
  import("./../../views/AuthPage/AccountPage/AccountPage"),
);

const driverRouter = [
  {
    link: "/dashboard",
    component: HomePage,
  },
  {
    link: "/vehicle",
    component: VehicleList,
  },
  {
    link: "/vehicle/detail",
    component: VehicleDetail,
  },
  {
    link: "/account/info",
    component: AccountPage,
  },
];

export { driverRouter };