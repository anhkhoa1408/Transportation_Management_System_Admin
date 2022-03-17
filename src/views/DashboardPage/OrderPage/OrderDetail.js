import { ArrowDropDown } from "@mui/icons-material";
import { Box, Button, Divider, Grid, Paper, Typography } from "@mui/material";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import {
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
} from "reactstrap";
import orderApi from "../../../api/orderApi";
import * as Bonk from "yup";
import Detail from "./Detail/Detail";

const OrderDetail = (props) => {
  const history = useHistory();
  const location = useLocation();

  const [data, setData] = useState([
    {
      id: 1,
      name: "aaa",
      phone: "aaa",
      rank: "aaa",
      dateOfBirth: "14/08/2000",
    },
  ]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: data,
    validationSchema: Bonk.object({
      receiver_name: Bonk.string().required(),
      receiver_phone: Bonk.string().required(),
      sender_name: Bonk.string().required(),
      sender_phone: Bonk.string().required(),
    }),
  });

  useEffect(() => {
    if (location?.state?.id) {
      orderApi
        .getDetail(location.state.id)
        .then((response) => setData(response));
    }
  }, [location]);

  return (
    <>
      <Box className="p-3 position-sticky">
        <Grid container className="p-4" direction="column">
          <Grid item md={12} className="d-flex flex-column">
            <Paper className="d-flex flex-column p-4 rounded-top col-md-11 align-self-center shadow-sm">
              <Box className="px-4 py-2">
                <Grid container direction="column">
                  <Grid
                    id="detail-header"
                    container
                    direction="row"
                    className="mb-1 bg-white position-sticky"
                  >
                    <Grid item sm={3} md={4} className="">
                      <Typography className="mt-3 mb-4 fs-5 fw-bold">
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
                </Grid>
                <Detail />
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(OrderDetail);
