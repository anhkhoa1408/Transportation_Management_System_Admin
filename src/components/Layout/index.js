import { Box, CssBaseline, Grid } from "@mui/material";
import React from "react";
import Header from "../Header";
import Sidebar from "../Sidebar";
import { connect } from "react-redux";
import { useTheme } from "@mui/material/styles";

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
      <Grid container>
        <Grid
          item
          xs={toggleSideBar ? 1 : 2}
          style={{
            transition: theme.transitions.create("all", {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.leavingScreen,
            }),
          }}
        >
          <Sidebar />
        </Grid>

        <Grid
          item
          xs={toggleSideBar ? 11 : 10}
          style={{
            transition: theme.transitions.create("all", {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.leavingScreen,
            }),
          }}
        >
          <Box
            component="main"
            className="d-flex flex-column flex-grow-1 h-100"
          >
            <Header />
            <Box className="h-100 flex-grow-1">{children}</Box>
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
