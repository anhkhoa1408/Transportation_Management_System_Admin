import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  Paper,
  Select,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { connect, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import * as Bonk from "yup";
import shipmentApi from "../../../api/shipmentApi";
import storageApi from "../../../api/storageApi";
import userApi from "../../../api/userApi";
import vehicleApi from "../../../api/vehicleApi";
import { errorNotify, successNotify } from "../../../utils/notification";
import Detail from "./Components/Detail";
import Ship from "./Components/Ship";

const EditShipment = (props) => {
  const location = useLocation();
  const userInfo = useSelector((state) => state.userInfo.user);
  const { role } = userInfo;
  const [data, setData] = useState({
    car: "",
    type: "",
    from_address: {},
    to_address: {},
    from_storage: "",
    to_storage: "",
    shipment_items: [],
  });

  const [car, setCar] = useState("");
  const [cars, setCars] = useState([]);
  const [assistance, setAssistance] = useState("");
  const [assistances, setAssistances] = useState([]);
  const [shipmentData, setShipments] = useState([]);

  const [stockers, setStockers] = useState([]);
  const [selectStockers, setSelectStockers] = useState([]);
  const [date, setDate] = useState();

  const handleSubmit = (type) => {
    let _car = cars.find(item => item.id === car)
    if (type === "update") {
      shipmentApi
        .update(location.state.id, {
          ...data,
          assistance: assistance ? assistance : null,
          car: _car && _car.id ? _car.id : null,
          driver :_car && _car.manager && _car.manager.id ? _car.manager.id : null,
        })
        .then((response) => {
          successNotify("Cập nhật thành công");
          setData(response);
        })
        .catch((error) => {
          errorNotify("Cập nhật thất bại");
        });
    } else {
      shipmentApi
        .update(location.state.id, {
          assistance: null,
          car: null,
          driver: null,
        })
        .then((response) => {
          successNotify("Cập nhật thành công");
          setData(response);
        })
        .catch((error) => {
          errorNotify("Cập nhật thất bại");
        });
    }
  };

  useEffect(() => {
    if (location?.state?.id) {
      shipmentApi
        .getDetail(location.state.id)
        .then((response) => {
          setData(response);
          setCar(response.car)
          setAssistance(response.assistance)
          let storageQuery =
            response.from_storage && response.to_storage
              ? response.from_storage
              : response.from_storage && !response.to_storage
              ? response.from_storage
              : response.to_storage;
          return Promise.all([
            userApi.getStaffs({
              type: "Assistance",
              storage: storageQuery.id,
            }),
            vehicleApi.getList({
              "manager.storage": storageQuery.id,
            }),
            shipmentApi.getItemList({
              shipment: response.id,
            }),
          ]);
        })
        .then((response) => {
          setAssistances(response[0]);
          setCars(response[1]);
          setShipments(response[2]);
        })
        .catch((error) => errorNotify("Có lỗi xảy ra"));
    }
  }, []);

  return (
    <Box className="p-4">
      <Grid item sm={12} md={12} className="p-4">
        <Paper className="shadow-sm mb-3 p-4">
          <Box className="p-2 mb-3 d-flex fle-row justify-content-between">
            <Box>
              <Typography variant="h6">Chi tiết</Typography>
              <Typography variant="subtitle2">
                Thông tin chi tiết chuyến xe vận chuyển hàng
              </Typography>
            </Box>
            <Box>
              <Button
                variant="outlined"
                onClick={() => handleSubmit("cancel")}
                className="me-2"
                color="error"
              >
                Tạm ngưng
              </Button>
              <Button variant="outlined" onClick={() => handleSubmit("update")}>
                Lưu
              </Button>
            </Box>
          </Box>
          <Grid container>
            <Grid item sm={12} md={6}>
              <Detail
                detail={data}
                cars={cars}
                assistances={assistances}
                car={car}
                setCar={setCar}
                assistance={assistance}
                setAssistance={setAssistance}
              />
            </Grid>
            <Grid item sm={12} md={6}>
              {/* <Detail /> */}
              <Ship shipmentData={shipmentData} />
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Box>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(EditShipment);
