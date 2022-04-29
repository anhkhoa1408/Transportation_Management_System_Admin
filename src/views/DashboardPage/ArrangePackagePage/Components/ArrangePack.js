import {
  ArrowDropDown,
  Calculate,
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
  Grid,
  InputAdornment,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import clsx from "clsx";
import React from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { Collapse, UncontrolledTooltip } from "reactstrap";
import { validate } from "schema-utils";

export const ArrangePack = ({
  curVolume,
  curWeight,
  car,
  type,
  check,
  setCheck,
  search,
  setSearch,
  handleQuickSort,
  split,
  setSplit,
  quantity,
  setQuantity,
  handleSplit,
  shipmentData,
  setShipments,
  packageData,
  setPackages,
  validate,
  setValidate,
  initial,
  handleCalculate,
  setInitial,
  setCurWeight,
  setCurVolume,
  isFullLoad,
  ...props
}) => {
  const getItemStyle = (isDragging, draggableStyle) => ({
    userSelect: "none",
    padding: "16px",
    margin: `0 0 12px 0`,
    background: "white",
    boxShadow: "0 0 6px 0 rgba(0,0,0,0.1)",
    ...draggableStyle,
  });

  const getListStyle = (isDraggingOver) => ({
    background: isDraggingOver ? "#b6f3fc" : "#F3F3FA",
    padding: "8px",
    height: 500,
    flex: 1,
    margin: "0px 10px",
    overflowY: "auto",
  });

  const onDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) {
      return;
    }

    if (
      source.droppableId === "packDrop" &&
      destination.droppableId === "shipDrop"
    ) {
      if (Object.keys(validate).length) {
        setCheck(true);
      }
    }

    const sInd = +source.index;
    const dInd = +destination.index;

    if (source.droppableId === destination.droppableId) {
      const items = reorder(
        source.droppableId === "packDrop" ? packageData : null,
        sInd,
        dInd,
      );
      if (source.droppableId === "packDrop") {
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

  const handleCancel = () => {
    setShipments(initial.ship);
    setPackages(initial.pack);
    setValidate({});
    // setCurWeight(0)
    // setCurVolume(0)
  };
  return (
    <Grid item sm={12} md={12}>
      <Paper className="d-flex flex-column w-100 align-self-center p-4 shadow-sm">
        <Box className="p-2 mb-3">
          <Typography variant="h6">Hàng hóa</Typography>
          <Typography variant="subtitle2">
            Sắp xếp lượng hàng hóa phù hợp cho mỗi chuyến xe
          </Typography>
        </Box>
        <Grid container className="mb-4">
          <Grid item md={6} sm={6} className="p-2">
            <Typography>{`Không gian chiếm dụng: ${curVolume}/100 % `}</Typography>
          </Grid>
          <Grid item md={6} sm={6} className="p-2">
            <Typography>{`Khối lượng sau khi xếp: ${curWeight}/${
              car.load || 0
            } kg`}</Typography>
          </Grid>
          {isFullLoad && (
            <Grid item md={12} sm={12} className="px-2 py-1 d-flex flex-row">
              <ErrorOutline color="error" className="me-2" />{" "}
              <Typography>
                Kiện hàng trên xe hiện tại đã đầy, không gian chiếm dụng và khối lượng kiện hàng đang hiển thị được
                tính cho chuyến xe sau, khi xe rỗng
              </Typography>
            </Grid>
          )}
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
                        className="d-flex flex-row justify-content-between align-items-center w-100 mb-2 app--primary flex-grow-1"
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
                        className="d-flex flex-row justify-content-center align-items-center mb-2 app--secondary"
                        onClick={handleCancel}
                      >
                        <Merge />
                      </Button>
                      <UncontrolledTooltip flip target="calculate-btn">
                        Tính toán
                      </UncontrolledTooltip>
                      <Button
                        id="calculate-btn"
                        className="d-flex flex-row justify-content-center align-items-center mb-2 app--success"
                        onClick={handleCalculate}
                      >
                        <Calculate />
                      </Button>
                      <UncontrolledTooltip flip target="sort-btn">
                        Sắp xếp nhanh
                      </UncontrolledTooltip>
                      <Button
                        id="sort-btn"
                        className="d-flex flex-row justify-content-center align-items-center mb-2 app--warning"
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
                            <Box className="p-2 app-bg--neutral-gray me-3">
                              <Inventory2
                                className="app--primary hover-sm"
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
                                    className="d-flex flex-row justify-content-center align-items-center px-3"
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
                                  quantity <= 0 ||
                                  quantity >
                                    item.quantity - validate[item.id] ||
                                  !quantity ||
                                  quantity > item.quantity
                                }
                                helperText={
                                  (quantity <= 0 &&
                                    "Số lượng phải lớn hơn 0") ||
                                  (quantity >
                                    item.quantity - validate[item.id] &&
                                    "Vượt quá số lượng tách được") ||
                                  (!quantity && "Số lượng không hợp lệ") ||
                                  (quantity > item.quantity &&
                                    "Số lượng tách phải nhỏ hơn số lượng hiện tại")
                                }
                              ></TextField>
                              <Button
                                className="app-btn app-btn--success"
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
                      className="d-flex flex-row justify-content-between align-items-center w-100 app--primary"
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
                            <Box className="p-2 app-bg--neutral-gray me-3">
                              <Inventory2
                                className="app--primary hover-sm"
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
  );
};
