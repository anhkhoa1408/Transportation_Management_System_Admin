import React, { Suspense, useEffect, useState } from "react";
import { connect, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { Redirect, Route, Switch } from "react-router-dom";
import Layout from "../components/Layout";
import Loading from "../components/Loading";
import { store } from "../config/configureStore";
import LoginPage from "../views/AuthPage/LoginPage/LoginPage";
import { acceptedRoute, isLoggedIn } from "./check";
import PrivateRoute from "./PrivateRoutes";
import PublicRoute from "./PublicRoutes";
import { generalRouter } from "./routesList/generalRouter";

export const RenderRoutes = (props) => {
  const isAuthenticated = isLoggedIn();
  const allowedRoutes = acceptedRoute() || [];
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    if (location && location.pathname) {
      let isValidRoute =
        generalRouter.filter((item) => item.link === location.pathname)
          .length !== 0 ||
        allowedRoutes.filter((item) => item.link === location.pathname)
          .length !== 0;

      if (!isValidRoute) {
        if (!isAuthenticated) {
          history.push("/login");
        } else {
          history.push("/dashboard");
        }
      }
    }
  });

  return (
    <Suspense fallback={<Loading />}>
      <Switch>
        {generalRouter.map((route) => {
          let { link, component: Component, ...rest } = route;
          return (
            <Route exact path={link} key={link}>
              <PublicRoute exact isAuthenticated={isAuthenticated}>
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
        {/* <Route path="*" component={LoginPage} /> */}
      </Switch>
    </Suspense>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(RenderRoutes);
