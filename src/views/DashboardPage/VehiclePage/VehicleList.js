import React, { useEffect, useMemo, useState } from "react";
import { connect } from "react-redux";
import {
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  Paper,
  Typography,
} from "@mui/material";
import ReactTable from "react-table-v6";
import { Add, FilterList, Info } from "@mui/icons-material";
import { CustomPagination } from "../../../components/CustomPagination";
import { useHistory } from "react-router-dom";

export const VehicleList = (props) => {
  const [data, setData] = useState([
    {
      id: 1,
      lisence: "CHONKER",
      manager: "Yoga Shibe",
      position: "kho Hà Nội",
      kind: "Container",
      maxWeight: "10000",
    },
  ]);

  const history = useHistory();

  const columns = useMemo(
    () => [
      {
        Header: "ID",
        accessor: "id",
        filterable: false,
        width: 100,
      },
      {
        Header: "Biển số xe",
        accessor: "lisence",
        filterable: false,
      },
      {
        Header: "Người quản lý",
        accessor: "manager",
        filterable: false,
      },
      {
        Header: "Vị trí",
        accessor: "position",
        filterable: false,
      },
      {
        Header: "Loại",
        accessor: "kind",
        filterable: false,
      },
      {
        Header: "Tải trọng tối đa",
        accessor: "maxWeight",
        filterable: false,
      },
      {
        Header: "Tuỳ chọn",
        accessor: "options",
        filterable: false,
      },
    ],
    [],
  );

  const handleData = (data) => {
    let data_table = data.map((prop, index) => {
      return {
        ...prop,
        maxWeight: prop.maxWeight + " kg",
        options: (
          <Button
            variant="contained"
            endIcon={<Info />}
            className="app-primary-bg-color"
            onClick={() => history.push("/vehicle/detail/1")}
          >
            Chi tiết
          </Button>
        ),
      };
    });
    setData(data_table);
  };

  useEffect(() => {
    if (data.length) handleData(data);
  }, []);

  return (
    <Box className="p-4">
      <Grid container className="p-4" direction="column">
        <Grid item md={12}>
          <Paper
            className="d-flex flex-row align-items-center p-3 rounded-top"
            sx={{
              bgcolor: "#F8F9FC",
              borderBottomRightRadius: 0,
              borderBottomLeftRadius: 0,
            }}
          >
            <Typography
              variant="h5"
              className="flex-grow-1 fs-5 app-primary-color"
            >
              Danh sách phương tiện
            </Typography>
            <Box>
              <Button variant="outlined" className="me-2" endIcon={<Add />}>
                Thêm
              </Button>
              <Button variant="outlined" endIcon={<FilterList />}>
                Lọc
              </Button>
            </Box>
          </Paper>
        </Grid>
        <Grid item md={12} xs={12}>
          <Paper
            className="p-4"
            sx={{
              borderTopRightRadius: 0,
              borderTopLeftRadius: 0,
            }}
          >
            <ReactTable
              data={data}
              columns={columns}
              previousText={"<"}
              nextText={">"}
              rowsText={"hàng"}
              ofText="/"
              // loading={<div>aaaa</div>}
              // LoadingComponent={LoadingTable}
              manual
              defaultPageSize={10}
              showPaginationBottom={true}
              sortable={false}
              resizable={false}
              PaginationComponent={() => <CustomPagination />}
              // pages={totalPage}
              className="-striped -highlight"
              getTdProps={(state, rowInfo, column, instance) => {
                return {
                  onClick: (e, handleOriginal) => {
                    console.log(column);
                    if (column.id !== "options") {
                      history.push("/vehicle/detail/1223");
                    }
                  },
                };
              }}
            />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(VehicleList);
