import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { Avatar, Divider, Typography, Badge } from "@mui/material";
import { Box } from "@mui/system";
import LOGO from "./../../assets/img/logo.png";
import SidebarMobile from "../SidebarMobile";
import {
  AccountCircle,
  FormatAlignJustify,
  Logout,
  Settings,
} from "@mui/icons-material";
import {
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
} from "reactstrap";
import AppNotification from "../AppNotification";
import { useHistory } from "react-router-dom";
import { CLEAN_STORE } from "../../constants/types";
import { connect, useDispatch, useSelector } from "react-redux";
import { simplifyString } from "../../utils/address";

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  position: "sticky",
  boxShadow: "10px 0px 0px 0px",
  backgroundColor: "#FFF",
}));

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}));

const Header = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [data, setData] = useState({
    name: "",
    avatar: "",
    role: {
      name: "",
    },
  });
  const [avatar, setAvatar] = useState("");

  useEffect(() => {
    if (props.userInfo) {
      setData(props.userInfo.user);
      if (props.userInfo.user.avatar && props.userInfo.user?.avatar?.url) {
        let isValidUrl = new RegExp("https://").test(
          props.userInfo.user.avatar.url,
        );
        setAvatar(
          isValidUrl
            ? props.userInfo.user.avatar.url
            : process.env.MAIN_URL + props.userInfo.user.avatar.url,
        );
      }
    }
  }, [props.userInfo]);

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
            {data.role.name === "Admin" && <AppNotification />}
            <UncontrolledDropdown>
              <DropdownToggle className="border-0 shadow-none bg-white p-0">
                <StyledBadge
                  overlap="circular"
                  anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                  variant="dot"
                >
                  <Avatar
                    key={Math.random().toString()}
                    alt="Shober"
                    src={avatar.concat("?.", Math.random().toString())}
                  />
                </StyledBadge>
              </DropdownToggle>
              <DropdownMenu
                className="shadow"
                style={{ minWidth: 180, maxWidth: 200 }}
              >
                <DropdownItem header className="d-flex flex-column py-2">
                  <Typography className="opacity-50" sx={{ fontSize: 13 }}>
                    Chào mừng
                  </Typography>
                  <Typography className="fs-6 app--primary">
                    {simplifyString(data.name, 18)}
                  </Typography>
                </DropdownItem>
                <Divider className="app--primary m-1" />
                <DropdownItem
                  onClick={() => history.push("/account/info")}
                  className="d-flex flex-row align-items-center justify-content-start px-4 py-3"
                >
                  <AccountCircle
                    sx={{
                      width: 20,
                      height: 20,
                      marginRight: "10px",
                    }}
                  />
                  <Typography>Cá nhân</Typography>
                </DropdownItem>
                {props?.userInfo?.user?.role?.name === "Admin" && (
                  <DropdownItem
                    onClick={() => history.push("/setting")}
                    className="d-flex flex-row align-items-center justify-content-start px-4 py-3"
                  >
                    <Settings
                      sx={{
                        width: 20,
                        height: 20,
                        marginRight: "10px",
                      }}
                    />
                    <Typography>Cài đặt</Typography>
                  </DropdownItem>
                )}
                <DropdownItem
                  onClick={() => {
                    dispatch({ type: CLEAN_STORE });
                    history.push("/login");
                  }}
                  className="d-flex flex-row align-items-center justify-content-start px-4 py-3"
                >
                  <Logout
                    sx={{
                      width: 20,
                      height: 20,
                      marginRight: "10px",
                    }}
                  />
                  <Typography>Đăng xuất</Typography>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
};

const mapStateToProps = (state) => ({
  userInfo: state.userInfo,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
