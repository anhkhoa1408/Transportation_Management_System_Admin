import React from "react";
import { styled, useTheme } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { NavLink } from "react-router-dom";
import { Box } from "@mui/system";
import {
  Home,
  ChevronLeft,
  ChevronRight,
  AccountCircle,
  ListAlt,
  LocalShipping,
  ConfirmationNumber,
  Storage,
  ModeComment,
  Description,
  People,
} from "@mui/icons-material";
import { connect } from "react-redux";
import { toggleSidebar } from "../../actions/actions";
import { Typography } from "@mui/material";

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
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  height: "100%",
}));

const routerList = [
  { link: "/customer", title: "Người dùng", icon: <AccountCircle /> },
  { link: "/dashboard", title: "Nhân viên", icon: <People /> },
  { link: "/dashboard", title: "Đơn hàng", icon: <ListAlt /> },
  { link: "/dashboard", title: "Phương tiện", icon: <LocalShipping /> },
  { link: "/dashboard", title: "Khuyến mãi", icon: <ConfirmationNumber /> },
  { link: "/dashboard", title: "Kho", icon: <Storage /> },
];

const Sidebar = (props) => {
  const theme = useTheme();
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
          backgroundColor: "#7FC3DC",
          position: "static",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "stretch",
        },
      }}
    >
      <DrawerHeader className="d-flex flex-column align-items-center mb-3">
        <IconButton className="bg-white" onClick={handleToggle}>
          {toggle ? (
            <ChevronRight className="app-primary-color" />
          ) : (
            <ChevronLeft className="app-primary-color" />
          )}
        </IconButton>
      </DrawerHeader>

      <NavLink
        activeClassName="active opacity-100"
        className="nav-link opacity-50"
        to="/dashboard"
      >
        <ListItem
          button
          className="text-white d-flex align-items-center justify-content-center"
        >
          {!toggle ? (
            <>
              <ListItemIcon className="text-white m-0 w-0">
                <Home />
              </ListItemIcon>
              <ListItemText primary="Bảng điều khiển" />
            </>
          ) : (
            <Home />
          )}
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
        <NavLink
          key={index}
          activeClassName="opacity-100 active"
          className="nav-link opacity-50"
          to={item.link}
        >
          <ListItem
            button
            className="text-white d-flex align-items-center justify-content-center"
          >
            {!toggle ? (
              <>
                <ListItemIcon className="text-white m-0 w-0">
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.title} />
              </>
            ) : (
              item.icon
            )}
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

      <NavLink
        activeClassName="active opacity-100"
        className="nav-link opacity-50"
        to="/dashboard"
      >
        <ListItem
          button
          className="text-white d-flex align-items-center justify-content-center"
        >
          {!toggle ? (
            <>
              <ListItemIcon className="text-white m-0 w-0">
                <Description />
              </ListItemIcon>
              <ListItemText primary="Báo cáo định kỳ" />
            </>
          ) : (
            <Description />
          )}
        </ListItem>
      </NavLink>

      <NavLink
        activeClassName="active opacity-100"
        className="nav-link opacity-50"
        to="/dashboard"
      >
        <ListItem
          button
          className="text-white d-flex align-items-center justify-content-center"
        >
          {!toggle ? (
            <>
              <ListItemIcon className="text-white m-0 w-0">
                <ModeComment />
              </ListItemIcon>
              <ListItemText primary="Phản hồi" />
            </>
          ) : (
            <ModeComment />
          )}
        </ListItem>
      </NavLink>
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
