import React from "react";
import { styled } from "@mui/material/styles";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { Avatar } from "@mui/material";
import Notifications from "@mui/icons-material/Notifications";
import { Box } from "@mui/system";
import LOGO from "./../../assets/img/logo.png";
import SidebarMobile from "../SidebarMobile";
import { FormatAlignJustify } from "@mui/icons-material";

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  position: "static",
  boxShadow: "10px 0px 0px 0px",
  backgroundColor: "#FFF",
}));

const Header = (props) => {
  return (
    <>
      <AppBar>
        <Toolbar className="d-flex flex-row">
          <input type="checkbox" hidden id="toggle-sidebar-mobile" />
          <SidebarMobile />

          <label htmlFor="toggle-sidebar-mobile" className="overlay"></label>
          <label
            htmlFor="toggle-sidebar-mobile"
            className="d-flex d-sm-flex d-md-flex d-lg-none d-xl-none text-dark me-3 -cursor-pointer btn"
          >
            <FormatAlignJustify />
          </label>
          <Box>
            <img
              alt=""
              src={LOGO}
              style={{
                width: "80px",
              }}
            />
          </Box>

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
    </>
  );
};

export default Header;
