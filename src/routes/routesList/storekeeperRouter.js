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

const StorageList = lazy(() =>
  import("./../../views/DashboardPage/StoragePage/StorageList"),
);

const StorageDetail = lazy(() =>
  import("./../../views/DashboardPage/StoragePage/StorageDetail"),
);

const ReportList = lazy(() =>
  import("./../../views/DashboardPage/ReportPage/ReportList"),
);

const ReportDetail = lazy(() =>
  import("./../../views/DashboardPage/ReportPage/ReportDetail"),
);

const AccountPage = lazy(() =>
  import("./../../views/AuthPage/AccountPage/AccountPage"),
);

const storekeeperRouter = [
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
  {
    link: "/storage",
    component: StorageList,
  },
  {
    link: "/storage/info",
    component: StorageDetail,
  },
  {
    link: "/report",
    component: ReportList,
  },
  {
    link: "/report/detail",
    component: ReportDetail,
  },
  {
    link: "/report/create",
    component: ReportDetail,
  },
];

export { storekeeperRouter };