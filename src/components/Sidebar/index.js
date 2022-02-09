import React from "react";
import { styled, useTheme } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { NavLink } from "react-router-dom";
import Home from "@mui/icons-material/Dashboard";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(9)} + 1px)`,
  [theme.breakpoints.up("md")]: {
    width: `calc(${theme.spacing(9)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  border: 0,
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const routerList = [
  { link: "/dashboard", title: "Bảng điều khiển", icon: <Home /> },
];

const Sidebar = (props) => {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  return (
    <Drawer
      variant="permanent"
      open={open}
      PaperProps={{
        sx: {
          backgroundColor: "#7FC3DC",
        },
      }}
    >
      <DrawerHeader>
        <IconButton onClick={() => setOpen(!open)}>
          {!open ? (
            <ChevronRightIcon className="text-white" />
          ) : (
            <ChevronLeftIcon className="text-white" />
          )}
        </IconButton>
      </DrawerHeader>
      <Divider
        sx={{
          margin: theme.spacing(0, 1),
          color: "white",
          borderWidth: 1,
          opacity: 1,
        }}
      />

      <List>
        {routerList.map((item, index) => (
          <NavLink
            key={index}
            activeClassName="active"
            className="nav-link"
            to={item.link}
          >
            <ListItem button className="text-white">
              <ListItemIcon className="text-white">{item.icon}</ListItemIcon>
              <ListItemText primary={item.title} />
            </ListItem>
          </NavLink>
        ))}
      </List>
      <Divider
        sx={{
          margin: theme.spacing(0, 1),
          color: "white",
          borderWidth: 1,
          opacity: 1,
        }}
      />
      {/* <List>
        {["All mail", "Trash", "Spam"].map((text, index) => (
          <ListItem button key={text} className="text-white">
            <ListItemIcon className="text-white">
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List> */}
    </Drawer>
  );
};

export default Sidebar;
