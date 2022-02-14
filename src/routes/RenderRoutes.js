import React, { Suspense } from "react";
import { connect } from "react-redux";
import { Switch, Route, Redirect } from "react-router-dom";
import Layout from "../components/Layout";
import { generalRouter } from "./routesList/generalRouter";
import { adminRouter } from "./routesList/adminRouter";
import PublicRoute from "./PublicRoutes";
import PrivateRoute from "./PrivateRoutes";
import LoginPage from "../views/AuthPage/LoginPage/LoginPage";
import { Audio } from "react-loader-spinner";
import { Typography } from "@mui/material";

const SuspenseLoading = () => (
  <div className="d-flex flex-column align-items-center justify-content-center bg-white h-100 w-100 position-fixed top-0 bottom-0">
    <Audio
      wrapperClass="mb-3"
      heigth="150"
      width="150"
      color="#7fc3dc"
      ariaLabel="loading"
    />
    <Typography className="app-primary-color">
      Xin vui lòng đợi trong giây lát
    </Typography>
  </div>
);

export const RenderRoutes = (props) => {
  const isAuthenticated = true;
  const allowedRoutes = adminRouter;

  return (
    <Suspense fallback={<SuspenseLoading />}>
      <Switch>
        {generalRouter.map((route) => {
          let { link, component: Component, ...rest } = route;
          return (
            <Route exact path={link} key={link}>
              <PublicRoute isAuthenticated={isAuthenticated}>
                <Component {...rest} />
              </PublicRoute>
            </Route>
          );
        })}

        {Array.isArray(allowedRoutes) && allowedRoutes.length && (
          <Route exact path={allowedRoutes.map((item) => item.link)}>
            <Layout>
              {allowedRoutes.map((route) => {
                let { component: Component, link, ...rest } = route;
                return (
                  <Route exact path={link} key={link}>
                    <PrivateRoute isAuthenticated={isAuthenticated}>
                      <Component {...rest} />
                    </PrivateRoute>
                  </Route>
                );
              })}
            </Layout>
          </Route>
        )}

        <Redirect exact from="/" to="/login" />
        <Route path="*" exact={true} component={LoginPage} />
      </Switch>
    </Suspense>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(RenderRoutes);
