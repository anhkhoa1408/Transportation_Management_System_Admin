import { Box, CssBaseline } from "@mui/material";
import React from "react";
import Header from "../Header";
import Sidebar from "../Sidebar";
import { styled } from "@mui/material/styles";

const Layout = (props) => {
  const [open, setOpen] = React.useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const Offset = styled("div")(({ theme }) => ({
    ...theme.mixins.toolbar,
  }));

  return (
    <Box sx={{ display: "flex", backgroundColor: "#F8F8F8", height: "100vh" }}>
      <CssBaseline />
      <Header handleDrawerOpen={handleDrawerOpen} open={open} />
      <Sidebar handleDrawerClose={handleDrawerClose} open={open} />
      <Box component="main">
        <Offset />
      </Box>
    </Box>
  );
};

export default Layout;
