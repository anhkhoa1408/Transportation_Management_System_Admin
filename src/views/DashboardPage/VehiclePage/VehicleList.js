import { Add, FilterList, Info } from "@mui/icons-material";
import { Box, Button, Grid, Paper, Typography } from "@mui/material";
import React, { useMemo, useState } from "react";
import { connect, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import ReactTable from "react-table-v6";
import vehicleApi from "../../../api/vehicleApi";
import { CustomPagination } from "../../../components/CustomPagination";
import Filter from "../../../components/FilterTable";
import LoadingTable from "../../../components/LoadingTable";
import { vehicle } from "../../../utils/filterParams";
import { useQueryTable } from "./../../../utils/queryUtils.js";

export const VehicleList = (props) => {
  const [data, setData] = useState([]);
  const [_start, setStart] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const [total, setTotal] = useState(0);
  const [_limit, setLimit] = useState(10);
  const [sort, setSort] = useState("type:ASC");

  const userInfo = useSelector((state) => state.userInfo.user);

  const history = useHistory();

  const filterParam = [
    {
      value: "licence",
      name: "Biển số",
      type: "input",
    },
    {
      value: "manager.name",
      name: "Người quản lý",
      type: "input",
    },
    {
      value: "load_gte",
      name: "Tải trọng lớn hơn",
      type: "input",
    },
    {
      value: "load_lte",
      name: "Tải trọng nhỏ hơn",
      type: "input",
    },
    {
      value: "type",
      name: "Loại xe",
      type: "select",
      params: vehicle,
    },
  ];
  const [filterName, setFilterName] = useState(filterParam[0].value);
  const [filterValue, setFilterValue] = useState("");

  const columns = useMemo(
    () => [
      {
        Header: "STT",
        accessor: "stt",
        filterable: false,
        width: 100,
      },
      {
        Header: "Biển số xe",
        accessor: "licence",
        filterable: false,
        sortable: true,
      },
      {
        Header: "Người quản lý",
        accessor: "manager",
        filterable: false,
        sortable: true,
      },
      {
        Header: "Loại",
        accessor: "type",
        filterable: false,
        sortable: true,
      },
      {
        Header: "Tải trọng tối đa",
        accessor: "load",
        filterable: false,
        sortable: true,
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
        stt: _start * _limit + index + 1,
        load: prop.load + " kg",
        type: prop.type === "Truck" ? "Xe tải" : "Xe container",
        manager: prop?.manager?.name || "Trống",
        options: (
          <Button
            variant="contained"
            endIcon={<Info />}
            className="app-bg--primary"
            onClick={() =>
              history.push("/vehicle/detail", {
                id: prop.id,
              })
            }
          >
            Chi tiết
          </Button>
        ),
      };
    });
    setData(data_table);
  };

  const handleTotal = (data) => {
    setTotalPage(Math.ceil(data / _limit));
    setTotal(data);
  };

  const VehicleQuery = useQueryTable(
    "vehicle-list",
    vehicleApi.getList,
    handleData,
    filterName && filterValue
      ? {
          _start,
          _limit,
          [filterName]: filterValue,
          _sort: sort,
        }
      : {
          _start,
          _limit,
          _sort: sort,
        },
  );

  const SizeQuery = useQueryTable(
    "order-count",
    vehicleApi.getCount,
    handleTotal,
  );
  return (
    <Box className="p-4">
      <Grid container className="p-4" direction="column">
        <Grid item md={12}>
          <Paper
            className="d-flex flex-row align-items-center p-4 rounded-top shadow-sm"
            sx={{
              bgcolor: "#F8F9FC",
              borderBottomRightRadius: 0,
              borderBottomLeftRadius: 0,
            }}
          >
            <Typography
              variant="h5"
              className="flex-grow-1 fs-5 app--primary"
            >
              Danh sách phương tiện
            </Typography>

            <Box className="d-flex flex-row">
              <Filter
                name={filterName}
                value={filterValue}
                listParam={filterParam}
                onChangeName={setFilterName}
                onChangeValue={setFilterValue}
              />
              <Button
                hidden={userInfo.type !== "admin"}
                variant="outlined"
                className="ms-2"
                endIcon={<Add />}
                onClick={() =>
                  history.push("/vehicle/create", {
                    create: true,
                  })
                }
              >
                Thêm
              </Button>
            </Box>
          </Paper>
        </Grid>
        <Grid item md={12} xs={12}>
          <Paper
            className="p-4 shadow-sm"
            sx={{
              borderTopRightRadius: 0,
              borderTopLeftRadius: 0,
            }}
          >
            <ReactTable
              noDataText="Không có dữ liệu"
              data={data}
              columns={columns}
              previousText={"<"}
              nextText={">"}
              rowsText={"hàng"}
              ofText="/"
              manual
              loading={VehicleQuery.isLoading || SizeQuery.isLoading}
              LoadingComponent={LoadingTable}
              defaultPageSize={_limit}
              showPaginationBottom={true}
              sortable={false}
              resizable={false}
              PaginationComponent={CustomPagination}
              pages={totalPage}
              onFetchData={async (state, instance) => {
                setStart(state.page);
                setLimit(state.pageSize);
                setTotalPage(Math.ceil(total / state.pageSize));
                if (state.sorted.length) {
                  let { id, desc } = state.sorted[0];
                  setSort(`${id}:${desc ? "DESC" : "ASC"}`);
                }
              }}
              className="-striped -highlight"
              getTdProps={(state, rowInfo, column, instance) => {
                return {
                  onClick: (e, handleOriginal) => {
                    if (column.id !== "options") {
                      history.push("/vehicle/detail", {
                        id: rowInfo.row._original.id,
                      });
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
