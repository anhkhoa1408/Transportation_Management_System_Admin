import React, { useEffect, useMemo, useState } from "react";
import { connect } from "react-redux";
import {
  Avatar,
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  Paper,
  TextField,
  Typography,
  Select,
  MenuItem,
  InputAdornment,
} from "@mui/material";
import ReactTable from "react-table-v6";
import { Add, FilterList } from "@mui/icons-material";
import { CustomPagination } from "../../../components/CustomPagination";
import { useHistory } from "react-router-dom";
import img from "./../../../assets/img/delivery.jpg";

const VehicleDetail = (props) => {
  const [data, setData] = useState([
    {
      id: 1,
      name: "aaa",
      phone: "aaa",
      rank: "aaa",
      dateOfBirth: "14/08/2000",
    },
  ]);

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
                      Thông tin phương tiện
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
                    >
                      Lưu lại
                    </Button>
                  </Grid>
                </Grid>

                <Grid container md={12} className="px-1 mb-4">
                  <Grid
                    item
                    md={3}
                    className="align-items-center d-flex flex-row"
                  >
                    <Typography>Biển số</Typography>
                  </Grid>
                  <Grid item md={9}>
                    <TextField
                      fullWidth
                      label="Biển số"
                      inputProps={{
                        style: {
                          backgroundColor: "#F8F9FA",
                        },
                      }}
                    />
                  </Grid>
                </Grid>
                <Grid container className="px-1 mb-4">
                  <Grid
                    item
                    md={3}
                    className="align-items-center d-flex flex-row"
                  >
                    <Typography>Tải trọng</Typography>
                  </Grid>
                  <Grid item md={9}>
                    <TextField
                      fullWidth
                      label="Tải trọng"
                      inputProps={{
                        style: {
                          backgroundColor: "#F8F9FA",
                        },
                      }}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="start">kg</InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                </Grid>
                <Grid container className="px-1 mb-4">
                  <Grid
                    item
                    md={3}
                    className="align-items-center d-flex flex-row"
                  >
                    <Typography>Số điện thoại</Typography>
                  </Grid>
                  <Grid item md={9}>
                    <TextField
                      fullWidth
                      label="Số điện thoại"
                      inputProps={{
                        style: {
                          backgroundColor: "#F8F9FA",
                        },
                      }}
                    />
                  </Grid>
                </Grid>
                <Grid container className="px-1 mb-4">
                  <Grid
                    item
                    md={3}
                    className="align-items-center d-flex flex-row"
                  >
                    <Typography>Thuộc kho</Typography>
                  </Grid>
                  <Grid item md={9}>
                    <TextField
                      fullWidth
                      label="Kho"
                      inputProps={{
                        style: {
                          backgroundColor: "#F8F9FA",
                        },
                      }}
                    />
                  </Grid>
                </Grid>
                <Grid container className="px-1 mb-4">
                  <Grid
                    item
                    md={3}
                    className="align-items-center d-flex flex-row"
                  >
                    <Typography>Người quản lý</Typography>
                  </Grid>
                  <Grid item md={9}>
                    <TextField
                      fullWidth
                      label="Người quản lý"
                      inputProps={{
                        style: {
                          backgroundColor: "#F8F9FA",
                        },
                      }}
                    />
                  </Grid>
                </Grid>
                <Grid item md={12} className="px-1 mb-4">
                  <Typography className="fw-bold fs-6">
                    Kích thước thùng hàng
                  </Typography>
                </Grid>
                <Grid container className="px-1 mb-4">
                  <Grid
                    item
                    md={3}
                    className="align-items-center d-flex flex-row"
                  >
                    <Typography>Chiều dài</Typography>
                  </Grid>
                  <Grid item md={9}>
                    <TextField
                      fullWidth
                      label="Chiều dài"
                      inputProps={{
                        style: {
                          backgroundColor: "#F8F9FA",
                        },
                      }}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="start">cm</InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                </Grid>
                <Grid container className="px-1 mb-4">
                  <Grid
                    item
                    md={3}
                    className="align-items-center d-flex flex-row"
                  >
                    <Typography>Chiều rộng</Typography>
                  </Grid>
                  <Grid item md={9}>
                    <TextField
                      fullWidth
                      label="Chiều rộng"
                      inputProps={{
                        style: {
                          backgroundColor: "#F8F9FA",
                        },
                      }}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="start">cm</InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                </Grid>
                <Grid container className="px-1 mb-4">
                  <Grid
                    item
                    md={3}
                    className="align-items-center d-flex flex-row"
                  >
                    <Typography>Chiều cao</Typography>
                  </Grid>
                  <Grid item md={9}>
                    <TextField
                      fullWidth
                      label="Chiều cao"
                      inputProps={{
                        style: {
                          backgroundColor: "#F8F9FA",
                        },
                      }}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="start">cm</InputAdornment>
                        ),
                      }}
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

export default connect(mapStateToProps, mapDispatchToProps)(VehicleDetail);
