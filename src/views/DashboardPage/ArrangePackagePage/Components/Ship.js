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

function Ship({ shipmentData }) {
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
    height: 350,
    flex: 1,
    margin: "0px 10px",
    overflowY: "auto",
  });
  return (
    <Grid item sm={12} md={12}>
      <DragDropContext>
        <Droppable key="shipDrop" droppableId="shipDrop">
          {(provided, snapshot) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              style={getListStyle(snapshot.isDraggingOver)}
            >
              <Box className={clsx("py-1 mb-1")}>
                <Button className="d-flex flex-row justify-content-between align-items-center w-100 app-primary-color">
                  <Typography className="my-2">Kiện hàng đã chọn</Typography>
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
                          <Typography variant="subtitle1" className="fw-bold">
                            Tên kiện hàng: {item.name || "Không có"}
                          </Typography>
                          <Typography>Khối lượng: {item.weight} kg</Typography>
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
    </Grid>
  );
}

export default Ship;
