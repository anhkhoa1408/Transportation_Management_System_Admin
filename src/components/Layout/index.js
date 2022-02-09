import { Box, CssBaseline } from "@mui/material";
import React from "react";
import Header from "../Header";
import Sidebar from "../Sidebar";

const Layout = (props) => {
  const { children } = props;

  return (
    <Box
      sx={{
        display: "flex",
        backgroundColor: "#F8F8F8",
        height: "100vh",
        flexDirection: "row",
      }}
    >
      <CssBaseline />
      <Sidebar />
      <Box component="main" className="d-flex flex-column flex-grow-1">
        <Header />
        {children}
      </Box>
    </Box>
  );
};

export default Layout;
