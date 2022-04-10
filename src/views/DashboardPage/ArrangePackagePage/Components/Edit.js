import { Grid3x3, Search } from "@mui/icons-material";
import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect } from "react";
import { PopoverBody, PopoverHeader, UncontrolledPopover } from "reactstrap";
import packageApi from "../../../../api/packageApi";
import storageApi from "../../../../api/storageApi";
import userApi from "../../../../api/userApi";
import vehicleApi from "../../../../api/vehicleApi";
import { joinAddress } from "../../../../utils/address";
import { errorNotify } from "../../../../utils/notification";

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
}) => {
  useEffect(() => {
    storageApi
      .getList()
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
    setPackages([]);
    if (type) {
      let provinces = storages
        .find((item) => item.id === storage)
        .provinces.map((item) => item.name);
      if (type === "collect") {
        packageApi
          .getUnCollect(storage, {
            from_address: JSON.stringify({
              city: provinces,
            }),
            state_in: [0, 1],
          })
          .then((response) => {
            let temp = response.map((item, index) => ({
              value: {
                ...item,
                address: item.to_address,
                packages: item.packages,
              },
              label: joinAddress(item.from_address),
            }));

            let store = storages.find((item) => item.id === storage);
            setListTo([
              {
                value: store,
                label: store.name,
              },
            ]);
            setListFrom(temp);
            setTo(store);
          })
          .catch((error) => {
            errorNotify("Có lỗi xảy ra khi lấy danh sách đơn hàng");
          });
      } else if (type === "ship") {
        packageApi
          .getUnShip(storage, {
            to_address: JSON.stringify({
              city: provinces,
            }),
            state: 3,
          })
          .then((response) => {
            let temp = response.map((item) => ({
              value: {
                ...item,
                address: item.to_address,
                packages: item.packages,
              },
              label: joinAddress(item.to_address),
            }));
            let store = storages.find((item) => item.id === storage);
            setListFrom([
              {
                value: store,
                label: store.name,
              },
            ]);
            setListTo(temp);
            setFrom(store);
          })
          .catch((error) => {
            errorNotify("Có lỗi xảy ra khi lấy danh sách đơn hàng");
          });
      } else {
        let store = storages.find((item) => item.id === storage);
        packageApi
          .getUnArrange(storage, {
            state: 2,
          })
          .then((response) => {
            setPackages(response);
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
          })
          .catch((error) => {
            errorNotify("Có lỗi xảy ra khi lấy danh sách kiện hàng trong kho");
          });
      }
    }
  }, [type]);

  useEffect(() => {
    // setCar("")
    // setAssistance("")
    if (storage) {
      if (type) {
        let store = storages.find((item) => item.id === storage);
        setListFrom([
          {
            value: store,
            label: store.name,
          },
        ]);
        setFrom(store);
        setTo("");
      }

      userApi
        .getStaffs({
          type: "Assistance",
          storage: storage,
        })
        .then((response) => {
          setAssistances(response.staffs);
        })
        .catch((error) => {
          errorNotify("Có lỗi xảy ra");
        });
    }
  }, [storage]);

  useEffect(() => {
    setCar("");
    setAssistance("");
    if (storage && type) {
      vehicleApi
        .getList({
          "manager.storage": storage,
          type: type === "interdepart" ? "Container" : "Truck",
        })
        .then((response) => {
          setCars(response);
        });
    }
  }, [storage, type]);

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
              <InputLabel>Kho</InputLabel>
              <Select
                fullWidth
                label="Loại hình"
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

          <Grid item sm={12} md={12} className="p-2">
            <FormControl fullWidth>
              <InputLabel>Loại hình</InputLabel>
              <Select
                fullWidth
                label="Loại hình"
                value={type}
                onChange={(e) =>
                  storage ? setType(e.target.value) : setType("")
                }
              >
                <MenuItem value="collect">Thu gom hàng</MenuItem>
                <MenuItem value="ship">Giao hàng</MenuItem>
                <MenuItem value="interdepart">Vận chuyển liên tỉnh</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          {type !== "interdepart" && (
            <Grid item sm={12} md={12} className="p-2">
              <Grid container direction="row">
                <Grid item sm={11} md={11}>
                  <FormControl fullWidth>
                    <InputLabel>Đơn hàng</InputLabel>
                    <Select
                      fullWidth
                      label="Loại hình"
                      value={type === "collect" ? from : to}
                      onChange={(e) => {
                        if (type === "ship") {
                          setTo(e.target.value);
                          if (e.target.value.packages)
                            setPackages(e.target.value.packages);
                        } else {
                          setFrom(e.target.value);
                          if (e.target.value.packages)
                            setPackages(e.target.value.packages);
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
                              {item.label}
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
              <FormControl fullWidth>
                <InputLabel>Nơi đi</InputLabel>
                <Select
                  fullWidth
                  label="Nơi đi"
                  value={from}
                  onChange={(e) => {
                    setFrom(e.target.value);
                    if (e.target.value.packages)
                      setPackages(e.target.value.packages);
                  }}
                >
                  {listFrom.map((item, index) => (
                    <MenuItem key={index} value={item.value}>
                      {item.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item md={6} sm={6} className="p-2">
              <FormControl fullWidth>
                <InputLabel>Nơi đến</InputLabel>
                <Select
                  fullWidth
                  label="Nơi đến"
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
                  onChange={(e) => {
                    setCar(e.target.value);
                  }}
                >
                  {cars.map((item) => (
                    <MenuItem key={item.id} value={item}>
                      {`${item.licence} - tải trọng: ${item.load} kg`}
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
