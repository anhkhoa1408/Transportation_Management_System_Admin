import { Box, Button, Grid, Paper, Typography } from "@mui/material";
import clsx from "clsx";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";
import * as Bonk from "yup";
import { saveInfoSuccess } from "../../../actions/actions";
import userApi from "../../../api/userApi";
import AvatarUpload from "../../../components/Upload/AvatarUpload";
import { errorNotify, successNotify } from "../../../utils/notification";
import { ChangeInfo } from "./Components/ChangeInfo";
import { ChangePass } from "./Components/ChangePass";

export const AccountPage = (props) => {
  const dispatch = useDispatch();

  const [avatar, setAvatar] = useState(null);
  const [data, setData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    street: "",
    ward: "",
    province: "",
    city: "",
  });
  const [activeTab, setActive] = useState("1");
  const userInfo = useSelector((state) => state.userInfo);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      ...data,
      street: data.address?.street || "",
      ward: data.address?.ward || "",
      province: data.address?.province || "",
      city: data.address?.city || "",
    },
    validationSchema: Bonk.object({
      name: Bonk.string().required("Thông tin bắt buộc"),
      phone: Bonk.string().required("Thông tin bắt buộc"),
      email: Bonk.string().required("Thông tin bắt buộc"),
    }),
    onSubmit: (values) => {
      handleUpdateInfo(values);
    },
  });

  const formikPass = useFormik({
    enableReinitialize: true,
    initialValues: {
      password: "",
      currPass: "",
      confirmPassword: "",
    },
    validationSchema: Bonk.object({
      currPass: Bonk.string().required("Thông tin bắt buộc"),
      password: Bonk.string()
        .required("Thông tin bắt buộc")
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/,
          "Mật khẩu mới phải tối thiểu 8 ký tự, bao gồm chữ in hoa",
        )
        .min(8, "Mật khẩu phải tối thiểu 8 ký tự"),
      confirmPassword: Bonk.string()
        .required("Thông tin bắt buộc")
        .oneOf(
          [Bonk.ref("password"), null],
          "Mật khẩu và xác nhận mật khẩu không khớp",
        )
        .min(8, "Mật khẩu phải tối thiểu 8 ký tự"),
    }),
    onSubmit: (values) => {
      handleUpdatePassword(values);
    },
  });

  const handleUpdateInfo = (values) => {
    let { street, ward, province, city } = values;
    userApi
      .update(data.id, {
        name: values.name,
        email: values.email,
        phone: values.phone,
        address: {
          ...data.address,
          street,
          ward,
          province,
          city,
        },
      })
      .then((response) => {
        setData(response);
        console.log(response);
        dispatch(
          saveInfoSuccess({
            ...userInfo,
            user: response,
          }),
        );
        successNotify("Cập nhật thành công");
      })
      .catch((error) => {
        errorNotify("Cập nhật thất bại");
      });
    if (avatar && avatar.path) {
      userApi
        .updateAvatar(avatar, data.id, data?.avatar?.id)
        .then((response) => {
          let isValidUrl = new RegExp("https://").test(response.avatar.url);
          setAvatar(
            isValidUrl
              ? response.avatar.url
              : process.env.MAIN_URL + response.avatar.url,
          );
          successNotify("Cập nhật ảnh đại diện thành công");
          dispatch(
            saveInfoSuccess({
              ...userInfo,
              user: response,
            }),
          );
        })
        .catch((error) => {
          errorNotify("Cập nhật ảnh đại diện thất bại");
        });
    }
  };

  const handleUpdatePassword = (values) => {
    userApi
      .changePassword(data.id, {
        password: values.currPass,
        newPassword: values.password,
      })
      .then((response) => {
        setData(response);
        successNotify("Cập nhật thành công");
      })
      .catch((error) => {
        errorNotify("Cập nhật thất bại");
      });
  };

  useEffect(() => {
    if (userInfo) {
      setData(userInfo.user);
      if (userInfo?.user?.avatar?.url) {
        let isValidUrl = new RegExp("https://").test(userInfo.user.avatar.url);
        setAvatar(
          isValidUrl
            ? userInfo.user.avatar.url + "?.".concat(Math.random().toString())
            : process.env.MAIN_URL + userInfo.user.avatar.url + "?.".concat(Math.random().toString()),
        );
      }
    }
  }, [userInfo]);

  return (
    <Grid container className="px-5 py-4">
      <Grid
        item
        md={12}
        sm={12}
        className="d-flex flex-column p-4 d-flex flex-column"
      >
        <Paper className="d-flex flex-column pt-2 px-4 rounded-top w-100 align-self-center shadow-sm">
          <Box className="d-flex flex-row align-items-center px-4 py-2">
            <AvatarUpload avatar={avatar} setAvatar={setAvatar} />
            <Box className="flex-grow-1">
              <Typography variant="h6">{data.name || "[Họ và tên]"}</Typography>
              <Typography
                variant="h5"
                className="fs-6 mt-2 text-success fw-bold"
              >
                {/* {handleUserRole(data.type)} */}
              </Typography>
            </Box>
          </Box>
          <Box className="px-4 py-2">
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
              <NavItem>
                <NavLink
                  className={clsx("cursor-pointer", {
                    active: activeTab === "2",
                  })}
                  onClick={() => setActive("2")}
                >
                  Mật khẩu
                </NavLink>
              </NavItem>
            </Nav>
          </Box>

          <Box className="px-5 py-2"></Box>
        </Paper>
      </Grid>

      <Grid item md={12} sm={12} className="px-4 py-2">
        <Paper className="p-2 w-100 shadow-sm">
          <Box className="px-5 py-2">
            <TabContent activeTab={activeTab}>
              <TabPane tabId="1">
                <ChangeInfo formik={formik} />
              </TabPane>

              <TabPane tabId="2">
                <ChangePass formik={formikPass} />
              </TabPane>
            </TabContent>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(AccountPage);
