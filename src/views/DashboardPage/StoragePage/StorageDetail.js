import {
  Box,
  Button,
  Grid,
  InputAdornment,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { connect, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import storageApi from "../../../api/storageApi";
import { errorNotify, successNotify } from "../../../utils/notification";
import * as Bonk from "yup";
import { joinAddress } from "../../../utils/address";
import moment from "moment";
import userApi from "../../../api/userApi";
import TimePicker from "../../../components/DatePicker";
import AdminDetail from "./Detail/AdminDetail";
import StockerDetail from "./Detail/StockerDetail";

const StorageDetail = (props) => {
  const location = useLocation();
  const userInfo = useSelector((state) => state.userInfo.user);
  const { role } = userInfo;
  const [data, setData] = useState({
    name: "",
    address: "",
    size: "",
    store_managers: [
      {
        id: "",
        name: "",
      },
    ],
    createdAt: new Date(),
  });

  const [stockers, setStockers] = useState([]);
  const [selectStockers, setSelectStockers] = useState([]);
  const [date, setDate] = useState();

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: data,
    validationSchema: Bonk.object({
      name: Bonk.string().required("Thông số bắt buộc"),
      size: Bonk.number().min(0, "Lớn hơn 0").required("Thông số bắt buộc"),
    }),
    onSubmit: (values) => {
      if (location?.state?.create) {
        handleCreate(values);
      } else {
        handleSubmit(values);
      }
    },
  });

  const handleSubmit = (values) => {
    storageApi
      .update(location.state.id, {
        ...values,
        store_managers: selectStockers,
      })
      .then((response) => {
        successNotify("Cập nhật thành công");
        setData(response);
        setSelectStockers(response.store_managers.map((item) => item.id));
      })
      .catch((error) => {
        errorNotify("Cập nhật thất bại");
      });
  };

  const handleCreate = (values) => {
    storageApi
      .create({
        store_managers: selectStockers,
        name: values.name,
        size: values.size,
      })
      .then((response) => {
        console.log(response);
        successNotify("Cập nhật thành công");
        setData(response);
        setSelectStockers(response.store_managers.map((item) => item.id));
      })
      .catch((error) => {
        errorNotify("Cập nhật thất bại");
      });
  };

  const handleChangeStocker = (e) => {
    let { value } = e.target;
    setSelectStockers(value);
  };

  useEffect(() => {
    if (location?.state?.id) {
      Promise.all([
        storageApi.getDetail(location.state.id),
        role.name === "Admin"
          ? userApi.getStaffs({
              type: "Stocker",
              _limit: 1000
            })
          : [],
      ]).then((response) => {
        setData(response[0]);
        setDate(response[0].createdAt);
        setSelectStockers(response[0].store_managers.map((item) => item.id));
        setStockers(response[1].staffs);
      });
    } else {
      userApi
        .getStaffs({
          type: "Stocker",
        })
        .then((response) => {
          setStockers(response.staffs);
        });
    }
  }, []);

  return (
    <Box className="p-4">
      <Grid container className="p-4" direction="column">
        <Grid item md={12} className="d-flex flex-column">
          <Paper className="d-flex flex-column p-4 rounded-top col-md-11 align-self-center shadow-sm">
            <Box className="px-5 py-2">
              <Grid container className="mt-3 mb-4">
                <Grid item md={8} sm={8}>
                  <Typography variant="h6">
                    Thông tin kho
                  </Typography>
                </Grid>
                <Grid
                  item
                  md={4}
                  sm={4}
                  className="d-flex flex-row justify-content-end"
                >
                  {role.name === "Admin" && (
                    <Button
                      variant="outlined"
                      className="app-btn app-btn--success"
                      onClick={formik.submitForm}
                    >
                      Lưu
                    </Button>
                  )}
                </Grid>
              </Grid>

              {role.name === "Admin" ? (
                <AdminDetail
                  formik={formik}
                  stockers={stockers}
                  selectStockers={selectStockers}
                  handleChangeStocker={handleChangeStocker}
                />
              ) : (
                <StockerDetail
                  formik={formik}
                  stockers={stockers}
                  selectStockers={selectStockers}
                  handleChangeStocker={handleChangeStocker}
                />
              )}
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(StorageDetail);
