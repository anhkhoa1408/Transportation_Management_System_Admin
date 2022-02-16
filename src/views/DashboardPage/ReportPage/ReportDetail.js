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
import { Add, Download, FilterList } from "@mui/icons-material";
import { CustomPagination } from "../../../components/CustomPagination";
import { useHistory } from "react-router-dom";
import img from "./../../../assets/img/delivery.jpg";

const ReportDetail = (props) => {
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
                      Chi tiết báo cáo
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
                      endIcon={<Download />}
                    >
                      Xuất báo cáo
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
                    />
                  </Grid>
                </Grid>
                <Grid container className="mb-4">
                  <Grid
                    item
                    md={3}
                    className="align-items-center d-flex flex-row"
                  >
                    <Typography>Địa chỉ kho</Typography>
                  </Grid>
                  <Grid item md={9}>
                    <TextField
                      fullWidth
                      label="Địa chỉ kho"
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
                    <Typography>Người thực hiện</Typography>
                  </Grid>
                  <Grid item md={9}>
                    <TextField
                      fullWidth
                      label="Người thực hiện"
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
                    <Typography>Thời gian</Typography>
                  </Grid>
                  <Grid item md={9}>
                    <TextField
                      fullWidth
                      label="Tổng nhập"
                      inputProps={{
                        style: {
                          backgroundColor: "#F8F9FA",
                        },
                      }}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="start">Lần</InputAdornment>
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
                    <Typography>Tổng xuất</Typography>
                  </Grid>
                  <Grid item md={9}>
                    <TextField
                      fullWidth
                      label="Tổng xuất"
                      inputProps={{
                        style: {
                          backgroundColor: "#F8F9FA",
                        },
                      }}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="start">Lần</InputAdornment>
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

export default connect(mapStateToProps, mapDispatchToProps)(ReportDetail);
