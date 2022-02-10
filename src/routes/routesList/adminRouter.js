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

const adminRouter = [
  {
    link: "/dashboard",
    component: HomePage,
  },
  {
    link: "/customer/info/:id",
    component: CustomerInfo,
  },
  {
    link: "/customer",
    component: CustomerList,
  },
];

export { adminRouter };
