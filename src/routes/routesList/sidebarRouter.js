import {
  AccountCircle, ConfirmationNumber, Description, Home, ListAlt,
  LocalShipping, ModeComment, People, Storage, TurnSharpRight
} from "@mui/icons-material";
import React from "react";

const adminSidebar = [
  {
    link: "/dashboard",
    title: "Bảng điều khiển",
    icon: <Home />,
  },
  {
    link: "/shipment/arrange",
    title: "Chuyến xe",
    icon: <TurnSharpRight />,
  },
  {
    link: "/customer",
    title: "Khách hàng",
    icon: <AccountCircle />,
  },
  { link: "/staff", title: "Nhân viên", icon: <People /> },
  { link: "/order", title: "Đơn hàng", icon: <ListAlt /> },
  { link: "/vehicle", title: "Phương tiện", icon: <LocalShipping /> },
  { link: "/voucher", title: "Khuyến mãi", icon: <ConfirmationNumber /> },
  { link: "/storage", title: "Kho hàng", icon: <Storage /> },
  { link: "/report", title: "Báo cáo định kỳ", icon: <Description /> },
  { link: "/feedback", title: "Phản hồi", icon: <ModeComment /> },
];

const customerSidebar = [
  {
    link: "/dashboard",
    title: "Bảng điều khiển",
    icon: <Home />,
  },
  { link: "/order", title: "Đơn hàng", icon: <ListAlt /> },
  { link: "/feedback", title: "Phản hồi", icon: <ModeComment /> },
];

const driverSidebar = [
  {
    link: "/dashboard",
    title: "Bảng điều khiển",
    icon: <Home />,
  },
  { link: "/vehicle", title: "Phương tiện", icon: <LocalShipping /> },
];

const storekeeperSidebar = [
  {
    link: "/dashboard",
    title: "Bảng điều khiển",
    icon: <Home />,
  },
  { link: "/vehicle", title: "Phương tiện", icon: <LocalShipping /> },
  { link: "/storage", title: "Kho hàng", icon: <Storage /> },
  { link: "/report", title: "Báo cáo định kỳ", icon: <Description /> },
];

export { adminSidebar, storekeeperSidebar, driverSidebar, customerSidebar };

