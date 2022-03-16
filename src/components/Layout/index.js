import { Box, CssBaseline, Grid } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import clsx from "clsx";
import React from "react";
import { connect } from "react-redux";
import Footer from "../Footer";
import Header from "../Header";
import Sidebar from "../Sidebar";
import "./../../assets/css/components/Sidebar.css";

const Layout = (props) => {
  const { children, toggleSideBar } = props;
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: "flex",
        backgroundColor: "#F8F9FC",
        minHeight: "100vh",
        flexDirection: "row",
      }}
    >
      <CssBaseline />
      <Grid container spacing={0}>
        <Grid
          item
          className={clsx(
            "d-none d-sm-none d-md-none d-lg-flex d-xl-flex flex-column align-items-stretch",
            {
              "col-0 col-sm-0 col-md-0 col-lg-3 col-xl-2": !toggleSideBar,
              "col-10 col-sm-0 col-md-0 col-lg-1 col-xl-1": toggleSideBar,
            },
          )}
          style={{
            transition: theme.transitions.create("all", {
              easing: "linear",
              duration: "0.3s",
            }),
          }}
        >
          <Sidebar />
        </Grid>

        <Grid
          item
          className={clsx({
            "col-12 col-sm-12 col-md-12 col-lg-9 col-xl-10": !toggleSideBar,
            "col-12 col-sm-12 col-md-12 col-lg-11 col-xl-11": toggleSideBar,
          })}
          style={{
            transition: theme.transitions.create("all", {
              easing: "linear",
              duration: "0.3s",
            }),
          }}
        >
          <Box
            component="main"
            className="d-flex flex-column flex-grow-1 h-100"
          >
            <Header />
            <Box className="h-100 flex-grow-1">{children}</Box>
            <Footer />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

const mapStateToProps = (state) => ({
  toggleSideBar: state.layoutOption.toggleSideBar,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
