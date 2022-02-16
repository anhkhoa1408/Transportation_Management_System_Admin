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
} from "@mui/material";
import ReactTable from "react-table-v6";
import { Add, FilterList } from "@mui/icons-material";
import { CustomPagination } from "../../../components/CustomPagination";
import { useHistory } from "react-router-dom";
import img from "./../../../assets/img/delivery.jpg";

const StaffInfo = (props) => {
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
            <Box className="d-flex flex-row align-items-center px-5 py-2">
              <Avatar
                sx={{
                  width: 80,
                  height: 80,
                }}
                className="me-4"
              />
              <Box className="flex-grow-1">
                <Typography variant="h5">Yoga shiber</Typography>
                <Typography
                  variant="h5"
                  className="fs-6 mt-2 text-success fw-bold"
                >
                  Thủ kho
                </Typography>
              </Box>
              <Button variant="outlined" color="error" className="me-3">
                Xoá người dùng
              </Button>
              <Button variant="contained" className="app-primary-bg-color">
                Lưu lại
              </Button>
            </Box>
            <Box className="px-5 py-2">
              <Grid container direction="column">
                <Typography className="mt-3 mb-4 fs-5 fw-bold">
                  Thông tin chi tiết
                </Typography>
                <Grid container md={12} className="mb-4">
                  <Grid
                    item
                    md={3}
                    className="align-items-center d-flex flex-row"
                  >
                    <Typography>Họ và tên</Typography>
                  </Grid>
                  <Grid item md={9}>
                    <TextField
                      fullWidth
                      label="Họ và tên"
                      inputProps={{
                        style: {
                          backgroundColor: "#F8F9FA",
                        },
                      }}
                    />
                  </Grid>
                </Grid>
                <Grid container className="mb-4">
                  <Grid
                    item
                    md={3}
                    className="align-items-center d-flex flex-row"
                  >
                    <Typography>Địa chỉ email</Typography>
                  </Grid>
                  <Grid item md={9}>
                    <TextField
                      fullWidth
                      label="Email"
                      inputProps={{
                        style: {
                          backgroundColor: "#F8F9FA",
                        },
                      }}
                    />
                  </Grid>
                </Grid>
                <Grid container className="mb-4">
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
                <Grid container className="mb-4">
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
                <Grid container className="mb-4">
                  <Grid
                    item
                    md={3}
                    className="align-items-center d-flex flex-row"
                  >
                    <Typography>Chức vụ</Typography>
                  </Grid>
                  <Grid item md={9}>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={10}
                      fullWidth
                      label="Chức vụ"
                      // onChange={handleChange}
                      inputProps={{
                        style: {
                          backgroundColor: "#F8F9FA",
                        },
                      }}
                    >
                      <MenuItem value={10}>Thủ kho</MenuItem>
                      <MenuItem value={20}>Tài xế</MenuItem>
                      <MenuItem value={30}>Phụ xe</MenuItem>
                    </Select>
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

export default connect(mapStateToProps, mapDispatchToProps)(StaffInfo);
