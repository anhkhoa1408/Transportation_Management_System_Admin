import React, { Suspense } from "react";
import { connect } from "react-redux";
import { Switch, Route } from "react-router-dom";
import Layout from "../components/Layout";
import { generalRouter } from "./routesList/generalRouter";
import { adminRouter } from "./routesList/adminRouter";
import PublicRoute from "./PublicRoutes";
import PrivateRoute from "./PrivateRoutes";

const SuspenseLoading = () => <div>Xin vui lòng đợi</div>;

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
                  <Route path={link} key={link} {...rest}>
                    <PrivateRoute isAuthenticated={isAuthenticated}>
                      <Component {...rest} />
                    </PrivateRoute>
                  </Route>
                );
              })}
            </Layout>
          </Route>
        )}
      </Switch>
    </Suspense>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(RenderRoutes);
