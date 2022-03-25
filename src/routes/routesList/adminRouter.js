import { lazy } from "react";

const HomePage = lazy(() =>
  import("./../../views/DashboardPage/HomePage/HomePage"),
);

const CustomerList = lazy(() =>
  import("./../../views/DashboardPage/CustomerPage/CustomerList"),
);
const CustomerInfo = lazy(() =>
  import("./../../views/DashboardPage/CustomerPage/CustomerInfo"),
);

const StaffList = lazy(() =>
  import("./../../views/DashboardPage/StaffPage/StaffList"),
);

const StaffInfo = lazy(() =>
  import("./../../views/DashboardPage/StaffPage/StaffInfo"),
);

const OrderList = lazy(() =>
  import("./../../views/DashboardPage/OrderPage/OrderList"),
);

const OrderDetail = lazy(() =>
  import("./../../views/DashboardPage/OrderPage/OrderDetail"),
);

const PackageList = lazy(() =>
  import("./../../views/DashboardPage/PackagePage/PackageList"),
);

const PackageDetail = lazy(() =>
  import("./../../views/DashboardPage/PackagePage/PackageDetail"),
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

const FeedbackList = lazy(() =>
  import("./../../views/DashboardPage/FeedbackPage/FeedbackList"),
);

const AccountPage = lazy(() =>
  import("./../../views/AuthPage/AccountPage/AccountPage"),
);
const ArrangePage = lazy(() =>
  import("./../../views/DashboardPage/ArrangePackagePage/ArrangePage"),
);

const adminRouter = [
  {
    link: "/dashboard",
    component: HomePage,
  },
  {
    link: "/customer/info",
    component: CustomerInfo,
  },
  {
    link: "/customer",
    component: CustomerList,
  },
  {
    link: "/staff",
    component: StaffList,
  },
  {
    link: "/staff/info",
    component: StaffInfo,
  },
  {
    link: "/staff/create",
    component: StaffInfo,
  },
  {
    link: "/order",
    component: OrderList,
  },
  {
    link: "/order/detail",
    component: OrderDetail,
  },
  {
    link: "/package",
    component: PackageList,
  },
  {
    link: "/package/detail",
    component: PackageDetail,
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
    link: "/vehicle/create",
    component: VehicleDetail,
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
    link: "/storage/create",
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
    link: "/feedback",
    component: FeedbackList,
  },
  {
    link: "/account/info",
    component: AccountPage,
  },
  {
    link: "/shipment/arrange",
    component: ArrangePage,
  },
];

export { adminRouter };
