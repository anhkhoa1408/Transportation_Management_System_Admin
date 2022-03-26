import { Download } from "@mui/icons-material";
import {
  Box,
  Button,
  Grid,
  InputAdornment,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useLocation } from "react-router-dom";
import reportApi from "../../../api/reportApi";
import { errorNotify, successNotify } from "../../../utils/notification";
import * as Bonk from "yup";
import { useFormik } from "formik";
import moment from "moment";
import Detail from "./Detail/Detail";
import useScroll from "../../../utils/useScroll";
import voucherApi from "../../../api/voucherApi";

const VoucherDetail = (props) => {
  const location = useLocation();
  const [data, setData] = useState({
    name: "",
    description: "",
    customer_type: "All",
    sale: 0,
    sale_max: 0,
    sale_type: "percentage",
    minimum_order: 0,
    voucher_img: {
      url: "",
    },
    expired: new Date()
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: data,
    validationSchema: Bonk.object({
      name: Bonk.string().required("Thông tin bắt buộc"),
      description: Bonk.string().required("Thông tin bắt buộc"),
      customer_type: Bonk.string().required("Thông tin bắt buộc"),
      sale_type: Bonk.string().required("Thông tin bắt buộc"),
      sale: Bonk.number()
        .required("Thông tin bắt buộc")
        .test("sale-test", "Giá trị không hợp lệ", (value, ctx) => {
          if (ctx.parent.sale_type === "percentage") {
            return value > 100 || value <= 1 ? false : true;
          } else {
            return value < 10000 ? false : true;
          }
        })
        ,
      sale_max: Bonk.number()
        .min(1000, "Giá trị không hợp lệ")
        .required("Thông tin bắt buộc"),
      minimum_order: Bonk.number()
        .min(1000, "Giá trị không hợp lệ")
        .required("Thông tin bắt buộc"),
    }),
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  const handleSubmit = (values) => {
    voucherApi
      .update(location.state.id, values)
      .then((response) => {
        successNotify("Cập nhật thành công");
        setData({
          ...data,
          ...response,
        });
      })
      .catch((error) => {
        errorNotify("Cập nhật thất bại");
      });
  };

  useEffect(() => {
    if (location?.state?.id) {
      voucherApi
        .getDetail(location.state.id)
        .then((response) => {
          console.log(response)
          setData(response);
        })
        .catch((error) => {
          errorNotify("Có lỗi xảy ra");
        });
    }
  }, [location.state.id]);

  useScroll("detail-header");

  return (
    <Grid container className="p-4">
      <Grid
        item
        md={12}
        className="pt-4 px-4 position-sticky d-flex flex-column header-sticky"
      >
        <Paper
          id="detail-header"
          className="d-flex flex-column px-4 rounded-top col-md-11 align-self-center shadow-none"
        >
          <Box className="px-4 py-2">
            <Grid container className="my-3">
              <Grid item md={8}>
                <Typography className="fs-5 fw-bold">
                  Chi tiết mã giảm giá
                </Typography>
              </Grid>
              <Grid item md={4} className="d-flex flex-row justify-content-end">
                <Button
                  variant="outlined"
                  color="success"
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
        <Paper className="d-flex flex-column px-4 pt-1 rounded-top col-md-11 align-self-center shadow-none">
          <Box className="px-4">
            <Detail formik={formik} />
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default VoucherDetail;
