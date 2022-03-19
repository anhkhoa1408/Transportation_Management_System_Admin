import { FilterList, Info } from "@mui/icons-material";
import { Box, Button, Chip, Grid, Paper, Typography } from "@mui/material";
import React, { useMemo, useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import ReactTable from "react-table-v6";
import { Badge } from "reactstrap";
import orderApi from "../../../api/orderApi";
import { CustomPagination } from "../../../components/CustomPagination";
import { useQueryTable } from "./../../../utils/queryUtils.js";
import Loading from "./../../../components/Loading";
import moment from "moment";
import LoadingTable from "../../../components/LoadingTable";
import { convertOrderState } from "../../../utils/order";

export const OrderList = (props) => {
  const [data, setData] = useState([]);
  const [_start, setStart] = useState(0);
  const [total, setTotal] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const [_limit, setLimit] = useState(10);

  const history = useHistory();

  const handleState = (state) => {
    switch (state) {
      case 0:
        return <Chip variant="outlined" label="Đang xử lý" color="warning" />
      case 1:
        return <Chip variant="outlined" label="Chuẩn bị kiện hàng" color="primary" />
      case 2:
        return <Chip variant="outlined" label="Đang vận chuyển" color="info" />
      case 3:
        return <Chip variant="outlined" label="Chuẩn bị giao hàng" color="secondary" />
      case 4:
        return <Chip variant="outlined" label="Giao hàng thành công" color="success" />
      case 5:
        return <Chip variant="outlined" label="Đã hủy" color="error" />
      default:
        return <Chip variant="outlined" label="Đang xử lý" color="warning" />
    }
  }

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
      },
      {
        Header: "Tên khách hàng",
        accessor: "sender_name",
        filterable: false,
      },
      {
        Header: "Số điện thoại",
        accessor: "sender_phone",
        filterable: false,
      },
      {
        Header: "Trạng thái đơn hàng",
        accessor: "state",
        filterable: false,
      },
      {
        Header: "Thời gian đặt hàng",
        accessor: "createdAt",
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
        stt: _start * _limit + index + 1,
        state: handleState(prop.state),
        createdAt: moment(prop.createdAt).format("DD/MM/YYYY HH:mm"),
        options: (
          <Button
            variant="contained"
            endIcon={<Info />}
            className="app-primary-bg-color"
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
    setTotal(data)
  };

  const OrderQuery = useQueryTable("order-list", orderApi.getList, handleData, {
    _start,
    _limit,
  });

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
            <Typography
              variant="h5"
              className="flex-grow-1 fs-5 app-primary-color"
            >
              Danh sách đơn hàng
            </Typography>
            <Box>
              <Button variant="outlined" endIcon={<FilterList />}>
                Lọc
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
                setTotalPage(Math.ceil(total / state.pageSize))
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
