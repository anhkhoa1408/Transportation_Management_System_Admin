import { ArrowDropDown } from "@mui/icons-material";
import { Box, Button, Divider, Grid, Paper, Typography } from "@mui/material";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import {
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown
} from "reactstrap";
import * as Bonk from "yup";
import orderApi from "../../../api/orderApi";
import { errorNotify, successNotify } from "../../../utils/notification";
import useScroll from "../../../utils/useScroll";
import Detail from "./Detail/Detail";

const OrderDetail = (props) => {
  const history = useHistory();
  const location = useLocation();

  const [data, setData] = useState({
    id: "",
    sender_name: "",
    sender_phone: "",
    receiver_name: "",
    receiver_phone: "",
    from_address: "",
    to_address: "",
    current_address: "",
    fee: 0,
    remain_fee: 0,
    created_at: "",
    packages: [],
    state: 0,
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: data,
    validationSchema: Bonk.object({
      receiver_name: Bonk.string().required("Thông số bắt buộc"),
      receiver_phone: Bonk.string().required("Thông số bắt buộc"),
      sender_name: Bonk.string().required("Thông số bắt buộc"),
      sender_phone: Bonk.string().required("Thông số bắt buộc"),
      fee: Bonk.number().min(0, "Lớn hơn 0").required("Thông số bắt buộc"),
      remain_fee: Bonk.number()
        .min(0, "Lớn hơn 0")
        .required("Thông số bắt buộc"),
    }),
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  const handleSubmit = (values) => {
    let data = {
      receiver_name: values.receiver_name,
      receiver_phone: values.receiver_phone,
      sender_name: values.sender_name,
      sender_phone: values.sender_phone,
      fee: values.fee,
      remain_fee: values.remain_fee,
    };
    orderApi
      .update(location.state.id, data)
      .then((response) => {
        console.log(response);
        successNotify("Cập nhật thành công");
        setData(response);
      })
      .catch((error) => {
        errorNotify("Cập nhật thất bại");
      });
  };

  const handleReject = () => {
    orderApi
      .update(location.state.id, {
        state: 5,
      })
      .then((response) => {
        successNotify("Cập nhật thành công");
        setData(response);
      })
      .catch((error) => {
        errorNotify("Cập nhật thất bại");
      });
  };

  useEffect(() => {
    if (location?.state?.id) {
      orderApi
        .getDetail(location.state.id)
        .then((response) => setData(response));
    }
  }, [location.state.id]);

  useScroll("detail-header");

  return (
    <Grid container className="p-4">
      <Grid
        item
        md={12}
        className="pt-4 px-4 position-sticky d-flex flex-column header-sticky"
      >
        <Paper
          id="detail-header"
          className="d-flex flex-column pt-2 px-4 col-md-11 align-self-center shadow-none"
        >
          <Box className="px-4 py-2">
            <Grid container direction="row" className="mb-1 bg-white">
              <Grid item sm={3} md={4} className="">
                <Typography className="my-3 fs-5 fw-bold">
                  Thông tin chi tiết
                </Typography>
              </Grid>

              <Grid
                item
                sm={9}
                md={8}
                className="d-flex flex-row align-items-center justify-content-end"
              >
                <Button
                  variant="outlined"
                  color="success"
                  className="me-2 py-1"
                  onClick={formik.submitForm}
                >
                  Lưu
                </Button>
                <UncontrolledDropdown direction="left">
                  <DropdownToggle className="app-primary-bg-color py-1 shadow-sm border-0">
                    TUỲ CHỌN
                    <ArrowDropDown />
                  </DropdownToggle>
                  <DropdownMenu className="shadow p-0">
                    <DropdownItem
                      className="py-3 px-4"
                      onClick={() =>
                        history.push("/package", {
                          packages: data.packages,
                          order: data.id,
                        })
                      }
                    >
                      Xem kiện hàng
                    </DropdownItem>
                    <Divider className="app-primary-color" />

                    <DropdownItem
                      disabled={data.state === 5}
                      className="py-3 px-4 text-danger"
                      onClick={handleReject}
                    >
                      Hủy đơn hàng
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Grid>

      <Grid item md={12} className="px-4 d-flex flex-column">
        <Paper className="d-flex flex-column px-4 rounded-top col-md-11 align-self-center shadow-none">
          <Box className="px-4 py-2">
            <Detail formik={formik} />
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
};


export default OrderDetail;
