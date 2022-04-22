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

const VoucherList = lazy(() => import("./../../views/DashboardPage/VoucherPage/VoucherList"))

const VoucherDetail = lazy(() => import("./../../views/DashboardPage/VoucherPage/VoucherDetail"))

const AccountPage = lazy(() =>
  import("./../../views/AuthPage/AccountPage/AccountPage"),
);

const ArrangePage = lazy(() =>
  import("./../../views/DashboardPage/ArrangePackagePage/ArrangePage"),
);

const EditShipment = lazy(() => import("./../../views/DashboardPage/ArrangePackagePage/EditShipment"))

const ShipmentList = lazy(() => import("./../../views/DashboardPage/ArrangePackagePage/ShipmentList"))

const SettingPage = lazy(() => import('./../../views/DashboardPage/SettingPage/SettingPage'))

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
    link: "/report/create",
    component: ReportDetail,
  },
  {
    link: "/feedback",
    component: FeedbackList,
  },
  {
    link: "/voucher",
    component: VoucherList,
  },
  {
    link: "/voucher/detail",
    component: VoucherDetail,
  },
  {
    link: "/voucher/create",
    component: VoucherDetail,
  },
  {
    link: "/account/info",
    component: AccountPage,
  },
  {
    link: "/shipment",
    component: ShipmentList,
  },
  {
    link: "/shipment/detail",
    component: EditShipment,
  },
  {
    link: "/shipment/arrange",
    component: ArrangePage,
  },
  {
    link: "/setting",
    component: SettingPage,
  },
];

export { adminRouter };
