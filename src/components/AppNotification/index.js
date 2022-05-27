import {
  Assignment,
  BrokenImage,
  History,
  ModeNight,
  Notifications,
  NotificationsOutlined,
} from "@mui/icons-material";
import { Button, Divider, Icon, Typography, Badge } from "@mui/material";
import { Box } from "@mui/system";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
} from "reactstrap";
import { saveNotiSuccess } from "../../actions/actions";
import notiApi from "../../api/notification";
import "./../../assets/css/components/AppNotification.css";

const AppNotification = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [invisible, setInvisible] = useState(true)
  const [notiList, setNotiList] = useState([]);
  const [start, setStart] = useState(0);
  const notification = useSelector((state) => state.notification);

  const handleNotiStyle = (item) => {
    switch (item.message_type) {
      case "order":
        return {
          icon: <Assignment className="app--primary" />,
          color: "app--primary",
          neutral: "app-bg--neutral-primary",
        };
      case "broken":
        return {
          icon: <BrokenImage className="app--danger" />,
          color: "app--danger",
          neutral: "app-bg--neutral-danger",
        };
      case "furlough":
        return {
          icon: <ModeNight className="app--secondary" />,
          color: "app--secondary",
          neutral: "app-bg--neutral-secondary",
        };
      default:
        return {
          icon: <NotificationsOutlined />,
          color: "app--primary",
          neutral: "app-bg--neutral-primary",
        };
    }
  };

  const handleNavigate = (item) => {
    let navigate = "";
    switch (item.message_type) {
      case "order":
        navigate = "/order/detail";
        break;
      case "broken":
        navigate = "/vehicle/detail";
        break;
      case "furlough":
        navigate = "/staff/info";
        break;
      default:
        break;
    }
    history.push(navigate, {
      id: item.reference_id,
      tab: "2",
    });
  };

  useEffect(() => {
    notiApi
      .getList({
        _start: 0,
        _limit: 5,
        _sort: "createdAt:DESC",
      })
      .then((response) => {
        setNotiList(response);
        dispatch(saveNotiSuccess(response));
      });
  }, []);

  useEffect(() => {
    setInvisible(false)
    setNotiList(notification);
  }, [notification]);

  useEffect(() => {
    if (start > 0) {
      notiApi
        .getList({
          _start: 5 * start,
          _limit: 5,
          _sort: "createdAt:DESC",
        })
        .then((response) => {
          setNotiList([...notiList, ...response]);
        });
    }
  }, [start]);

  return (
    <UncontrolledDropdown direction="left" className="me-3">
      <DropdownToggle onClick={() => !invisible && setInvisible(true)} className="border-0 shadow-none bg-light p-1">
        <Badge variant="dot" invisible={invisible} color="error">
          <Notifications className="app--primary" />
        </Badge>
      </DropdownToggle>
      <DropdownMenu
        className="col-lg-12 position-absolute shadow"
        style={{
          minWidth: "400px",
          maxWidth: "400px",
        }}
      >
        <DropdownItem header>
          <Typography className="fw-bold text-dark py-3 fs-6">
            Thông báo hệ thống
          </Typography>
        </DropdownItem>
        <Divider className="border border-1" />
        <Box
          style={{
            height: "450px",
            overflowY: "scroll",
          }}
          className="flex-column justify-content-start"
        >
          {notiList.map((item, index) => {
            let { icon, color, neutral } = handleNotiStyle(item);
            return (
              <div key={index}>
                <DropdownItem
                  onClick={() => handleNavigate(item)}
                  className="d-flex flex-row align-items-start p-4"
                >
                  <Box className={`${neutral} icon-notification p-2 me-3`}>
                    {icon}
                  </Box>
                  <Box sx={{ minWidth: 0 }} className="d-flex flex-column">
                    <Typography className={`${color} fw-bold fs-6`}>
                      {item.title}
                    </Typography>
                    <Typography>{item.sub_title}</Typography>
                    <Box className="d-flex flex-row align-items-center">
                      <History
                        sx={{ fontSize: "20px" }}
                        className="text-secondary me-1"
                      />
                      <Typography sx={{ fontSize: "14px" }}>
                        {moment(item.createdAt).format("DD/MM/YYYY HH:mm")}
                      </Typography>
                    </Box>
                  </Box>
                </DropdownItem>
                <Divider className="border border-1" />
              </div>
            );
          })}
          {notiList.length >= 5 && (
            <Button className="w-100 mt-2" onClick={() => setStart(start + 1)}>
              Xem thêm
            </Button>
          )}
        </Box>
      </DropdownMenu>
    </UncontrolledDropdown>
  );
};

export default AppNotification;
