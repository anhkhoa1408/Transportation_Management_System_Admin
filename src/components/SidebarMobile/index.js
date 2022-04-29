import React from "react";
import { styled, useTheme } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { NavLink } from "react-router-dom";
import { Box } from "@mui/system";
import {
  Home,
  AccountCircle,
  ListAlt,
  LocalShipping,
  ConfirmationNumber,
  Storage,
  ModeComment,
  Description,
  People,
  Close,
} from "@mui/icons-material";

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, toggle }) => ({
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  height: "100%",
}));

const routerList = [
  { link: "/customer", title: "Người dùng", icon: <AccountCircle /> },
  { link: "/staff", title: "Nhân viên", icon: <People /> },
  { link: "/order", title: "Đơn hàng", icon: <ListAlt /> },
  { link: "/vehicle", title: "Phương tiện", icon: <LocalShipping /> },
  { link: "/dashboard", title: "Khuyến mãi", icon: <ConfirmationNumber /> },
  { link: "/storage", title: "Kho", icon: <Storage /> },
];

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
        },
      }}
    >
      <label htmlFor="toggle-sidebar-mobile" className="d-flex flex-column btn">
        <Close className="app--primary align-self-end m-2" />
      </label>

      <NavLink className="nav-link" to="/dashboard">
        <ListItem
          button
          className="app--primary d-flex align-items-center justify-content-center"
        >
          <ListItemIcon className="m-0 w-0">
            <Home />
          </ListItemIcon>
          <ListItemText primary="Bảng điều khiển" />
        </ListItem>
      </NavLink>

      <Box
        sx={{
          padding: theme.spacing(0, 4),

          width: "100%",
        }}
      >
        <Divider
          sx={{ width: "100%", color: "white", borderWidth: 1, opacity: 1 }}
        />
      </Box>

      {routerList.map((item, index) => (
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
      <Box
        sx={{
          padding: theme.spacing(0, 4),

          width: "100%",
        }}
      >
        <Divider
          sx={{ width: "100%", color: "white", borderWidth: 1, opacity: 1 }}
        />
      </Box>

      <NavLink className="nav-link" to="/report">
        <ListItem
          button
          className="app--primary d-flex align-items-center justify-content-center"
        >
          <ListItemIcon className="m-0 w-0">
            <Description />
          </ListItemIcon>
          <ListItemText primary="Báo cáo định kỳ" />
        </ListItem>
      </NavLink>

      <NavLink className="nav-link" to="/feedback">
        <ListItem
          button
          className="app--primary d-flex align-items-center justify-content-center"
        >
          <ListItemIcon className="m-0 w-0">
            <ModeComment />
          </ListItemIcon>
          <ListItemText primary="Phản hồi" />
        </ListItem>
      </NavLink>
    </Drawer>
  );
};

export default SidebarMobile;
