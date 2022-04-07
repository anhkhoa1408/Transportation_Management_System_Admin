import {
  Box,
  Button,
  Grid, Paper, Typography
} from "@mui/material";
import { useFormik } from "formik";
import moment from "moment";
import React, { useEffect, useMemo, useState } from "react";
import { useHistory } from "react-router-dom";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import ReactTable from "react-table-v6";
import * as Bonk from "yup";
import userApi from "../../../api/userApi";
import vehicleApi from "../../../api/vehicleApi";
import { CustomPagination } from "../../../components/CustomPagination";
import LoadingTable from "../../../components/LoadingTable";
import { errorNotify, successNotify } from "../../../utils/notification";
import useScroll from "../../../utils/useScroll";
import Detail from "./Detail/Detail";
import ConfirmAlert from "../../../components/Alert/ConfirmAlert";


const VehicleDetail = (props) => {
  const location = useLocation();
  const history = useHistory();
  const [drivers, setDrivers] = useState([]);
  const [brokens, setBrokens] = useState([]);
  const [alert, setAlert] = useState(null);

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
      manager: Bonk.string().required("Thông tin bắt buộc"),
    }),
    onSubmit: (values) => {
      if (location?.state?.id) {
        handleUpdate(values);
      } else if (location?.state?.create) {
        handleCreate(values);
      }
    },
  });

  const handleUpdate = (values) => {
    vehicleApi
      .update(location.state.id, {
        type: values.type,
        manager: values.manager,
        load: values.load,
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

  const handleCreate = (values) => {
    vehicleApi
      .create({
        licence: values.licence,
        type: values.type,
        manager: values.manager,
        load: values.load,
        size: {
          ...values.size,
          len: values.len,
          width: values.width,
          height: values.height,
        },
      })
      .then((response) => {
        successNotify("Cập nhật thành công");
        history.push("/vehicle");
      })
      .catch((error) => {
        errorNotify("Cập nhật thất bại");
      });
  };

  const handleBrokens = (data) => {
    let newData = data.map((item, index) => {
      return {
        ...item,
        stt: index + 1,
        time: moment(item.time).format("DD/MM/YYYY HH:mm"),
      };
    });

    setBrokens(newData);
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

  const handleDelete = () => {
    if (location?.state?.id) {
      setAlert(null);
      vehicleApi
        .delete(location.state.id)
        .then((response) => {
          history.push("/vehicle");
          successNotify("Xóa thành công");
        })
        .catch((error) => {
          errorNotify("Xóa thất bại");
        });
    }
  };

  const handleConfirm = () => {
    setAlert(
      <ConfirmAlert
        onClose={() => setAlert(null)}
        onConfirm={handleDelete}
        confirmBtnText={"Chấp nhận"}
        cancelBtnText={"Hủy bỏ"}
        title="Bạn có thật sự muốn xóa thông tin này không ?"
      />,
    );
  };

  useEffect(() => {
    if (location?.state?.id) {
      Promise.all([
        vehicleApi.getDetail(location.state.id),
        userApi.getStaffs({ type: "Driver" }),
        vehicleApi.getBroken({ car: location.state.id }),
      ])
        .then((response) => {
          setData(response[0]);
          setDrivers(response[1]);
          handleBrokens(response[2]);
        })
        .catch((error) => {
          errorNotify("Có lỗi xảy ra");
        });
    } else if (location?.state?.create) {
      userApi
        .getStaffs({ type: "Driver" })
        .then((response) => {
          let data = response.staffs.filter((item) => !item?.car);
          setDrivers({
            ...response,
            staffs: data,
          });
        })
        .catch((error) => {
          errorNotify("Có lỗi xảy ra");
        });
    }
  }, []);

  useScroll("detail-header");

  return (
    <Grid className="p-4">
      {alert}
      <Grid
        item
        md={12}
        className="pt-4 px-4 d-flex flex-column position-sticky header-sticky"
      >
        <Paper
          id="detail-header"
          className="d-flex flex-column px-4 pt-2 rounded-top col-md-11 align-self-center shadow-none"
        >
          <Box className="px-4 py-2">
            <Grid container className="my-3">
              <Grid item md={8}>
                <Typography className="fs-5 fw-bold">
                  Thông tin phương tiện
                </Typography>
              </Grid>
              <Grid item md={4} className="d-flex flex-row justify-content-end">
                {
                  location?.state?.id && <Button
                  onClick={handleConfirm}
                  variant="outlined"
                  color="error"
                  className="me-2"
                >
                  Xóa
                </Button>
                }
                <Button
                  onClick={formik.submitForm}
                  variant="outlined"
                  color="success"
                >
                  Lưu
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Grid>
      <Detail formik={formik} drivers={drivers} />

      {!location?.state?.create && (
        <Grid item className="px-4">
          <Grid className="p-5" item md={12} xs={12}>
            <Paper
              className="p-4 shadow-none"
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
                className="-striped -highlight"
              />
            </Paper>
          </Grid>
        </Grid>
      )}
    </Grid>
  );
};

export default VehicleDetail;
