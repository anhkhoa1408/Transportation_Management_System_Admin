import {
  Box,
  Button,
  Grid,
  InputAdornment,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import { connect } from "react-redux";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import vehicleApi from "../../../api/vehicleApi";
import { errorNotify, successNotify } from "../../../utils/notification";
import useScroll from "../../../utils/useScroll";
import Detail from "./Detail/Detail";
import * as Bonk from "yup";
import { useFormik } from "formik";
import userApi from "../../../api/userApi";
import { useHistory } from "react-router-dom";
import ReactTable from "react-table-v6";
import { CustomPagination } from "../../../components/CustomPagination";
import LoadingTable from "../../../components/LoadingTable";
import { useQueryTable } from "./../../../utils/queryUtils.js";
import moment from "moment";

const VehicleDetail = (props) => {
  const location = useLocation();
  const [drivers, setDrivers] = useState([]);
  const [brokens, setBrokens] = useState([]);
  const [data, setData] = useState({
    id: 1,
    licence: "",
    load: "",
    storage: {
      name: "",
    },
    manager: {
      name: "",
      id: "",
    },
    size: {
      len: 0,
      width: 0,
      height: 0,
    },
    type: "Container",
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      ...data,
      manager: data?.manager?.id || "",
      len: data.size.len,
      width: data.size.width,
      height: data.size.height,
    },
    validationSchema: Bonk.object({
      len: Bonk.number().min(1, "Lớn hơn 0").required("Thông số bắt buộc"),
      width: Bonk.number().min(1, "Lớn hơn 0").required("Thông số bắt buộc"),
      height: Bonk.number().min(1, "Lớn hơn 0").required("Thông số bắt buộc"),
      load: Bonk.number().min(1, "Lớn hơn 0").required("Thông số bắt buộc"),
    }),
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  const handleSubmit = (values) => {
    vehicleApi
      .update(location.state.id, {
        type: values.type,
        manager: values.manager,
        size: {
          ...values.size,
          len: values.len,
          width: values.width,
          height: values.height,
        },
      })
      .then((response) => {
        successNotify("Cập nhật thành công");
        setData({
          ...response,
          len: response.size.len,
          width: response.size.width,
          height: response.size.height,
        });
      })
      .catch((error) => {
        errorNotify("Cập nhật thất bại");
      });
  };

  const columns = useMemo(
    () => [
      {
        Header: "STT",
        accessor: "stt",
        filterable: false,
        width: 150,
      },
      {
        Header: "Thời gian trục trặc",
        accessor: "time",
        filterable: false,
        width: 400,
      },
      {
        Header: "Lý do",
        accessor: "note",
        filterable: false,
      },
    ],
    [],
  );

  const handleBrokens = (data) => {
    let newData = data.map((item, index) => {
      return {
        ...item,
        stt: index + 1,
        time: moment(item.time).format("DD/MM/YYYY HH:mm")
      }
    })

    setBrokens(newData)
  }

  useEffect(() => {
    if (location?.state?.id) {
      Promise.all([
        vehicleApi.getDetail(location.state.id),
        userApi.getStaffs({ type: "Driver" }),
        vehicleApi.getBroken({car: location.state.id})
      ])

        .then((response) => {
          setData(response[0]);
          setDrivers(response[1]);
          handleBrokens(response[2])
        })
        .catch((error) => {
          errorNotify("Có lỗi xảy ra");
        });
    }
  }, [location.state.id]);

  useScroll("detail-header");

  return (
    <Grid className="p-4">
      <Grid
        item
        md={12}
        className="pt-4 px-4 d-flex flex-column position-sticky header-sticky"
      >
        <Paper
          id="detail-header"
          className="d-flex flex-column px-4 rounded-top col-md-11 align-self-center shadow-none"
        >
          <Box className="px-4 pt-2">
            <Grid container className="my-3">
              <Grid item md={8}>
                <Typography className="fs-5 fw-bold">
                  Thông tin phương tiện
                </Typography>
              </Grid>
              <Grid item md={4} className="d-flex flex-row justify-content-end">
                <Button
                  onClick={formik.submitForm}
                  variant="contained"
                  className="app-primary-bg-color"
                >
                  Lưu
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Grid>
      <Detail formik={formik} drivers={drivers} />

      <Grid item className="px-4">
        <Grid className="mt-3 p-5" item md={12} xs={12}>
          <Paper
            className="p-4 shadow-sm"
            sx={{
              borderTopRightRadius: 0,
              borderTopLeftRadius: 0,
            }}
          >
            <Typography className="fs-5 fw-bold mb-4">
            Trạng thái xe
          </Typography>
            <ReactTable
              noDataText="Không có dữ liệu"
              data={brokens}
              columns={columns}
              previousText={"<"}
              nextText={">"}
              rowsText={"hàng"}
              ofText="/"
              LoadingComponent={LoadingTable}
              defaultPageSize={5}
              showPaginationBottom={true}
              sortable={false}
              resizable={false}
              PaginationComponent={CustomPagination}
              // pages={1}
              className="-striped -highlight"
            />
          </Paper>
        </Grid>
      </Grid>
    </Grid>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(VehicleDetail);
