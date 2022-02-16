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
import { Add, ArrowDropDown, FilterList } from "@mui/icons-material";
import { CustomPagination } from "../../../components/CustomPagination";
import { useHistory } from "react-router-dom";
import img from "./../../../assets/img/delivery.jpg";
import {
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
} from "reactstrap";

const PackageDetail = (props) => {
  const history = useHistory();
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
                <Grid container direction="row" className="mb-1">
                  <Grid item md={12}>
                    <Typography className="mt-3 mb-4 fs-5 fw-bold">
                      Chi tiết kiện hàng
                    </Typography>
                  </Grid>
                </Grid>

                <Grid container className="mb-4">
                  <Grid
                    item
                    md={3}
                    className="align-items-center d-flex flex-row"
                  >
                    <Typography>Mã QR</Typography>
                  </Grid>
                  <Grid item md={9}>
                    <TextField
                      disabled
                      fullWidth
                      label="Mã QR"
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
                    <Typography>Tên kiện hàng</Typography>
                  </Grid>
                  <Grid item md={9}>
                    <TextField
                      fullWidth
                      label="Tên kiện hàng"
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
                <Grid container className="mb-4">
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
                <Grid container className="mb-4">
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
                <Grid container className="mb-4">
                  <Grid
                    item
                    md={3}
                    className="align-items-center d-flex flex-row"
                  >
                    <Typography>Số lượng</Typography>
                  </Grid>
                  <Grid item md={9}>
                    <TextField
                      fullWidth
                      label="SDT người gửi"
                      inputProps={{
                        style: {
                          backgroundColor: "#F8F9FA",
                        },
                      }}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="start">Cái</InputAdornment>
                        ),
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
                    <Typography>Đến</Typography>
                  </Grid>
                  <Grid item md={9}>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={1}
                      fullWidth
                      label="Loại"
                      // onChange={handleChange}
                      inputProps={{
                        style: {
                          backgroundColor: "#F8F9FA",
                        },
                      }}
                    >
                      <MenuItem value={1}>Dễ vỡ</MenuItem>
                      <MenuItem value={2}>Vải</MenuItem>
                      <MenuItem value={3}>Gia dụng</MenuItem>
                    </Select>
                  </Grid>
                </Grid>
                <Grid container className="mb-4">
                  <Grid
                    item
                    md={3}
                    className="align-items-center d-flex flex-row"
                  >
                    <Typography>Ghi chú</Typography>
                  </Grid>
                  <Grid item md={9}>
                    <TextField
                      multiline
                      rows={3}
                      fullWidth
                      label="Ghi chú"
                      inputProps={{
                        style: {
                          // backgroundColor: "#F8F9FA",
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

export default connect(mapStateToProps, mapDispatchToProps)(PackageDetail);
