import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import MuiDrawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { styled } from "@mui/material/styles";
import React from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { toggleSidebar } from "../../actions/actions";
import { store } from "../../config/configureStore";
import "./../../assets/css/components/Sidebar.css";
import {
  adminSidebar,
  customerSidebar,
  driverSidebar,
  storekeeperSidebar,
} from "./../../routes/routesList/sidebarRouter";

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, toggle }) => ({
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  position: "sticky",
  top: 0,
  height: "100vh",
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

const Sidebar = (props) => {
  const { toggle, handleToggleSideBar } = props;

  const handleToggle = () => {
    handleToggleSideBar(!toggle);
  };

  return (
    <Drawer
      variant="permanent"
      open={toggle}
      PaperProps={{
        sx: {
          flex: 1,
          boxShadow: "0 0 0",
          borderWidth: 0,
          position: "static",
          display: "flex",
          flexDirection: "column",
          alignItems: "stretch",
        },
      }}
    >
      <DrawerHeader className="d-flex flex-column align-items-center mb-3">
        <IconButton className="app-bg--primary" onClick={handleToggle}>
          {toggle ? (
            <ChevronRight className="text-white" />
          ) : (
            <ChevronLeft className="text-white" />
          )}
        </IconButton>
      </DrawerHeader>

      {routerList().map((item, index) => (
        <NavLink key={index} className="nav-link" to={item.link}>
          <ListItem
            button
            className="app--primary d-flex align-items-center justify-content-center"
          >
            {!toggle ? (
              <>
                <ListItemIcon className="m-0 w-0">{item.icon}</ListItemIcon>
                <ListItemText primary={item.title} />
              </>
            ) : (
              item.icon
            )}
          </ListItem>
        </NavLink>
      ))}
    </Drawer>
  );
};

const mapStateToProps = (state) => ({
  toggle: state.layoutOption.toggleSideBar,
});

const mapDispatchToProps = (dispatch) => {
  return {
    handleToggleSideBar: (toggle) => dispatch(toggleSidebar(toggle)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
