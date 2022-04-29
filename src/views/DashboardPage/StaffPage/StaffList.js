import { Add, FilterList, Info } from "@mui/icons-material";
import { Box, Button, Grid, Paper, Typography } from "@mui/material";
import React, { useMemo, useState } from "react";
import { useHistory } from "react-router-dom";
import ReactTable from "react-table-v6";
import { CustomPagination } from "../../../components/CustomPagination";
import Filter from "../../../components/FilterTable";
import LoadingTable from "../../../components/LoadingTable";
import { staffType } from "../../../utils/filterParams";
import { handleUserRole } from "../../../utils/role";
import userApi from "./../../../api/userApi";
import { useQueryTable } from "./../../../utils/queryUtils.js";

export const StaffList = (props) => {
  const [data, setData] = useState([]);
  const [_start, setStart] = useState(0);
  const [totalPage, setTotal] = useState(0);
  const [_limit, setLimit] = useState(10);
  const [sort, setSort] = useState("name:ASC");

  const filterParam = [
    {
      value: "name",
      name: "Tên",
      type: "input",
    },
    {
      value: "phone",
      name: "Số điện thoại",
      type: "input",
    },
    {
      value: "type",
      name: "Chức vụ",
      type: "select",
      params: staffType,
    },
  ];
  const [filterName, setFilterName] = useState(filterParam[0].value);
  const [filterValue, setFilterValue] = useState("");

  const history = useHistory();

  const columns = useMemo(
    () => [
      {
        Header: "STT",
        accessor: "stt",
        filterable: false,
        width: 100,
      },
      {
        Header: "Tên",
        accessor: "name",
        filterable: false,
        sortable: true,
      },
      {
        Header: "Số điện thoại",
        accessor: "phone",
        filterable: false,
        sortable: true,
      },
      {
        Header: "Chức vụ",
        accessor: "type",
        filterable: false,
        sortable: true,
      },
      {
        Header: "Thuộc kho",
        accessor: "storage",
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
    let data_table = data.staffs.map((prop, index) => {
      return {
        ...prop,
        stt: _start * _limit + index + 1,
        type: handleUserRole(prop.type),
        storage: prop?.storage?.name || "Chưa phân công",
        options: (
          <Button
            variant="contained"
            endIcon={<Info />}
            className="app-bg--primary"
            onClick={() =>
              history.push("/staff/info", {
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
    setTotal(data.totalPage);
  };

  const StaffQuery = useQueryTable(
    "staff-list",
    userApi.getStaffs,
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
              Danh sách nhân viên
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
                variant="outlined"
                className="ms-2"
                endIcon={<Add />}
                onClick={() =>
                  history.push("/staff/create", {
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
              loading={StaffQuery.isLoading}
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
                      history.push("/staff/info", {
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
export default StaffList;
