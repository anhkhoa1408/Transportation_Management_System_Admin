import { Info } from "@mui/icons-material";
import { Box, Button, Grid, Paper, Typography } from "@mui/material";
import React, { useMemo, useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import ReactTable from "react-table-v6";
import { Badge } from "reactstrap";
import { CustomPagination } from "../../../components/CustomPagination";
import Filter from "../../../components/FilterTable";
import LoadingTable from "../../../components/LoadingTable";
import { customerType } from "../../../utils/filterParams";
import { handleUserRole } from "../../../utils/role";
import userApi from "./../../../api/userApi";
import { useQueryTable } from "./../../../utils/queryUtils.js";

export const CustomerList = (props) => {
  const history = useHistory();

  const [data, setData] = useState([]);
  const [_start, setStart] = useState(0);
  const [totalPage, setTotal] = useState(0);
  const [_limit, setLimit] = useState(10);
  const [sort, setSort] = useState("name:ASC");

  // Filter section
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
      name: "Loại thành viên",
      type: "select",
      params: customerType,
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
        Header: "Loại thành viên",
        accessor: "type",
        filterable: false,
        sortable: true,
      },
      {
        Header: "Ngày sinh",
        accessor: "birthday",
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

  const handleRoleStyle = (role) => {
    switch (role) {
      case "User":
        return (
          <Badge className="app-bg--neutral-dark">
            <span className="app--dark">Khách hàng thông thường</span>
          </Badge>
        );
      case "Iron":
        return (
          <Badge className="app-bg--neutral-secondary">
            <span className="app--secondary">Thành viên bạc</span>
          </Badge>
        );
      case "Gold":
        return (
          <Badge className="app-bg--neutral-warning">
            <span className="app--warning">Thành viên vàng</span>
          </Badge>
        );
      case "Diamond":
        return (
          <Badge className="app-bg--neutral-primary">
            <span className="app--primary">Thành viên kim cương</span>
          </Badge>
        );
      case "Platinum":
        return (
          <Badge className="app-bg--neutral-purple">
            <span className="app--purple">Thành viên bạch kim</span>
          </Badge>
        );
      default:
        return (
          <Badge className="app-bg--neutral-warning">
            <span className="app--warning">Đang xử lý</span>
          </Badge>
        );
    }
  };

  const handleData = (data) => {
    let data_table = data.customers.map((prop, index) => {
      return {
        ...prop,
        type: handleRoleStyle(prop.type),
        stt: _start * _limit + index + 1,
        options: (
          <Button
            variant="contained"
            endIcon={<Info />}
            className="app-bg--primary"
            onClick={() =>
              history.push("/customer/info", {
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

  const CustomerQuery = useQueryTable(
    "customer-list",
    userApi.getCustomers,
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
            <Typography variant="h5" className="flex-grow-1 fs-5 app--primary">
              Danh sách khách hàng
            </Typography>
            <Box>
              {/* <Button variant="outlined" className="me-2" endIcon={<Add />}>
                Thêm
              </Button> */}
              <Filter
                name={filterName}
                value={filterValue}
                listParam={filterParam}
                onChangeName={setFilterName}
                onChangeValue={setFilterValue}
              />
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
              loading={CustomerQuery.isLoading}
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
                      history.push("/customer/info", {
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

export default connect(mapStateToProps, mapDispatchToProps)(CustomerList);
