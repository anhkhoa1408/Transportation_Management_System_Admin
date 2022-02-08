import React from "react";
import { styled } from "@mui/material/styles";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Avatar, Container } from "@mui/material";
import Notifications from "@mui/icons-material/Notifications";
import { Box } from "@mui/system";

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  boxShadow: "0 0",
  backgroundColor: "#FFF",
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Header = (props) => {
  const { open, handleDrawerOpen } = props;

  return (
    <AppBar position="fixed" open={open}>
      <Toolbar className="d-flex flex-row">
        <IconButton
          className="text-dark flex-1"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          sx={{
            marginRight: "36px",
            ...(open && { display: "none" }),
          }}
        >
          <MenuIcon />
        </IconButton>
        <Box
          component="div"
          className="ms-auto d-flex flex-row align-items-center"
        >
          <Notifications className="text-dark me-3" />
          <Avatar
            sx={{
              width: 30,
              height: 30,
            }}
          />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
