import {
  Box,
  Button,
  Grid,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import userApi from "../../../api/userApi";
import AvatarUpload from "../../../components/Upload/AvatarUpload";
import * as Bonk from "yup";
import { handleUserRole } from "../../../utils/role";
import Detail from "./Detail/Detail";
import storageApi from "../../../api/storageApi";
import { errorNotify, successNotify } from "../../../utils/notification";

const StaffInfo = (props) => {
  const location = useLocation();
  const [avatar, setAvatar] = useState(null);
  const [storage, setStorage] = useState([]);
  const [data, setData] = useState({
    name: "",
    email: "",
    phone: "",
    type: "Stocker",
    storage: {
      id: "",
    },
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      ...data,
      storage: data?.storage?.id,
    },
    validationSchema: Bonk.object({
      name: Bonk.string().required("Thông số bắt buộc"),
      phone: Bonk.string().required("Thông số bắt buộc"),
      email: Bonk.string().required("Thông số bắt buộc"),
      type: Bonk.string().required("Thông số bắt buộc"),
    }),
    onSubmit: (values) => {
      if (location?.state?.create) {
        // handleCreate(values)
      } else {
        handleUpdate(values);
      }
    },
  });
  const handleUpdate = (values) => {
    userApi
      .update(location.state.id)
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

  const handleCreate = (values) => {};

  useEffect(() => {
    if (location?.state?.id) {
      userApi.staffDetail(location.state.id).then((response) => {
        setData(response);
        if (response.avatar) {
          setAvatar(process.env.MAIN_URL + response.avatar.url);
        }
      });
    }
    storageApi.getList().then((response) => {
      setStorage(response);
    });
  }, []);

  return (
    <Box className="p-4">
      <Grid item md={12} className="p-4 d-flex flex-column">
        <Paper className="d-flex flex-column p-4 rounded-top col-md-11 align-self-center shadow-sm">
          <Box className="d-flex flex-row align-items-center px-5 py-2">
            <AvatarUpload avatar={avatar} setAvatar={setAvatar} />
            <Box className="flex-grow-1">
              <Typography variant="h5">
                {data.name || "Tên nhân viên"}
              </Typography>
              <Typography
                variant="h5"
                className="fs-6 mt-2 text-success fw-bold"
              >
                {handleUserRole(data.type)}
              </Typography>
            </Box>
            <Button variant="outlined" color="error" className="me-3">
              Xoá người dùng
            </Button>
            <Button
              variant="contained"
              className="app-primary-bg-color"
              onClick={formik.submitForm}
            >
              Lưu
            </Button>
          </Box>
          <Box className="px-5 py-2">
            <Typography className="mt-3 mb-4 fs-5 fw-bold">
              Thông tin chi tiết
            </Typography>

            <Detail formik={formik} storage={storage} />
          </Box>
        </Paper>
      </Grid>
    </Box>
  );
};

export default StaffInfo;
