import React, { useState } from "react";
import {
  Pagination,
  Box,
  Modal,
  Container,
  Grid,
  Typography,
  IconButton,
  Paper,
} from "@mui/material";
import { Add, ExpandMore } from "@mui/icons-material";
import {
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledCarousel,
  UncontrolledDropdown,
} from "reactstrap";
export const CustomPagination = () => {
  const [rowPerPage, setRowPerPage] = useState(5);
  return (
    <Grid container>
      <Grid item md={3} className="d-flex flex-row align-items-center">
        <UncontrolledDropdown direction="up">
          <Paper className="d-flex flex-row align-items-center p-2">
            <DropdownToggle
              className="bg-white d-flex flex-row align-items-center d-25 border-white p-0 shadow-none"
              // caret
            >
              <Typography className="me-1 text-dark">
                Số hàng mỗi trang:
              </Typography>

              <Typography className="text-dark">{rowPerPage}</Typography>
              <ExpandMore className="text-dark" />
            </DropdownToggle>
          </Paper>
          <DropdownMenu>
            {[5, 10, 15, 20].map((item) => (
              <DropdownItem key={item} onClick={() => setRowPerPage(item)}>
                {item}
              </DropdownItem>
            ))}
          </DropdownMenu>
        </UncontrolledDropdown>
      </Grid>
      <Grid item md={9}>
        <Pagination
          count={10}
          showFirstButton
          showLastButton
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "flex-end",
          }}
        />
      </Grid>
    </Grid>
  );
};
