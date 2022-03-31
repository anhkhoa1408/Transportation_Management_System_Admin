import {
  ArrowDropDown,
  ArrowRight,
  Check,
  Close,
  ErrorOutline,
  Inventory2,
  Merge,
  Search,
  Sort,
} from "@mui/icons-material";
import {
  Button,
  Checkbox,
  Divider,
  FormControl,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { Box, keys } from "@mui/system";
import clsx from "clsx";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { Collapse, Tooltip, UncontrolledTooltip } from "reactstrap";
import orderApi from "../../../api/orderApi";
import shipmentApi from "../../../api/shipmentApi";
import storageApi from "../../../api/storageApi";
import userApi from "../../../api/userApi";
import vehicleApi from "../../../api/vehicleApi";
import { joinAddress } from "../../../utils/address";
import { errorNotify, successNotify } from "../../../utils/notification";
import useScroll from "../../../utils/useScroll";
import * as Bonk from "yup";
import { validate } from "schema-utils";
import { validateFit } from "../../../services/packing";
import packageApi from "../../../api/packageApi";
import { useHistory } from "react-router-dom";

const Customer = (props) => {
  const history = useHistory();

  const [initial, setInitial] = useState({
    pack: [],
    ship: [],
  });

  const [check, setCheck] = useState(false);

  const [search, setSearch] = useState(false);
  const [split, setSplit] = useState(null);

  const [storage, setSelectedStorage] = useState("");
  const [storages, setStorages] = useState([]);

  const [listFrom, setListFrom] = useState([]);
  const [from, setFrom] = useState("");

  const [listTo, setListTo] = useState([]);
  const [to, setTo] = useState("");

  const [car, setCar] = useState("");
  const [cars, setCars] = useState([]);

  const [assistance, setAssistance] = useState("");
  const [assistances, setAssistances] = useState([]);

  const types = [
    {
      value: "collect",
      label: "Thu gom hàng",
    },
    {
      value: "ship",
      label: "Giao hàng",
    },
    {
      value: "interdepart",
      label: "Vận chuyển liên tỉnh",
    },
  ];
  const [type, setType] = useState("");

  const [orderData, setOrder] = useState();
  const [packageData, setPackages] = useState([]);
  const [shipmentData, setShipments] = useState([]);

  const [exceedPackage, setExceed] = useState([]);

  const [quantity, setQuantity] = useState(1);

  const [validate, setValidate] = useState({});

  const getItemStyle = (isDragging, draggableStyle) => ({
    userSelect: "none",
    padding: "16px",
    margin: `0 0 12px 0`,
    background: "white",
    boxShadow: "0 0 6px 0 rgba(0,0,0,0.1)",
    ...draggableStyle,
  });

  const getListStyle = (isDraggingOver) => ({
    background: isDraggingOver ? "#b6f3fc" : "#F8F9FC",
    padding: "8px",
    height: 500,
    flex: 1,
    margin: "0px 10px",
    overflowY: "auto",
  });

  const onDragEnd = (result) => {
    const { source, destination } = result;
    if (
      !destination ||
      (source.droppableId === "shipDrop" &&
        destination.droppableId === "packDrop")
    ) {
      return;
    }

    const sInd = +source.index;
    const dInd = +destination.index;

    if (source.droppableId === destination.droppableId) {
      const items = reorder(
        source.droppableId === "orderDrop"
          ? orderData
          : source.droppableId === "packDrop"
          ? packageData
          : null,
        sInd,
        dInd,
      );
      if (source.droppableId === "orderDrop") {
        setOrder(items);
      } else if (source.droppableId === "packDrop") {
        setPackages(items);
      } else {
        setShipments(items);
      }
    } else {
      let result;
      if (
        source.droppableId === "packDrop" &&
        destination.droppableId === "shipDrop"
      ) {
        result = move(packageData, shipmentData, source, destination);
      } else {
        result = move(shipmentData, packageData, source, destination);
      }
      setPackages(result.packDrop);
      setShipments(result.shipDrop);
    }
  };

  const move = (source, destination, droppableSource, droppableDestination) => {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const [removed] = sourceClone.splice(droppableSource.index, 1);
    destClone.splice(droppableDestination.index, 0, removed);
    const result = {};
    result[droppableSource.droppableId] = sourceClone;
    result[droppableDestination.droppableId] = destClone;
    return result;
  };

  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };

  const handleSplit = (item, index) => {
    let tempArray = [...packageData];
    let tempPack = {
      ...tempArray[index],
      quantity: quantity,
    };
    console.log(tempArray[index].quantity, quantity);
    tempArray[index] = {
      ...tempArray[index],
      quantity: tempArray[index].quantity - quantity,
    };
    tempArray.splice(tempArray.length, 0, tempPack);
    setPackages(tempArray);
    setSplit(null);
    setExceed([...exceedPackage, tempArray[index]]);
    setQuantity(1);
  };

  const handleCreate = () => {
    if (!shipmentData.length) {
      errorNotify("Chưa thêm kiện hàng");
      return;
    }
    if (!assistance) {
      errorNotify("Chưa thêm nhân viên hỗ trợ");
      return;
    }

    console.log(exceedPackage)

    return
    if (type === "collect" && !check) {
      if (exceedPackage) {
        Promise.all(
          exceedPackage.map((item) =>
            packageApi.update(item.id, {
              ...item,
              len: item.size.len,
              width: item.size.width,
              height: item.size.height,
            }),
          ),
        )
          .then((response) => {})
          .catch((error) => {
            errorNotify("Tạo chuyến xe thất bại");
            return;
          });

        delete to.from_address.id;
        delete to.from_address._id;
        delete to.from_address.__v;
        delete to.to_address.id;
        delete to.to_address._id;
        delete to.to_address.__v;

        let {
          customer,
          note,
          sender_name,
          sender_phone,
          receiver_name,
          receiver_phone,
          name,
          from_address,
          to_address,
        } = to;

        let data = {
          customer: customer.id,
          state: 1,
          note,
          sender_name,
          sender_phone,
          receiver_name,
          receiver_phone,
          name,
          from_address,
          to_address,
          packages: shipmentData
            .filter((item) => !item.shipments)
            .map((item) => {
              let temp = { ...item };
              delete temp.current_address;
              delete temp.id;
              delete temp._id;
              delete temp.__v;
              delete temp.order;
              delete temp.size.id;
              delete temp.size._id;
              delete temp.size.__v;
              return temp;
            }),
        };

        orderApi
          .create(data)
          .then((response) => {
            return shipmentApi.create({
              from_address: {
                street: from.address.street,
                ward: from.address.ward,
                province: from.address.province,
                city: from.address.city,
                longitude: from.address.longitude,
              },
              to_address: {
                street: to.address.street,
                ward: to.address.ward,
                province: to.address.province,
                city: to.address.city,
                longitude: to.address.longitude,
              },
              driver: car.manager.id,
              assistance: assistance,
              packages: response.packages.map((item) => item.id),
            });
          })
          .then((response) => {
            return vehicleApi.update(car.id, {
              ...car,
              type: car.type,
              manager: car.manager.id,
              load: car.load,
              size: car.size,
              shipments: [response.id, ...car.shipments.map((item) => item.id)],
            });
          })
          .then((response) => {
            successNotify("Tạo chuyến xe thành công");
            setCar("");
            setType("");
            setSelectedStorage("");
            setFrom("");
            setTo("");
            setAssistance("");
            setShipments([]);
            setPackages([]);
          })
          .catch((error) => {
            errorNotify("Tạo chuyến xe thất bại");
            return;
          });
      }
    } else if (type !== "collect" || (type === "collect" && check)) {
      let packages = shipmentData
        .filter((pack) => !pack.shipments)
        .map((item) => item.id);
      shipmentApi
        .create({
          from_address: {
            street: from.address.street,
            ward: from.address.ward,
            province: from.address.province,
            city: from.address.city,
            longitude: from.address.longitude,
          },
          to_address: {
            street: to.address.street,
            ward: to.address.ward,
            province: to.address.province,
            city: to.address.city,
            longitude: to.address.longitude,
          },
          driver: car.manager.id,
          assistance: assistance,
          packages: packages,
        })
        .then((response) => {
          return vehicleApi.update(car.id, {
            ...car,
            type: car.type,
            manager: car.manager.id,
            load: car.load,
            size: car.size,
            shipments: [response.id, ...car.shipments.map((item) => item.id)],
          });
        })
        .then((response) => {
          return orderApi.update(to.id, {
            ...to,
            state: type === "collect" ? 1 : 3,
          });
        })
        .then((response) => {
          successNotify("Tạo chuyến xe thành công");
          setCar("");
          setType("");
          setSelectedStorage("");
          setFrom("");
          setTo("");
          setAssistance("");
          setShipments([]);
          setPackages([]);
        })
        .catch((error) => {
          errorNotify("Tạo chuyến xe thất bại");
        });
    }
  };

  const handleQuickSort = () => {
    let isInvalidAll =
      Object.keys(validate).length &&
      packageData.every(
        (item) => validate[item.id] && item.quantity === validate[item.id],
      );
    if (Object.keys(validate).length && !isInvalidAll && !check) {
      let tempShip = [];
      let tempPack = [];
      for (let item of packageData) {
        let unfitPack = packageData.find(
          (pack) =>
            pack.id === Object.keys(validate).find((id) => id === item.id),
        );
        if (!unfitPack) {
          tempShip.push(item);
        } else {
          let unshipPack = {
            ...unfitPack,
            quantity: validate[unfitPack.id],
          };
          tempPack.push(unshipPack);

          if (unfitPack.quantity - validate[unfitPack.id]) {
            let shipPack = {
              ...unfitPack,
              quantity: unfitPack.quantity - validate[unfitPack.id],
            };
            tempShip.push(shipPack);
          }
        }
      }
      setShipments([...shipmentData, ...tempShip]);
      setPackages(tempPack);
      setExceed(tempPack);
    } else if (!Object.keys(validate).length || check) {
      setShipments([...shipmentData, ...packageData]);
      setPackages([]);
    }
  };

  const handleValidate = (packages, car) => {
    setValidate(validateFit(packages, car));
  };

  const handleCancel = () => {
    setShipments(initial.ship);
    setPackages(initial.pack);
  };

  useEffect(() => {
    Promise.all([
      storageApi.getList(),
      userApi.getStaffs({
        type: "Assistance",
      }),
    ])
      .then((response) => {
        setStorages(response[0]);
        setAssistances(response[1].staffs);
      })
      .catch((error) => {
        errorNotify("Có lỗi xảy ra 1");
      });
  }, []);

  useEffect(() => {
    if (storage) {
      vehicleApi
        .getList({
          "manager.storage": storage,
          type: type === "interdepart" ? "Container" : "Truck",
        })
        .then((response) => {
          setCars(response);
          if (response?.shipments && response?.shipments[0]?.assistance?.id) {
            setAssistance(response?.shipments[0]?.assistance?.id);
          }
        })
        .catch((error) => {
          errorNotify("Có lỗi xảy ra 2");
        });
    }
    if (type) {
      let storeAddress = storages.find((item) => item.id === storage)?.address
        ?.city;
      if (type === "collect") {
        orderApi
          .getList({
            from_address: JSON.stringify({
              city: storeAddress,
            }),
            state: 0,
          })
          .then((response) => {
            let temp = response.map((item) => ({
              value: {
                ...item,
                address: item.to_address,
                packages: item.packages,
              },
              label: joinAddress(item.from_address),
            }));

            let store = storages.find((item) => item.id === storage);
            setListFrom([
              {
                value: store,
                label: store.name,
              },
            ]);
            setListTo(temp);
          })
          .catch((error) => {
            errorNotify("Có lỗi xảy ra 3");
          });
      } else if (type === "ship") {
        orderApi
          .getList({
            to_address: JSON.stringify({
              city: storeAddress,
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
            setListTo(temp);
            setListFrom([
              {
                value: store,
                label: store.name,
              },
            ]);
          })
          .catch((error) => {
            errorNotify("Có lỗi xảy ra 4");
          });
      } else {
        let store = storages.find((item) => item.id === storage);
        // let 
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
            .filter((item) => item.value !== storage),
        );
      }
    }
  }, [type, storage]);

  useEffect(() => {
    if (car && car.shipments) {
      let temp = car.shipments
        .map((item) => item.packages)
        .reduce((total, item) => {
          return [...total, ...item];
        }, []);
      Promise.all(temp.map((item) => packageApi.getDetail(item)))
        .then((response) => {
          setPackages(packageData);
          setShipments(response);
          handleValidate([...response, ...packageData], car);
          setInitial({
            pack: packageData,
            ship: response,
          });
        })
        .catch((error) => {
          errorNotify("Có lỗi xảy ra 5");
        });
    }
  }, [car]);

  useScroll("detail-header");

  return (
    <Grid container className="p-5">
      <Grid item sm={12} md={12} className="pt-4 header-sticky">
        <Paper
          id="detail-header"
          className="d-flex flex-row justify-content-between align-items-center px-4 py-3 shadow-sm mb-4"
        >
          <Typography variant="h5">Sắp xếp</Typography>
          <Button onClick={handleCreate}>Tạo</Button>
        </Paper>
      </Grid>

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
                <InputLabel>Danh sách kho</InputLabel>
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
                  onChange={(e) => storage && setType(e.target.value)}
                >
                  {types.map((item) => (
                    <MenuItem value={item.value}>{item.label}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

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
                    {listFrom.map((item) => (
                      <MenuItem key={item.value} value={item.value}>
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
                    {listTo.map((item) => (
                      <MenuItem key={item.value} value={item.value}>
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
                        {item.licence}
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

      <Grid item sm={12} md={12}>
        <Paper className="d-flex flex-column w-100 align-self-center p-4 shadow-sm">
          <Box className="p-2 mb-3">
            <Typography variant="h6">Hàng hóa</Typography>
            <Typography variant="subtitle2">
              Sắp xếp lượng hàng hóa phù hợp cho mỗi chuyến xe
            </Typography>
          </Box>
          <Grid container className="my-2">
            <Grid item md={6} sm={6} className="p-2">
              <Typography>Thể tích còn lại</Typography>
            </Grid>
            <Grid item md={6} sm={6} className="p-2">
              <Typography>Khối lượng còn lại</Typography>
            </Grid>
          </Grid>
          {(type === "collect" || type === "ship") && (
            <Box className="d-flex flex-row align-items-center my-2">
              <Checkbox
                checked={check}
                onChange={(e) => setCheck(e.target.checked)}
              />
              <Typography>Vận chuyển nhiều lần</Typography>
            </Box>
          )}
          <Box className="d-flex flex-row justify-content-between">
            <DragDropContext onDragEnd={onDragEnd}>
              <Droppable key="packageDrop" droppableId="packDrop">
                {(provided, snapshot) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    style={getListStyle(snapshot.isDraggingOver)}
                  >
                    <Box className="py-1">
                      <Box className="d-flex flex-row">
                        <Button
                          className="d-flex flex-row justify-content-between align-items-center w-100 mb-2 app-primary-color flex-grow-1"
                          onClick={() => setSearch(!search)}
                        >
                          <Typography className="my-2">
                            Danh sách kiện hàng
                          </Typography>
                          <ArrowDropDown className="me-2" />
                        </Button>
                        <UncontrolledTooltip flip target="merge-btn">
                          Khôi phục
                        </UncontrolledTooltip>
                        <Button
                          id="merge-btn"
                          className="d-flex flex-row justify-content-center align-items-center mb-2"
                          onClick={handleCancel}
                        >
                          <Merge />
                        </Button>
                        <UncontrolledTooltip flip target="sort-btn">
                          Sắp xếp nhanh
                        </UncontrolledTooltip>
                        <Button
                          id="sort-btn"
                          className="d-flex flex-row justify-content-center align-items-center mb-2 text-warning"
                          onClick={handleQuickSort}
                        >
                          <Sort />
                        </Button>
                      </Box>
                      <Collapse isOpen={search}>
                        <TextField
                          label="Tìm kiếm"
                          className="w-100 mb-2"
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <Search />
                              </InputAdornment>
                            ),
                          }}
                        ></TextField>
                      </Collapse>
                    </Box>
                    {packageData.map((item, index) => (
                      <Draggable
                        key={item.id + index.toString()}
                        draggableId={item.id + index.toString()}
                        index={index}
                      >
                        {(provided, snapshot) => (
                          <div
                            className="d-flex flex-column"
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={getItemStyle(
                              snapshot.isDragging,
                              provided.draggableProps.style,
                            )}
                          >
                            <Box className="d-flex flex-row align-items-start w-100 p-1">
                              <Box className="p-2 bg-color-gray me-3">
                                <Inventory2
                                  className="app-primary-color hover-sm"
                                  sx={{ fontSize: 30 }}
                                ></Inventory2>
                              </Box>
                              <Box className="flex-grow-1">
                                <Typography
                                  variant="subtitle1"
                                  className="fw-bold"
                                >
                                  Tên kiện hàng: {item.name || "Không có"}
                                </Typography>
                                <Typography>
                                  Khối lượng mỗi kiện: {item.weight} kg
                                </Typography>
                                <Typography>
                                  Số lượng: {item.quantity} kiện
                                </Typography>
                              </Box>
                              <Box className="d-flex flex-column justify-content-center h-100 align-items-center">
                                <Button onClick={() => setSplit(index)}>
                                  Tách
                                </Button>
                                {validate[item.id] && (
                                  <>
                                    <UncontrolledTooltip
                                      flip
                                      target={"error-mess-" + index}
                                    >
                                      {item.quantity - validate[item.id] > 0
                                        ? `Tối đa tách được: 
                                        ${
                                          item.quantity - validate[item.id]
                                        } kiện`
                                        : "Không thể tách"}
                                    </UncontrolledTooltip>
                                    <Button
                                      className="d-flex flex-row justify-content-center align-items-center p-3"
                                      color="error"
                                    >
                                      <ErrorOutline
                                        id={"error-mess-" + index}
                                        color="error"
                                        sx={{ fontSize: 20 }}
                                      />
                                    </Button>
                                  </>
                                )}
                              </Box>
                            </Box>
                            <Collapse isOpen={split === index ? true : false}>
                              <Box
                                className={clsx(
                                  "justify-content-center mt-2 py-2 px-1 d-flex flex-row",
                                )}
                              >
                                <TextField
                                  type="number"
                                  label="Số lượng"
                                  className="flex-grow-1 w-100"
                                  onChange={(e) => setQuantity(e.target.value)}
                                  value={quantity}
                                  error={
                                    quantity < 0 ||
                                    quantity > item.quantity ||
                                    !quantity ||
                                    item.quantity - validate[item.id] <= 0
                                  }
                                  helperText={
                                    (quantity < 0 &&
                                      "Số lượng phải lớn hơn 0") ||
                                    (quantity > item.quantity &&
                                      "Số lượng tách phải nhỏ hơn số lượng hiện tại") ||
                                    (!quantity && "Số lượng không hợp lệ")
                                  }
                                ></TextField>
                                <Button
                                  color="success"
                                  disabled={
                                    quantity < 0 ||
                                    quantity > item.quantity ||
                                    !quantity ||
                                    item.quantity - validate[item.id] <= 0
                                  }
                                  onClick={() => handleSplit(item, index)}
                                >
                                  <Check />
                                </Button>
                                <Button
                                  color="error"
                                  onClick={() => {
                                    setSplit(null);
                                    setQuantity(1);
                                  }}
                                >
                                  <Close />
                                </Button>
                              </Box>
                            </Collapse>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>

              <Droppable key="shipDrop" droppableId="shipDrop">
                {(provided, snapshot) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    style={getListStyle(snapshot.isDraggingOver)}
                  >
                    <Box className={clsx("py-1 mb-1")}>
                      <Button
                        className="d-flex flex-row justify-content-between align-items-center w-100 app-primary-color"
                        onClick={() => setSearch(!search)}
                      >
                        <Typography className="my-2">
                          Kiện hàng đã chọn
                        </Typography>
                      </Button>
                    </Box>
                    {shipmentData.map((item, index) => (
                      <Draggable
                        key={item.id + index.toString()}
                        draggableId={item.id + index.toString()}
                        index={index}
                      >
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={getItemStyle(
                              snapshot.isDragging,
                              provided.draggableProps.style,
                            )}
                          >
                            <Box className="d-flex flex-row align-items-start p-1">
                              <Box className="p-2 bg-color-gray me-3">
                                <Inventory2
                                  className="app-primary-color hover-sm"
                                  sx={{ fontSize: 30 }}
                                ></Inventory2>
                              </Box>
                              <Box>
                                <Typography
                                  variant="subtitle1"
                                  className="fw-bold"
                                >
                                  Tên kiện hàng: {item.name || "Không có"}
                                </Typography>
                                <Typography>
                                  Khối lượng: {item.weight} kg
                                </Typography>
                                <Typography>
                                  Số lượng: {item.quantity} kiện
                                </Typography>
                              </Box>
                            </Box>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Customer;
