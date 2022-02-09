import React from "react";
import { styled } from "@mui/material/styles";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Avatar, Container } from "@mui/material";
import Notifications from "@mui/icons-material/Notifications";
import { Box } from "@mui/system";

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  position: "relative",
  zIndex: theme.zIndex.drawer + 1,
  boxShadow: "0px 4px 0px 0px",
  backgroundColor: "#FFF",
}));

const Header = (props) => {
  return (
    <AppBar>
      <Toolbar className="d-flex flex-row">
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
