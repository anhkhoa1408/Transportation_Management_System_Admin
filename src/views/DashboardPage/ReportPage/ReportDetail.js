import { Box, Button, Grid, Paper, Typography } from "@mui/material";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import * as Bonk from "yup";
import reportApi from "../../../api/reportApi";
import storageApi from "../../../api/storageApi";
import useScroll from "../../../hooks/useScroll";
import { exportExcel } from "../../../services/export";
import { errorNotify, successNotify } from "../../../utils/notification";
import Detail from "./Detail/Detail";

const ReportDetail = (props) => {
  const location = useLocation();
  const history = useHistory();

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
    note: "",
    type: "day",
  });
  const [storages, setStorages] = useState([]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: data,
    validationSchema: Bonk.object({
      storage: Bonk.object().required("Chưa chọn kho"),
    }),
    onSubmit: (values) => {
      if (location?.state?.id) {
        handleSubmit(values);
      } else {
        handleCreate(values);
      }
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

  const handleCreate = (values) => {
    if (!values.storage.id) {
      errorNotify("Chưa chọn kho");
      return;
    }
    reportApi
      .createReport(values.storage.id, {
        type: values.type,
        note: values.note,
      })
      .then((response) => {
        successNotify("Tạo báo cáo thành công");
        history.push("/report/detail", {
          id: response.id,
        });
      })
      .catch((error) => {
        errorNotify("Tạo báo cáo thất bại");
      });
  };

  const handleExport = () => {
    reportApi
      .getDetail(location?.state?.id)
      .then((response) => {
        exportExcel(JSON.parse(response.report));
      })
      .catch((error) => {
        errorNotify("Không thể xuất báo cáo");
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
    } else {
      storageApi
        .getList({
          _limit: 100,
        })
        .then((response) => {
          setStorages(response);
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
        sm={12}
        className="pt-4 px-4 position-sticky d-flex flex-column header-sticky"
      >
        <Paper
          id="detail-header"
          className="d-flex flex-column px-4 rounded-top col-md-11 align-self-center shadow-none"
        >
          <Box className="px-4 py-2">
            <Grid container className="my-3">
              <Grid item md={8} sm={6}>
                <Typography variant="h6">
                  {location?.state?.id ? "Chi tiết báo cáo" : "Tạo báo cáo"}
                </Typography>
              </Grid>
              <Grid item md={4} sm={6} className="d-flex flex-row justify-content-end">
                {location?.state?.id ? (
                  <>
                    <Button
                      variant="contained"
                      className="app-bg--primary me-2"
                      // endIcon={<Download />}
                      onClick={handleExport}
                    >
                      Xuất báo cáo
                    </Button>
                    <Button
                      variant="outlined"
                      className="app-btn app-btn--success"
                      onClick={formik.submitForm}
                    >
                      Lưu
                    </Button>
                  </>
                ) : (
                  <Button
                    variant="outlined"
                    className="app-btn app-btn--success"
                    onClick={formik.submitForm}
                  >
                    Tạo
                  </Button>
                )}
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Grid>

      <Grid item md={12} sm={12} className="px-4 d-flex flex-column">
        <Paper className="d-flex flex-column px-4 pt-1 rounded-top col-md-11 align-self-center shadow-none">
          <Box className="px-4">
            <Detail formik={formik} storages={storages} />
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ReportDetail);
