import { lazy } from "react";

const LoginPage = lazy(() =>
  import("./../../views/AuthPage/LoginPage/LoginPage"),
);

const generalRouter = [
  {
    link: "/login",
    component: LoginPage,
  },
];

export { generalRouter };
