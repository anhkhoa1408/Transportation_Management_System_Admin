import React from "react";
import { styled } from "@mui/material/styles";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { Avatar, Button, Divider, Typography } from "@mui/material";
import { Box } from "@mui/system";
import LOGO from "./../../assets/img/logo.png";
import SidebarMobile from "../SidebarMobile";
import {
  AccountCircle,
  FormatAlignJustify,
  Logout,
  NotificationsOutlined,
  Notifications,
  History,
} from "@mui/icons-material";
import {
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Modal,
  ModalBody,
  UncontrolledDropdown,
} from "reactstrap";

import "./../../assets/css/components/AppNotification.css";

const AppNotification = (props) => {
  return (
    <UncontrolledDropdown direction="left" className="me-3">
      <DropdownToggle className="border-0 shadow-none bg-light p-1">
        <Notifications className="app-primary-color" />
      </DropdownToggle>
      <DropdownMenu
        className="col-lg-12 position-absolute shadow"
        style={{
          minWidth: "400px",
        }}
      >
        <DropdownItem header>
          <Typography className="fw-bold text-dark py-3 px-2 fs-6">
            Thông báo
          </Typography>
        </DropdownItem>
        <Divider className="border border-1" />
        <Box
          style={{
            height: "450px",
            overflowY: "scroll",
          }}
          className="flex-column justify-content-start align-items-stretch"
        >
          {Array.from({ length: 10 }, (_, index) => (
            <>
              <DropdownItem
                key={index}
                className="d-flex flex-row align-items-center p-4"
              >
                <Box className="app-primary-bg-color-neutral icon-notification p-2 me-4">
                  <NotificationsOutlined className="app-primary-color" />
                </Box>
                <Box className="d-flex flex-column">
                  <Typography className="fw-bold fs-6">
                    Thông báo đơn hàng mới
                  </Typography>
                  <Box className="d-flex flex-row align-items-center">
                    <History
                      sx={{ fontSize: "20px" }}
                      className="text-secondary me-1"
                    />
                    <Typography sx={{ fontSize: "14px" }}>
                      12:40 PM 30/12/2022
                    </Typography>
                  </Box>
                </Box>
              </DropdownItem>
              <Divider className="border border-1" />
            </>
          ))}
        </Box>
      </DropdownMenu>
    </UncontrolledDropdown>
  );
};

export default AppNotification;
