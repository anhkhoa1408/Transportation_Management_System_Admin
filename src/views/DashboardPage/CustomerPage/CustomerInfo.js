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

export const CustomerInfo = (props) => {
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
          {/* <Typography
            variant="h5"
            className="flex-grow-1 fs-5 text-primary mb-3"
          >
            Thông tin khách hàng
          </Typography> */}
          <Paper className="d-flex flex-column p-4 rounded-top col-md-11 align-self-center">
            <Box className="d-flex flex-row align-items-center p-4">
              <Avatar
                sx={{
                  width: 100,
                  height: 100,
                  marginRight: "40px",
                }}
              />
              <Box className="flex-grow-1">
                <Typography variant="h5">Yoga shiber</Typography>
                <Typography
                  variant="h5"
                  className="fs-6 mt-2 text-success fw-bold"
                >
                  Khách hàng thân thiết
                </Typography>
              </Box>
              <Button variant="outlined">Lưu lại</Button>
            </Box>
            <Box className="px-5 py-2">
              <Grid container spacing={1} direction="column">
                <Grid container md={12} className="px-1 mb-4">
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
                <Grid container className="px-1 mb-4">
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
                <Grid container className="px-1 mb-4">
                  <Grid
                    item
                    md={3}
                    className="align-items-center d-flex flex-row"
                  >
                    <Typography>Loại khách hàng</Typography>
                  </Grid>
                  <Grid item md={9}>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      // value={age}
                      fullWidth
                      label="Khách hàng"
                      // onChange={handleChange}
                      inputProps={{
                        style: {
                          backgroundColor: "#F8F9FA",
                        },
                      }}
                    >
                      <MenuItem value={10}>Ten</MenuItem>
                      <MenuItem value={20}>Twenty</MenuItem>
                      <MenuItem value={30}>Thirty</MenuItem>
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

export default connect(mapStateToProps, mapDispatchToProps)(CustomerInfo);
