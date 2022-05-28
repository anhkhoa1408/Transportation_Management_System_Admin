import {
  Close
} from "@mui/icons-material";
import MuiDrawer from "@mui/material/Drawer";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { styled, useTheme } from "@mui/material/styles";
import React from "react";
import { NavLink } from "react-router-dom";
import { store } from "../../config/configureStore";
import {
  adminSidebar,
  customerSidebar,
  driverSidebar,
  storekeeperSidebar
} from "./../../routes/routesList/sidebarRouter";

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, toggle }) => ({
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  height: "100%",
}));

const routerList = () => {
  let data = store.getState().userInfo;
  let sidebarData = [];
  if (data && data.user && data.user.role) {
    switch (data.user.role.name) {
      case "Admin":
        sidebarData = adminSidebar;
        break;
      case "Stocker":
        sidebarData = storekeeperSidebar;
        break;
      case "Driver":
        sidebarData = driverSidebar;
        break;
      case "Customer":
        sidebarData = customerSidebar;
        break;
      default:
        sidebarData = [];
    }
  }
  return sidebarData;
};

const SidebarMobile = (props) => {
  const theme = useTheme();

  return (
    <Drawer
      className="sidebar-mobile"
      variant="permanent"
      open={true}
      PaperProps={{
        sx: {
          flex: 1,
          position: "static",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "stretch",
          overflow: "hidden",
          borderWidth: 0,
          width: 270,
        },
      }}
    >
      <label htmlFor="toggle-sidebar-mobile" className="d-flex flex-column btn">
        <Close className="text-white align-self-end my-2 app-btn--primary app-btn--close rounded-1" />
      </label>

      {routerList().map((item, index) => (
        <NavLink key={index} className="nav-link" to={item.link}>
          <ListItem
            button
            className="app--primary d-flex align-items-center justify-content-center"
          >
            <ListItemIcon className="m-0 w-0">{item.icon}</ListItemIcon>
            <ListItemText primary={item.title} />
          </ListItem>
        </NavLink>
      ))}
    </Drawer>
  );
};

export default SidebarMobile;
