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
import { connect } from "react-redux";
import { useLocation } from "react-router-dom";
import storageApi from "../../../api/storageApi";
import { errorNotify, successNotify } from "../../../utils/notification";
import * as Bonk from "yup";
import { joinAddress } from "../../../utils/address";
import moment from "moment";
import userApi from "../../../api/userApi";
import TimePicker from "../../../components/DatePicker";

const StorageDetail = (props) => {
  const location = useLocation();
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
        handleCreate(values)
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
        console.log(response);
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
        size: values.size
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
        userApi.getStaffs({
          type: "Stocker",
        }),
      ]).then((response) => {
        setData(response[0]);
        setDate(response[0].createdAt);
        setSelectStockers(response[0].store_managers.map((item) => item.id));
        setStockers(response[1].staffs);
      });
    } else {
      userApi.getStaffs({
        type: "Stocker",
      }).then((response) => {
        setStockers(response.staffs);
      });
    }
  }, []);

  return (
    <Box className="p-4">
      <Grid container className="p-4" direction="column">
        <Grid item md={12} className="d-flex flex-column">
          <Paper className="d-flex flex-column p-4 rounded-top col-md-11 align-self-center">
            <Box className="px-5 py-2">
              <Grid container spacing={1} direction="column">
                <Grid container className="mt-3 mb-4">
                  <Grid item md={8}>
                    <Typography className="fs-5 fw-bold">
                      Thông tin kho
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    md={4}
                    className="d-flex flex-row justify-content-end"
                  >
                    <Button
                      variant="contained"
                      className="app-primary-bg-color"
                      onClick={formik.submitForm}
                    >
                      Lưu lại
                    </Button>
                  </Grid>
                </Grid>

                <Grid container md={12} className="mb-4">
                  <Grid
                    item
                    md={3}
                    className="align-items-center d-flex flex-row"
                  >
                    <Typography>Tên kho</Typography>
                  </Grid>
                  <Grid item md={9}>
                    <TextField
                      fullWidth
                      label="Tên kho"
                      inputProps={{
                        style: {
                          backgroundColor: "#F8F9FA",
                        },
                      }}
                      {...formik.getFieldProps("name")}
                    />
                  </Grid>
                </Grid>
                <Grid container className="mb-4">
                  <Grid
                    item
                    md={3}
                    className="align-items-center d-flex flex-row"
                  >
                    <Typography>Địa chỉ</Typography>
                  </Grid>
                  <Grid item md={9}>
                    <TextField
                      {...formik.getFieldProps("address")}
                      fullWidth
                      label="Địa chỉ"
                      inputProps={{
                        style: {
                          backgroundColor: "#F8F9FA",
                        },
                      }}
                      value={
                        formik.values.address &&
                        joinAddress(formik.values.address)
                      }
                      disabled
                    />
                  </Grid>
                </Grid>
                <Grid container className="mb-4">
                  <Grid
                    item
                    md={3}
                    className="align-items-center d-flex flex-row"
                  >
                    <Typography>Diện tích</Typography>
                  </Grid>
                  <Grid item md={9}>
                    <TextField
                      type="number"
                      fullWidth
                      label="Diện tích"
                      inputProps={{
                        style: {
                          backgroundColor: "#F8F9FA",
                        },
                      }}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="start">m²</InputAdornment>
                        ),
                      }}
                      {...formik.getFieldProps("size")}
                    />
                  </Grid>
                </Grid>
                <Grid container className="mb-4">
                  <Grid
                    item
                    md={3}
                    className="align-items-center d-flex flex-row"
                  >
                    <Typography>Thủ kho</Typography>
                  </Grid>
                  <Grid item md={9}>
                    <Select
                      multiple
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      fullWidth
                      label="Loại"
                      inputProps={{
                        style: {
                          backgroundColor: "#F8F9FA",
                        },
                      }}
                      value={selectStockers}
                      onChange={handleChangeStocker}
                    >
                      {stockers.length &&
                        stockers.map((item, index) => (
                          <MenuItem key={index} value={item.id}>
                            {item.name}
                          </MenuItem>
                        ))}
                    </Select>
                  </Grid>
                </Grid>
                <Grid container className="mb-4">
                  <Grid
                    item
                    md={3}
                    className="align-items-center d-flex flex-row"
                  >
                    <Typography>Ngày thành lập</Typography>
                  </Grid>
                  <Grid item md={9}>
                    <TextField
                      fullWidth
                      label="Ngày thành lập"
                      inputProps={{
                        style: {
                          backgroundColor: "#F8F9FA",
                        },
                      }}
                      {...formik.getFieldProps("createdAt")}
                      value={moment(formik.values.createdAt).format(
                        "DD/MM/YYYY",
                      )}
                    />
                  </Grid>
                </Grid>
              </Grid>
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
