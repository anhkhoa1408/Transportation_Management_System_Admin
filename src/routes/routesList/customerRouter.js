import { lazy } from "react";

const HomePage = lazy(() =>
  import("./../../views/DashboardPage/HomePage/HomePage"),
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

const FeedbackList = lazy(() =>
  import("./../../views/DashboardPage/FeedbackPage/FeedbackList"),
);

const AccountPage = lazy(() =>
  import("./../../views/AuthPage/AccountPage/AccountPage"),
);

const customerRouter = [
  {
    link: "/dashboard",
    component: HomePage,
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
    link: "/feedback",
    component: FeedbackList,
  },
  {
    link: "/account/info",
    component: AccountPage,
  },
];

export { customerRouter };