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
  Badge,
} from "@mui/material";
import ReactTable from "react-table-v6";
import { Add, Edit, FilterList } from "@mui/icons-material";
import { CustomPagination } from "../../../components/CustomPagination";
import { useHistory } from "react-router-dom";
import img from "./../../../assets/img/delivery.jpg";

export const AccountPage = (props) => {
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
              <Badge
                className="me-4"
                overlap="circular"
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                badgeContent={
                  <Box
                    className="btn app-primary-bg-color p-1"
                    sx={{ borderRadius: "50px" }}
                  >
                    <Edit className="text-white" size="small" />
                  </Box>
                }
              >
                <Avatar
                  sx={{
                    width: 80,
                    height: 80,
                  }}
                />
              </Badge>
              <Box className="flex-grow-1">
                <Typography className="fs-2">Xin chào</Typography>
                <Typography variant="h5" className="fs-6 mt-1 fw-bold">
                  Nguyễn Anh Khoa
                </Typography>
              </Box>
            </Box>
            <Box className="px-5 py-2">
              <Grid container direction="column">
                <Box className="d-flex flex-row mt-3 mb-4 align-items-center justify-content-between">
                  <Typography className="fs-5 fw-bold">
                    Thông tin cá nhân
                  </Typography>
                  <Button variant="outlined">Lưu lại</Button>
                </Box>
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
                    <Typography>Địa chỉ</Typography>
                  </Grid>
                  <Grid item md={9}>
                    <TextField
                      fullWidth
                      label="Địa chỉ"
                      inputProps={{
                        style: {
                          backgroundColor: "#F8F9FA",
                        },
                      }}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid container spacing={1} direction="column">
                <Box className="d-flex flex-row mt-3 mb-4 align-items-center justify-content-between">
                  <Typography className="fs-5 fw-bold">Đổi mật khẩu</Typography>
                  <Button variant="outlined">Xác nhận</Button>
                </Box>
                <Grid container md={12} className="mb-4">
                  <Grid
                    item
                    md={3}
                    className="align-items-center d-flex flex-row"
                  >
                    <Typography>Mật khẩu hiện tại</Typography>
                  </Grid>
                  <Grid item md={9}>
                    <TextField
                      fullWidth
                      type="password"
                      label="Mật khẩu hiện tại"
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
                    <Typography>Mật khẩu mới</Typography>
                  </Grid>
                  <Grid item md={9}>
                    <TextField
                      fullWidth
                      type="password"
                      label="Mật khẩu mới"
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
                    <Typography>Xác nhận mật khẩu</Typography>
                  </Grid>
                  <Grid item md={9}>
                    <TextField
                      fullWidth
                      type="password"
                      label="Xác nhận mật khẩu"
                      inputProps={{
                        style: {
                          backgroundColor: "#F8F9FA",
                        },
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

export default connect(mapStateToProps, mapDispatchToProps)(AccountPage);
