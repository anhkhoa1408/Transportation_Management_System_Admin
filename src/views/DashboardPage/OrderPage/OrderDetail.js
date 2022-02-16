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
  Divider,
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

const OrderDetail = (props) => {
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
                  <Grid item md={8}>
                    <Typography className="mt-3 mb-4 fs-5 fw-bold">
                      Thông tin chi tiết
                    </Typography>
                  </Grid>

                  <Grid
                    item
                    md={4}
                    className="d-flex flex-row align-items-center justify-content-end"
                  >
                    <Button
                      variant="outlined"
                      color="error"
                      className="me-2 py-1"
                    >
                      Huỷ đơn hàng
                    </Button>
                    <UncontrolledDropdown direction="left">
                      <DropdownToggle className="app-primary-bg-color py-1">
                        TUỲ CHỌN
                        <ArrowDropDown />
                      </DropdownToggle>
                      <DropdownMenu className="shadow p-0">
                        <DropdownItem
                          className="py-3 px-4"
                          onClick={() => history.push("/package")}
                        >
                          Xem kiện hàng
                        </DropdownItem>
                        <Divider className="app-primary-color" />

                        <DropdownItem className="py-3 px-4">
                          Phản hồi
                        </DropdownItem>
                      </DropdownMenu>
                    </UncontrolledDropdown>
                  </Grid>
                </Grid>

                <Grid container className="mb-4">
                  <Grid
                    item
                    md={3}
                    className="align-items-center d-flex flex-row"
                  >
                    <Typography>Mã đơn hàng</Typography>
                  </Grid>
                  <Grid item md={9}>
                    <TextField
                      disabled
                      fullWidth
                      label="Mã đơn hàng"
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
                    <Typography>Từ</Typography>
                  </Grid>
                  <Grid item md={9}>
                    <TextField
                      fullWidth
                      label="Từ"
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
                    <Typography>Người gửi</Typography>
                  </Grid>
                  <Grid item md={9}>
                    <TextField
                      fullWidth
                      label="Người gửi"
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
                    <Typography>SDT người gửi</Typography>
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
                    <TextField
                      fullWidth
                      label="Đến"
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
                    <Typography>Người nhận</Typography>
                  </Grid>
                  <Grid item md={9}>
                    <TextField
                      fullWidth
                      label="Người nhận"
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
                    <Typography>SDT người nhận</Typography>
                  </Grid>
                  <Grid item md={9}>
                    <TextField
                      fullWidth
                      label="SDT người nhận"
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
                    <Typography>Vị trí hiện tại</Typography>
                  </Grid>
                  <Grid item md={9}>
                    <TextField
                      fullWidth
                      label="Vị trí hiện tại"
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
                    <Typography>Thời gian đặt hàng</Typography>
                  </Grid>
                  <Grid item md={9}>
                    <TextField
                      fullWidth
                      label="Thời gian đặt hàng"
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
                    <Typography>Tổng chi phí</Typography>
                  </Grid>
                  <Grid item md={9}>
                    <TextField
                      fullWidth
                      label="Tổng chi phí"
                      inputProps={{
                        style: {
                          backgroundColor: "#F8F9FA",
                        },
                      }}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="start">VND</InputAdornment>
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
                    <Typography>Chi phí còn lại</Typography>
                  </Grid>
                  <Grid item md={9}>
                    <TextField
                      fullWidth
                      label="Chi phí còn lại"
                      inputProps={{
                        style: {
                          backgroundColor: "#F8F9FA",
                        },
                      }}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="start">VND</InputAdornment>
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

export default connect(mapStateToProps, mapDispatchToProps)(OrderDetail);
