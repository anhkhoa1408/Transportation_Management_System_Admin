import { Search } from "@mui/icons-material";
import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { PopoverBody, PopoverHeader, UncontrolledPopover } from "reactstrap";
import packageApi from "../../../../api/packageApi";
import storageApi from "../../../../api/storageApi";
import userApi from "../../../../api/userApi";
import vehicleApi from "../../../../api/vehicleApi";
import Loading from "../../../../components/Loading";
import { joinAddress } from "../../../../utils/address";
import { errorNotify } from "../../../../utils/notification";
import orderApi from "./../../../../api/orderApi";

export const Edit = ({
  storage,
  setSelectedStorage,
  storages,
  setStorages,
  type,
  setType,
  from,
  setFrom,
  listFrom,
  setListFrom,
  setPackages,
  to,
  setTo,
  setListTo,
  listTo,
  car,
  setCar,
  cars,
  setCars,
  assistance,
  setAssistance,
  assistances,
  setAssistances,
  shipmentData,
  setShipments,
  initial,
  setInitial,
  setLoading,
}) => {
  const location = useLocation();

  useEffect(() => {
    storageApi
      .getList({
        _limit: 100,
      })
      .then((response) => {
        setStorages(response);
      })
      .catch((error) => {
        errorNotify("Có lỗi xảy ra khi lấy danh sách kho");
      });
  }, []);

  useEffect(() => {
    setFrom("");
    setTo("");
    setCar("");
    setAssistance("");
    setPackages([]);
    setShipments([]);
    setAssistances([]);
    setCars([]);
    if (type === "collect") {
      orderApi
        .getList({
          _limit: 100,
          state_in: [0, 1],
        })
        .then((response) => {
          let temp = response.map((item, index) => ({
            value: {
              ...item,
              address: item.from_address,
              packages: item.packages,
            },
            label: joinAddress(item.from_address),
          }));
          setListFrom(temp);
        });
    } else if (type === "ship") {
      orderApi
        .getList({
          _limit: 100,
          state: 3,
        })
        .then((response) => {
          let temp = response.map((item, index) => ({
            value: {
              ...item,
              address: item.to_address,
              packages: item.packages,
            },
            label: joinAddress(item.to_address),
          }));
          setListTo(temp);
        });
    }
  }, [type]);

  useEffect(() => {
    if (Object.keys(from).length) {
      if (type === "collect") {
        setLoading(<Loading />);
        orderApi
          .getNearestStore(from)
          .then((response) => {
            setTo(response);
            return Promise.all([
              packageApi.getUnCollect(response.id, {
                state_in: [0, 1],
                id: from.id,
              }),
              vehicleApi.getList({
                "manager.storage": response.id,
                type: "Truck",
                _limit: 1000,
              }),
              userApi.getStaffs({
                type: "Assistance",
                storage: storage,
                _limit: 1000,
              }),
            ]);
          })
          .then((response) => {
            setPackages(response[0].packages);
            setInitial({
              ...initial,
              pack: response[0].packages,
            });
            setCars(response[1]);
            setAssistances(response[2].staffs);
            setLoading(null);
          })
          .catch((error) => {
            errorNotify("Có lỗi xảy ra, xin vui lòng thử lại!");
            setLoading(null);
          });
      }
    }
  }, [from]);

  useEffect(() => {
    if (Object.keys(to).length) {
      if (type === "ship") {
        setLoading(<Loading />);
        let address = to.packages[0].current_address;
        orderApi
          .getNearestStore({
            address,
          })
          .then((response) => {
            setFrom(response);
            return Promise.all([
              packageApi.getUnShip(response.id, {
                state: 3,
                id: to.id,
              }),
              vehicleApi.getList({
                "manager.storage": response.id,
                type: "Truck",
                _limit: 1000,
              }),
              userApi.getStaffs({
                type: "Assistance",
                storage: storage,
                _limit: 1000,
              }),
            ]);
          })
          .then((response) => {
            setPackages(response[0].packages);
            setInitial({
              ...initial,
              pack: response[0].packages,
            });
            setCars(response[1]);
            setAssistances(response[2].staffs);
            setLoading(null);
          })
          .catch((error) => {
            errorNotify("Có lỗi xảy ra, xin vui lòng thử lại!");
            setLoading(null);
          });
      }
    }
  }, [to]);

  useEffect(() => {
    if (type === "interdepart") {
      if (storage) {
        setLoading(<Loading />);
        let store = storages.find((item) => item.id === storage);
        return Promise.all([
          packageApi.getUnArrange(storage, {
            state: 2,
          }),
          vehicleApi.getList({
            "manager.storage": storage,
            type: "Container",
            _limit: 1000,
          }),
          userApi.getStaffs({
            type: "Assistance",
            storage: storage,
            _limit: 1000,
          }),
        ])
          .then((response) => {
            setPackages(response[0]);
            setInitial({
              ...initial,
              pack: response[0],
            });
            setListFrom([
              {
                value: store,
                label: store.name,
              },
            ]);
            setListTo(
              storages
                .map((item) => ({
                  value: item,
                  label: item.name,
                }))
                .filter((item) => item.value.id !== storage),
            );
            setFrom(store);
            setCars(response[1]);
            setAssistances(response[2].staffs);
            setLoading(null);
          })
          .catch((error) => {
            errorNotify("Có lỗi xảy ra khi lấy danh sách kiện hàng trong kho");
            setLoading(null);
          });
      }
    }
  }, [storage]);

  useEffect(() => {
    if (location?.state?.order) {
      setType("collect");
      if (listFrom.length) {
        let index = listFrom.findIndex(
          (item) => item.value.id === location.state.order,
        );
        setFrom(listFrom[index].value);
      }
    }
  }, [listFrom]);

  return (
    <Grid item sm={12} md={12}>
      <Paper className="shadow-sm mb-3 p-4">
        <Box className="p-2">
          <Typography variant="h6">Tùy chỉnh</Typography>
          <Typography variant="subtitle2">
            Điều chỉnh các thông tin cần thiết cho chuyến xe nội thành (liên
            tỉnh)
          </Typography>
        </Box>

        <Grid container direction="column">
          <Grid item sm={12} md={12} className="p-2">
            <FormControl fullWidth>
              <InputLabel>Loại hình</InputLabel>
              <Select
                fullWidth
                label="Loại hình"
                value={type}
                onChange={(e) => setType(e.target.value)}
              >
                <MenuItem value="collect">Thu gom hàng</MenuItem>
                <MenuItem value="ship">Giao hàng</MenuItem>
                <MenuItem value="interdepart">Vận chuyển liên tỉnh</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          {type === "interdepart" && (
            <Grid item sm={12} md={12} className="p-2">
              <FormControl fullWidth>
                <InputLabel>Kho</InputLabel>
                <Select
                  fullWidth
                  label="Kho"
                  value={storage}
                  onChange={(e) => setSelectedStorage(e.target.value)}
                >
                  {storages.map((item) => (
                    <MenuItem key={item.id} value={item.id}>
                      {item.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          )}

          {type !== "interdepart" && (
            <Grid item sm={12} md={12} className="p-2">
              <Grid container direction="row">
                <Grid item sm={11} md={11}>
                  <FormControl fullWidth>
                    <InputLabel>Đơn hàng</InputLabel>
                    <Select
                      fullWidth
                      label="Đơn hàng"
                      value={type === "collect" ? from : to}
                      defaultValue={type === "collect" ? from : to}
                      onChange={(e) => {
                        if (type === "ship") {
                          setTo(e.target.value);
                        } else {
                          setFrom(e.target.value);
                        }
                      }}
                    >
                      {type === "collect"
                        ? listFrom.map((item, index) => (
                            <MenuItem key={index} value={item.value}>
                              {item.value.id}
                            </MenuItem>
                          ))
                        : listTo.map((item, index) => (
                            <MenuItem key={index} value={item.value}>
                              {item.value.id}
                            </MenuItem>
                          ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item sm={1} md={1}>
                  <UncontrolledPopover
                    placement="left"
                    trigger="hover"
                    target={"detail-btn"}
                  >
                    <PopoverHeader className="border-0 py-3">
                      Thông tin đơn hàng
                    </PopoverHeader>
                    <PopoverBody
                      className="shadow border-0"
                      style={{ minWidth: 450 }}
                    >
                      {(type === "collect" && from) ||
                      (type === "ship" && to) ? (
                        <>
                          <Grid container className="">
                            <Grid item sm={6} md={6} className="p-1">
                              <Typography className="opacity-50">
                                Từ địa chỉ
                              </Typography>
                              <Typography>
                                {type === "collect"
                                  ? joinAddress(from.from_address)
                                  : joinAddress(to.from_address)}
                              </Typography>
                            </Grid>
                            <Grid item sm={6} md={6} className="p-1">
                              <Typography className="opacity-50">
                                Đến địa chỉ
                              </Typography>
                              <Typography>
                                {type === "collect"
                                  ? joinAddress(from.to_address)
                                  : joinAddress(to.to_address)}
                              </Typography>
                            </Grid>
                          </Grid>
                          <Grid container className="">
                            <Grid item sm={6} md={6} className="p-1">
                              <Typography className="opacity-50">
                                Người gửi
                              </Typography>
                              <Typography>
                                {type === "collect"
                                  ? from.sender_name
                                  : to.sender_name}
                              </Typography>
                            </Grid>
                            <Grid item sm={6} md={6} className="p-1">
                              <Typography className="opacity-50">
                                SDT người gửi
                              </Typography>
                              <Typography>
                                {type === "collect"
                                  ? from.sender_phone
                                  : to.sender_phone}
                              </Typography>
                            </Grid>
                          </Grid>
                          <Grid container className="">
                            <Grid item sm={6} md={6} className="p-1">
                              <Typography className="opacity-50">
                                Người nhận
                              </Typography>
                              <Typography>
                                {type === "collect"
                                  ? from.receiver_name
                                  : to.receiver_name}
                              </Typography>
                            </Grid>
                            <Grid item sm={6} md={6} className="p-1">
                              <Typography className="opacity-50">
                                SDT người nhận
                              </Typography>
                              <Typography>
                                {type === "collect"
                                  ? from.receiver_phone
                                  : to.receiver_phone}
                              </Typography>
                            </Grid>
                          </Grid>
                        </>
                      ) : (
                        <Typography>Chưa có thông tin</Typography>
                      )}
                    </PopoverBody>
                  </UncontrolledPopover>
                  <Button id="detail-btn" className="w-100 h-100">
                    <Search />
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          )}

          <Grid container>
            <Grid item md={6} sm={6} className="p-2">
              <TextField
                label="Nơi đi"
                disabled
                fullWidth
                variant="outlined"
                value={
                  !from.address
                    ? ""
                    : type === "collect"
                    ? joinAddress(from.address)
                    : from.name
                }
              />
            </Grid>
            <Grid item md={6} sm={6} className="p-2">
              {type === "interdepart" ? (
                <FormControl fullWidth>
                  <InputLabel>Nơi đến</InputLabel>
                  <Select
                    fullWidth
                    label="Nơi đến"
                    defaultValue=""
                    value={to}
                    onChange={(e) => {
                      setTo(e.target.value);
                      if (e.target.value.packages)
                        setPackages(e.target.value.packages);
                    }}
                  >
                    {listTo.map((item, index) => (
                      <MenuItem key={index} value={item.value}>
                        {item.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              ) : (
                <TextField
                  label="Nơi đến"
                  disabled
                  fullWidth
                  variant="outlined"
                  value={
                    !to.address
                      ? ""
                      : type === "ship"
                      ? joinAddress(to.address)
                      : to.name
                  }
                />
              )}
            </Grid>
          </Grid>

          <Grid container>
            <Grid item md={6} sm={6} className="p-2">
              <FormControl fullWidth>
                <InputLabel>Xe vận chuyển</InputLabel>
                <Select
                  fullWidth
                  label="Xe vận chuyển"
                  value={car}
                  defaultValue=""
                  onChange={(e) => {
                    setCar(e.target.value);
                  }}
                >
                  {cars.map((item) => (
                    <MenuItem key={item.id} value={item}>
                      {`Biển số: ${item.licence} - tải trọng: ${item.load} kg`}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item md={6} sm={6} className="p-2">
              <FormControl fullWidth>
                <InputLabel>Người hỗ trợ</InputLabel>
                <Select
                  fullWidth
                  label="Xe vận chuyển"
                  defaultValue=""
                  value={assistance}
                  onChange={(e) => setAssistance(e.target.value)}
                >
                  {assistances.map((item) => (
                    <MenuItem key={item.id} value={item.id}>
                      {item.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
};
