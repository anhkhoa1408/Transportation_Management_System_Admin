import { Box, Button, Grid, Paper, Typography } from "@mui/material";
import clsx from "clsx";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";
import * as Bonk from "yup";
import userApi from "../../../api/userApi";
import ConfirmAlert from "../../../components/Alert/ConfirmAlert";
import AvatarUpload from "../../../components/Upload/AvatarUpload";
import { errorNotify, successNotify } from "../../../utils/notification";
import { handleUserRole } from "../../../utils/role";
import CustomerOrderList from "./CustomerOrderList";
import Detail from "./Detail.js/Detail";

const Customer = (props) => {
  const location = useLocation();
  const history = useHistory();

  const [avatar, setAvatar] = useState(null);
  const [data, setData] = useState({
    name: "",
    email: "",
    phone: "",
    type: "Iron",
    address: "",
    username: "",
    birthday: new Date(),
  });
  const [alert, setAlert] = useState(null);
  const [activeTab, setActive] = useState("1");

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      ...data,
    },
    validationSchema: Bonk.object({
      name: Bonk.string().required("Thông số bắt buộc"),
      username: Bonk.string().required("Thông số bắt buộc"),
      phone: Bonk.string().required("Thông số bắt buộc"),
      email: Bonk.string().required("Thông số bắt buộc"),
      type: Bonk.string().required("Thông số bắt buộc"),
    }),
    onSubmit: (values) => {
      if (location?.state?.id) {
        handleUpdate(values);
      }
    },
  });

  const handleUpdate = (values) => {
    userApi
      .update(location.state.id, {
        name: values.name,
        email: values.email,
        phone: values.phone,
        type: values.type,
        birthday: values.birthday,
      })
      .then((response) => {
        setData(response);
        successNotify("Cập nhật thành công");
      })
      .catch((error) => {
        errorNotify("Cập nhật thất bại");
      });
    if (avatar && avatar.path) {
      userApi
        .updateAvatar(avatar, location.state.id, data?.avatar?.id)
        .then((response) => {
          setAvatar(process.env.MAIN_URL + response.avatar.url);
          successNotify("Cập nhật ảnh đại diện thành công");
        })
        .catch((error) => {
          errorNotify("Cập nhật ảnh đại diện thất bại");
        });
    }
  };

  // const handleCreate = (values) => {
  //   let userData = {
  //     name: values.name,
  //     username: values.username,
  //     email: values.email,
  //     phone: values.phone,
  //     type: values.type,
  //     password: values.password,
  //     birthday: values.birthday
  //   };
  //   userApi
  //     .create(userData)
  //     .then((response) => {
  //       successNotify("Thêm nhân viên thành công");
  //       if (avatar && avatar.path) {
  //         return userApi.updateAvatar(avatar, response.id, "");
  //       }
  //     })
  //     .then((response) => {
  //       if (response) {
  //         successNotify("Thêm ảnh đại diện thành công");
  //       }
  //       history.push("/staff");
  //     })
  //     .catch((error) => {
  //       errorNotify("Thêm nhân viên thất bại");
  //     });
  // };

  const handleBlock = (value) => {
    if (location?.state?.id) {
      setAlert(null);
      userApi
        .update(location.state.id, {
          ...data,
          blocked: value,
        })
        .then((response) => {
          setData(response);
          successNotify(
            `${value ? "Khóa" : "Kích hoạt"} tài khoản thành công`,
          );
        })
        .catch((error) => {
          errorNotify(`${value ? "Khóa" : "Kích hoạt"} tài khoản thất bại`);
        });
    }
  };

  const handleConfirm = () => {
    setAlert(
      <ConfirmAlert
        onClose={() => setAlert(null)}
        onConfirm={() => handleBlock(data.blocked ? false : true)}
        confirmBtnText={"Chấp nhận"}
        cancelBtnText={"Hủy bỏ"}
        title={`Bạn có thật sự muốn ${
          data.blocked ? "kích hoạt" : "khóa"
        } tài khoản này không ?`}
      />,
    );
  };

  useEffect(() => {
    if (location?.state?.id) {
      userApi.staffDetail(location.state.id).then((response) => {
        setData(response);
        if (response.avatar) {
          setAvatar(process.env.MAIN_URL + response.avatar.url);
        }
      });
    }
  }, []);

  return (
    <Grid container className="px-5 py-4">
      {alert}
      <Grid item md={12} sm={12} className="p-4 d-flex flex-column">
        <Paper className="d-flex flex-column p-2 rounded-top w-100 align-self-center shadow-sm">
          <Box className="d-flex flex-row align-items-center px-5 py-2">
            <AvatarUpload avatar={avatar} setAvatar={setAvatar} />
            <Box className="flex-grow-1">
              <Typography variant="h6">
                {data.name || "Tên nhân viên"}
              </Typography>
              <Typography
                variant="h5"
                className="fs-6 mt-2 app--success fw-bold"
              >
                {handleUserRole(data.type)}
              </Typography>
            </Box>
            <Button variant="outlined" className={data.blocked ? "app-btn app-btn--success" : "app-btn app-btn--danger"} onClick={handleConfirm}>
              {data.blocked ? "kích hoạt" : "khóa"}
            </Button>
          </Box>
          <Box className="px-5 py-2">
            <Nav tabs className="my-2 border-none">
              <NavItem>
                <NavLink
                  className={clsx("cursor-pointer", {
                    active: activeTab === "1",
                  })}
                  onClick={() => setActive("1")}
                >
                  Thông tin chi tiết
                </NavLink>
              </NavItem>
              {location?.state?.id && (
                <NavItem>
                  <NavLink
                    className={clsx("cursor-pointer", {
                      active: activeTab === "2",
                    })}
                    onClick={() => setActive("2")}
                  >
                    Đơn hàng
                  </NavLink>
                </NavItem>
              )}
            </Nav>
          </Box>
        </Paper>
      </Grid>

      <Grid item md={12} sm={12} className="px-4 py-2">
        <Paper className="p-2 w-100 shadow-sm">
          <Box className="px-5">
            <TabContent activeTab={activeTab}>
              <TabPane tabId="1">
                <Box className="d-flex flex-row py-3 mb-4 align-items-center justify-content-between border-bottom">
                  <Typography variant="h6">
                    Thông tin người dùng
                  </Typography>
                  <Button variant="outlined" className="app-btn app-btn--success" onClick={formik.submitForm}>
                    Lưu
                  </Button>
                </Box>
                <Detail formik={formik} />
              </TabPane>

              <TabPane tabId="2">
                <Typography className="py-3 mb-4 w-100 border-bottom" variant="h6">
                  Đơn hàng
                </Typography>
                <CustomerOrderList />
              </TabPane>
            </TabContent>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Customer;
