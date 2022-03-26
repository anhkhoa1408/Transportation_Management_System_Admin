import React from "react";
import { styled, useTheme } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
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
import "./../../assets/css/components/Sidebar.css";

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

const routerList = [
  {
    link: "/customer",
    title: "Khách hàng",
    icon: <AccountCircle />,
  },
  { link: "/staff", title: "Nhân viên", icon: <People /> },
  { link: "/order", title: "Đơn hàng", icon: <ListAlt /> },
  { link: "/vehicle", title: "Phương tiện", icon: <LocalShipping /> },
  { link: "/voucher", title: "Khuyến mãi", icon: <ConfirmationNumber /> },
  { link: "/storage", title: "Kho", icon: <Storage /> },
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
        <IconButton className="app-primary-bg-color" onClick={handleToggle}>
          {toggle ? (
            <ChevronRight className="text-white" />
          ) : (
            <ChevronLeft className="text-white" />
          )}
        </IconButton>
      </DrawerHeader>

      <NavLink className="nav-link" to="/dashboard">
        <ListItem
          button
          className="app-primary-color d-flex align-items-center justify-content-center"
        >
          {!toggle ? (
            <>
              <ListItemIcon className="m-0 w-0">
                <Home />
              </ListItemIcon>
              <ListItemText primary="Bảng điều khiển" />
            </>
          ) : (
            <Home />
          )}
        </ListItem>
      </NavLink>

      <NavLink className="nav-link" to="/shipment/arrange">
        <ListItem
          button
          className="app-primary-color d-flex align-items-center justify-content-center"
        >
          {!toggle ? (
            <>
              <ListItemIcon className="m-0 w-0">
                <Home />
              </ListItemIcon>
              <ListItemText primary="Sắp xếp chuyến xe" />
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
        <NavLink key={index} className="nav-link" to={item.link}>
          <ListItem
            button
            className="app-primary-color d-flex align-items-center justify-content-center"
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
          className="app-primary-color d-flex align-items-center justify-content-center"
        >
          {!toggle ? (
            <>
              <ListItemIcon className="m-0 w-0">
                <Description />
              </ListItemIcon>
              <ListItemText primary="Báo cáo định kỳ" />
            </>
          ) : (
            <Description />
          )}
        </ListItem>
      </NavLink>

      <NavLink className="nav-link" to="/feedback">
        <ListItem
          button
          className="app-primary-color d-flex align-items-center justify-content-center"
        >
          {!toggle ? (
            <>
              <ListItemIcon className="m-0 w-0">
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
