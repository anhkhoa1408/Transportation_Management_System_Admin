import { Box, Button, Grid, Paper, Typography } from "@mui/material";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import * as Bonk from "yup";
import packageApi from "../../../api/packageApi";
import { errorNotify, successNotify } from "../../../utils/notification";
import useScroll from "../../../hooks/useScroll";
import Detail from "./Detail/Detail";

const PackageDetail = (props) => {
  const location = useLocation();
  const [data, setData] = useState({
    id: "",
    name: "",
    size: {
      len: 0,
      width: 0,
      height: 0,
    },
    weight: 0,
    quantity: 0,
    note: "",
    package_type: "normal",
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      ...data,
      len: data.size.len,
      width: data.size.width,
      height: data.size.height,
    },
    validationSchema: Bonk.object({
      len: Bonk.number().min(0, "Lớn hơn 0").required("Thông số bắt buộc"),
      width: Bonk.number().min(0, "Lớn hơn 0").required("Thông số bắt buộc"),
      height: Bonk.number().min(0, "Lớn hơn 0").required("Thông số bắt buộc"),
      weight: Bonk.number().min(0, "Lớn hơn 0").required("Thông số bắt buộc"),
      quantity: Bonk.number().min(0, "Lớn hơn 0").required("Thông số bắt buộc"),
    }),
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  const handleSubmit = (values) => {
    packageApi
      .update(location.state.id, values)
      .then((response) => {
        console.log(response);
        successNotify("Cập nhật thành công")
        setData({
          ...response,
          size: {
            len: response.size.len,
            width: response.size.width,
            height: response.size.height,
          },
        })
      })
      .catch(error => {
        errorNotify("Cập nhật thất bại")
      })
  };

  useEffect(() => {
    if (location?.state?.id) {
      packageApi
        .getDetail(location.state.id)
        .then((response) => setData(response));
    }
  }, [location.state.id]);

  useScroll("detail-header");

  return (
    <Box className="p-3">
      <Grid
        item
        md={12}
        className="pt-4 px-4 position-sticky d-flex flex-column header-sticky"
      >
        <Paper
          id="detail-header"
          className="d-flex flex-column pt-2 px-4 col-md-11 align-self-center shadow-none"
        >
          <Box className="px-4 py-2">
            <Grid container direction="row" className="mb-1 bg-white">
              <Grid item sm={3} md={4} className="">
                <Typography className="my-3" variant="h6">
                  Chi tiết kiện hàng
                </Typography>
              </Grid>

              <Grid
                item
                sm={9}
                md={8}
                className="d-flex flex-row align-items-center justify-content-end"
              >
                <Button
                  variant="outlined"
                  className="py-1 app-btn app-btn--success"
                  onClick={formik.submitForm}
                >
                  Lưu
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Grid>

      <Grid item md={12} className="px-4 d-flex flex-column">
        <Paper className="d-flex flex-column col-md-11 align-self-center shadow-none">
          <Detail formik={formik} />
        </Paper>
      </Grid>
    </Box>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(PackageDetail);
