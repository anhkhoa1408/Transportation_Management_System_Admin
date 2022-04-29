import { FilterList, Info } from "@mui/icons-material";
import { Box, Button, Chip, Grid, Paper, Typography } from "@mui/material";
import moment from "moment";
import React, { useMemo, useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import ReactTable from "react-table-v6";
import { Badge } from "reactstrap";
import orderApi from "../../../api/orderApi";
import { CustomPagination } from "../../../components/CustomPagination";
import Filter from "../../../components/FilterTable";
import LoadingTable from "../../../components/LoadingTable";
import { orderState } from "../../../utils/filterParams";
import { useQueryTable } from "./../../../utils/queryUtils.js";

export const OrderList = (props) => {
  const [data, setData] = useState([]);
  const [_start, setStart] = useState(0);
  const [total, setTotal] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const [_limit, setLimit] = useState(10);
  const [sort, setSort] = useState("createdAt:DESC");

  const history = useHistory();

  const filterParam = [
    {
      value: "sender_name",
      name: "Tên khách hàng",
      type: "input",
    },
    {
      value: "sender_phone",
      name: "Số điện thoại",
      type: "input",
    },
    {
      value: "state",
      name: "Trạng thái đơn hàng",
      type: "select",
      params: orderState,
    },
  ];
  const [filterName, setFilterName] = useState(filterParam[0].value);
  const [filterValue, setFilterValue] = useState("");

  const handleState = (state) => {
    switch (state) {
      case 0:
        return (
          <Badge className="app-bg--neutral-warning">
            <span className="app--warning">Đang xử lý</span>
          </Badge>
        );
      case 1:
        return (
          <Badge className="app-bg--neutral-secondary">
            <span className="app--secondary">Đang gom hàng</span>
          </Badge>
        );
      case 2:
        return (
          <Badge className="app-bg--neutral-secondary">
            <span className="app--secondary">Đang vận chuyển</span>
          </Badge>
        );
      case 3:
        return (
          <Badge className="app-bg--neutral-primary">
            <span className="app--primary">Chuẩn bị giao hàng</span>
          </Badge>
        );
      case 4:
        return (
          <Badge className="app-bg--neutral-success">
            <span className="app--success">Đã giao hàng</span>
          </Badge>
        );
      case 5:
        return (
          <Badge className="app-bg--neutral-danger">
            <span className="app--danger">Đã hủy</span>
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

  const columns = useMemo(
    () => [
      {
        Header: "STT",
        accessor: "stt",
        filterable: false,
        width: 50,
      },
      {
        Header: "Mã đơn hàng",
        accessor: "id",
        filterable: false,
        width: 250,
        sortable: true,
      },
      {
        Header: "Tên khách hàng",
        accessor: "sender_name",
        filterable: false,
        sortable: true,
      },
      {
        Header: "Số điện thoại",
        accessor: "sender_phone",
        filterable: false,
        sortable: true,
      },
      {
        Header: "Trạng thái",
        accessor: "state",
        filterable: false,
        sortable: true,
      },
      {
        Header: "Thời gian đặt hàng",
        accessor: "createdAt",
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
        state: handleState(prop.state),
        createdAt: moment(prop.createdAt).format("DD/MM/YYYY HH:mm"),
        options: (
          <Button
            variant="contained"
            endIcon={<Info />}
            className="app-bg--primary"
            onClick={() =>
              history.push("/order/detail", {
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

  const OrderQuery = useQueryTable(
    "order-list",
    orderApi.getList,
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
    orderApi.getCount,
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
            <Typography variant="h5" className="flex-grow-1 fs-5 app--primary">
              Danh sách đơn hàng
            </Typography>
            <Box>
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
              loading={OrderQuery.isLoading || SizeQuery.isLoading}
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
                      history.push("/order/detail", {
                        id: rowInfo.row.id,
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

export default connect(mapStateToProps, mapDispatchToProps)(OrderList);
