import {
  ArrowDropDown,
  ArrowRight,
  Check,
  Close,
  Inventory2,
  Search,
} from "@mui/icons-material";
import {
  Button,
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
import { Box } from "@mui/system";
import clsx from "clsx";
import React, { useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { Collapse } from "reactstrap";
import orderApi from "../../../api/orderApi";
import storageApi from "../../../api/storageApi";
import userApi from "../../../api/userApi";
import vehicleApi from "../../../api/vehicleApi";
import { joinAddress } from "../../../utils/address";
import { errorNotify } from "../../../utils/notification";

const Customer = (props) => {
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

  const [exceedPackage, setExceed] = useState([])

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
    // dropped outside the list or invalid drop
    if (
      !destination ||
      (source.droppableId === "orderDrop" &&
        destination.droppableId === "packDrop") ||
      (source.droppableId === "orderDrop" &&
        destination.droppableId === "shipDrop") ||
      (destination.droppableId === "orderDrop" &&
        source.droppableId === "packDrop") ||
      (destination.droppableId === "orderDrop" &&
        source.droppableId === "shipDrop")
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
    let tempArray = [...packageData]
    let tempPack = {
      ...tempArray[index],
      quantity: 30
    }
    delete tempPack.id
    delete tempPack._id
    tempArray[index] = {
      ...tempArray[index],
      quantity: tempArray[index].quantity - 30
    }
    tempArray.splice(index, 0, tempPack)
    setPackages(tempArray)
    setSplit(null)
    setExceed([...exceedPackage, tempPack])
  }


  const handleCreate = () => {
    if (type === "collect") {
      console.log(packageData)
    }
  }

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
        errorNotify("Có lỗi xảy ra");
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
          errorNotify("Có lỗi xảy ra");
        });
    }
  }, [storage, type]);

  useEffect(() => {
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
                value: store.address,
                label: store.name,
              },
            ]);
            setListTo(temp);
          })
          .catch((error) => {
            errorNotify("Có lỗi xảy ra");
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
            setListFrom(temp);
            setListTo([
              {
                value: store.address,
                label: store.name,
              },
            ]);
          })
          .catch((error) => {
            errorNotify("Có lỗi xảy ra");
          });
      } else {
        let store = storages.find((item) => item.id === storage);
        setListFrom([
          {
            value: store.address,
            label: store.name,
          },
        ]);
        setListTo(
          storages
            .map((item) => ({
              value: item.id,
              label: item.name,
            }))
            .filter((item) => item.value !== storage),
        );
      }
    }
  }, [type, storage]);

  return (
    <Grid container className="p-5">
      <Grid item sm={12} md={12}>
        <Paper className="d-flex flex-row justify-content-between align-items-center px-4 py-2 shadow-sm mb-4">
          <Typography className="fw-bold fs-5">Sắp xếp</Typography>
          <Button onClick={handleCreate}>Tạo</Button>
        </Paper>
      </Grid>
      <Grid item sm={12} md={12}>
        <Paper className="shadow-sm mb-3 p-4">
          <Box className="p-2">
            <Typography variant="h5">Tùy chỉnh</Typography>
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
                  onChange={(e) => setType(e.target.value)}
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
                    onChange={(e) => setCar(e.target.value)}
                  >
                    {cars.map((item) => (
                      <MenuItem key={item.id} value={item.id}>
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
            <Typography variant="h5">Hàng hóa</Typography>
            <Typography variant="subtitle2">
              Sắp xếp lượng hàng hóa phù hợp cho mỗi chuyến xe
            </Typography>
          </Box>
          <Grid container>
            <Grid item md={6} sm={6} className="p-2">
              <Typography>Thể tích còn lại</Typography>
            </Grid>
            <Grid item md={6} sm={6} className="p-2">
              <Typography>Khối lượng còn lại</Typography>
            </Grid>
          </Grid>
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
                          <ArrowDropDown />
                        </Button>
                        <Button className="d-flex flex-row justify-content-center align-items-center mb-2 text-warning">
                          <ArrowRight />
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
                        key={item.id}
                        draggableId={item.id}
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
                            <Box className="d-flex flex-row align-items-start p-1">
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
                                  Khối lượng: {item.weight} kg
                                </Typography>
                                <Typography>
                                  Số lượng: {item.quantity} kiện
                                </Typography>
                              </Box>
                              <Button onClick={() => setSplit(index)}>
                                Tách
                              </Button>
                            </Box>
                            <Collapse
                              isOpen={split === index ? true : false}
                              className={clsx("flex-row justify-content-center mt-2 py-2", {
                                "d-flex": split === index
                              })}
                            >
                              <TextField
                                label="Số lượng"
                                className="flex-grow-1 w-100 me-2"
                              ></TextField>
                              <Button color="success" onClick={() => handleSplit(item, index)}>
                                <Check />
                              </Button>
                              <Button color="error" onClick={() => setSplit(null)}>
                                <Close />
                              </Button>
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
                    <Box
                      className={clsx("py-1 mb-1", {
                        "bg-white shadow-sm": search,
                      })}
                    >
                      <Button
                        className="d-flex flex-row justify-content-between align-items-center w-100 app-primary-color"
                        onClick={() => setSearch(!search)}
                      >
                        <Typography className="my-2">
                          Kiện hàng đã chọn
                        </Typography>
                        <ArrowDropDown />
                      </Button>
                      <Collapse isOpen={search}>
                        <Divider />
                        <Button className="d-flex flex-row justify-content-between align-items-center w-100 text-danger px-2">
                          <Typography className="my-2">Hủy chọn</Typography>
                          <Close />
                        </Button>
                      </Collapse>
                    </Box>
                    {shipmentData.map((item, index) => (
                      <Draggable
                        key={item.id}
                        draggableId={item.id}
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
