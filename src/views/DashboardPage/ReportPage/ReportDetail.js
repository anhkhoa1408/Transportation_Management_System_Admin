import { Download } from "@mui/icons-material";
import { Box, Button, Grid, Paper, Typography } from "@mui/material";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useLocation } from "react-router-dom";
import {
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
} from "reactstrap";
import * as Bonk from "yup";
import reportApi from "../../../api/reportApi";
import { exportExcel } from "../../../services/export";
import { errorNotify, successNotify } from "../../../utils/notification";
import useScroll from "../../../utils/useScroll";
import Detail from "./Detail/Detail";

const ReportDetail = (props) => {
  const location = useLocation();
  const [data, setData] = useState({
    stocker: {
      name: "",
    },
    storage: {
      name: "",
      address: "",
    },
    total_import: 0,
    total_export: 0,
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: data,
    validationSchema: Bonk.object({
      total_import: Bonk.number()
        .min(1, "Lớn hơn 0")
        .required("Thông số bắt buộc"),
      total_export: Bonk.number()
        .min(1, "Lớn hơn 0")
        .required("Thông số bắt buộc"),
    }),
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  const handleSubmit = (values) => {
    reportApi
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

  const handleExport = (type) => {
    reportApi
      .createReport(data.storage.id, {
        type: type,
      })
      .then((response) => {
        exportExcel(response);
        successNotify("Xuất báo cáo thành công");
      })
      .catch((error) => {
        errorNotify("Xuất báo cáo thất bại");
      });
  };

  useEffect(() => {
    if (location?.state?.id) {
      reportApi
        .getDetail(location.state.id)
        .then((response) => {
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
                  Chi tiết báo cáo
                </Typography>
              </Grid>
              <Grid item md={4} className="d-flex flex-row justify-content-end">
                {/* <Button
                  variant="contained"
                  className="app-primary-bg-color me-2"
                  endIcon={<Download />}
                  onClick={handleExport}
                >
                  Xuất báo cáo
                </Button> */}
                <UncontrolledDropdown>
                  <DropdownToggle className="app-primary-bg-color shadow-sm me-2 border-0">
                    XUẤT BÁO CÁO
                  </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem onClick={() => handleExport("today")}>
                      Báo cáo hôm nay
                    </DropdownItem>
                    <DropdownItem onClick={() => handleExport("week")}>
                      Báo cáo tuần
                    </DropdownItem>
                    <DropdownItem onClick={() => handleExport("month")}>
                      Báo cáo tháng
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
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

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ReportDetail);
