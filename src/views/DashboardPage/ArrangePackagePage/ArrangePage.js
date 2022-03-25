import { ArrowDropDown, Check, Close, Search } from "@mui/icons-material";
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

const Customer = (props) => {
  const [search, setSearch] = useState(false);
  const [storage, setSelectedStorage] = useState("");
  const [storages, setStorages] = useState([]);

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

  const [orderData, setOrder] = useState(
    Array.from({ length: 5 }, (v, k) => k).map((k) => ({
      id: `item-${k}`,
      content: `item ${k}`,
    })),
  );
  const [packageData, setPackages] = useState(
    Array.from({ length: 5 }, (v, k) => k).map((k) => ({
      id: `item-${k + 10}`,
      content: `item ${k + 10}`,
    })),
  );
  const [shipmentData, setShipments] = useState(
    Array.from({ length: 5 }, (v, k) => k).map((k) => ({
      id: `item-${k + 20}`,
      content: `item ${k + 20}`,
    })),
  );

  const getItemStyle = (isDragging, draggableStyle) => ({
    userSelect: "none",
    padding: "16px",
    margin: `0 0 8px 0`,
    background: 'white',
    boxShadow: "0 0 8px 0 rgba(0,0,0,0.1)",
    ...draggableStyle,
  });

  const getListStyle = (isDraggingOver) => ({
    background: isDraggingOver ? "#b6f3fc" : "#F8F9FC",
    padding: "8px 5px 8px 8px",
    width: "30%",
    height: 500,
    overflowY: "scroll",
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

  useEffect(() => {
    storageApi.getList().then((response) => {
      setStorages(response);
    });
  }, []);

  useEffect(() => {
    if (type) {
      let storeAddress = storages.find((item) => item.id === storage)?.address
        ?.city;
      console.log(storeAddress);
      if (type === "collect") {
        orderApi.getList({ "from_address.city": storeAddress, state: 0 })
          .then(response => {
            console.log(response)
          })
      }
    }
  }, [type]);

  return (
    <Grid container className="p-5">
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
                  <Select fullWidth>
                    {/* <MenuItem>Gom hàng</MenuItem>
                    <MenuItem>Giao hàng</MenuItem>
                    <MenuItem>Liên tỉnh</MenuItem> */}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item md={6} sm={6} className="p-2">
                <FormControl fullWidth>
                  <InputLabel>Nơi đến</InputLabel>
                  <Select fullWidth>
                    {/* <MenuItem>Nội thành</MenuItem>
                    <MenuItem>Liên tỉnh</MenuItem> */}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>

            <Grid container>
              <Grid item md={6} sm={6} className="p-2">
                <FormControl fullWidth>
                  <InputLabel>Biển số xe</InputLabel>
                  <Select fullWidth>
                    <MenuItem>Gom hàng</MenuItem>
                    <MenuItem>Giao hàng</MenuItem>
                    <MenuItem>Liên tỉnh</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item md={6} sm={6} className="p-2">
                <FormControl fullWidth>
                  <InputLabel>Người hỗ trợ</InputLabel>
                  <Select fullWidth>
                    <MenuItem>Nội thành</MenuItem>
                    <MenuItem>Liên tỉnh</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>

            <Grid container>
              <Grid item md={6} sm={6} className="p-2">
                <Typography>Thể tích còn lại</Typography>
              </Grid>
              <Grid item md={6} sm={6} className="p-2">
                <Typography>Khối lượng còn lại</Typography>
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
              Sắp xếp hàng hóa cho mỗi chuyến xe
            </Typography>
          </Box>
          <Box className="d-flex flex-row justify-content-between">
            <DragDropContext onDragEnd={onDragEnd}>
              <Droppable key="orderDrop" droppableId="orderDrop">
                {(provided, snapshot) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    style={getListStyle(snapshot.isDraggingOver)}
                  >
                    <Box className="py-1">
                      <Button
                        className="d-flex flex-row justify-content-between align-items-center w-100 mb-2 app-primary-color"
                        onClick={() => setSearch(!search)}
                      >
                        <Typography className="my-2">
                          Danh sách đơn hàng
                        </Typography>
                        <ArrowDropDown />
                      </Button>
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
                    {orderData.map((item, index) => (
                      <>
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
                              {item.content}
                            </div>
                          )}
                        </Draggable>
                      </>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>

              <Droppable key="packageDrop" droppableId="packDrop">
                {(provided, snapshot) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    style={getListStyle(snapshot.isDraggingOver)}
                  >
                    <Box className="py-1">
                      <Button
                        className="d-flex flex-row justify-content-between align-items-center w-100 mb-2 app-primary-color"
                        // onClick={() => setSearch(!search)}
                      >
                        <Typography className="my-2">
                          Danh sách kiện hàng
                        </Typography>
                        {/* <ArrowDropDown /> */}
                      </Button>
                    </Box>
                    {packageData.map((item, index) => (
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
                            {item.content}
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
                        // onClick={() => setSearch(!search)}
                      >
                        <Typography className="my-2">
                          Kiện hàng đã chọn
                        </Typography>
                        <ArrowDropDown />
                      </Button>
                      <Collapse isOpen={search}>
                        <Divider />
                        <Button
                          className="d-flex flex-row justify-content-between align-items-center w-100 px-2 text-lowercase"
                          sx={{
                            color: "lightgreen",
                          }}
                        >
                          <Typography className="my-2">Xác nhận</Typography>
                          <Check />
                        </Button>

                        <Button className="d-flex flex-row justify-content-between align-items-center w-100 text-danger px-2 text-lowercase">
                          <Typography className="my-2">Hủy bỏ</Typography>
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
                            {item.content}
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
