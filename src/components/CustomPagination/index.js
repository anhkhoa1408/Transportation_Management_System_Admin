import { ExpandMore } from "@mui/icons-material";
import { Grid, Pagination, Paper, Typography } from "@mui/material";
import React, { useState } from "react";
import {
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
} from "reactstrap";
export const CustomPagination = (props) => {
  const { pages, onPageChange, onPageSizeChange } = props;
  const [rowPerPage, setRowPerPage] = useState(10);

  const handleChangePage = (page) => {
    onPageChange(page - 1);
  };

  const handleChangePageSize = (size) => {
    setRowPerPage(size);
    onPageSizeChange(size);
  };

  return (
    <Grid container className="mt-4">
      <Grid item md={3} className="d-flex flex-row align-items-center">
        <UncontrolledDropdown direction="up">
          <Paper className="d-flex flex-row align-items-center p-2">
            <DropdownToggle className="bg-white d-flex flex-row align-items-center d-25 border-white p-0 shadow-none">
              <Typography className="me-1 text-dark">
                Số hàng mỗi trang:
              </Typography>

              <Typography className="text-dark">{rowPerPage}</Typography>
              <ExpandMore className="text-dark" />
            </DropdownToggle>
          </Paper>
          <DropdownMenu>
            {[5, 10, 15, 20].map((item) => (
              <DropdownItem
                key={item}
                onClick={() => handleChangePageSize(item)}
              >
                {item}
              </DropdownItem>
            ))}
          </DropdownMenu>
        </UncontrolledDropdown>
      </Grid>
      <Grid item md={9}>
        <Pagination
          count={pages}
          showFirstButton
          showLastButton
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "flex-end",
          }}
          onChange={(e, page) => handleChangePage(page)}
        />
      </Grid>
    </Grid>
  );
};
