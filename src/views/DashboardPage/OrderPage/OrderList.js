import { FilterList, Info } from "@mui/icons-material";
import { Box, Button, Grid, Paper, Typography } from "@mui/material";
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

export const OrderList = (props) => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPage, setTotal] = useState(0);
  const [size, setSize] = useState(5);

  const history = useHistory();

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
    let data_table = data.totalOrder.map((prop, index) => {
      return {
        ...prop,
        stt: page * size + index + 1,
        state: <Badge className="bg-warning p-2">{prop.status}</Badge>,
        createdAt: moment(prop.createdAt).format("DD/MM/YYYY HH:mm:ss"),
        options: (
          <Button
            variant="contained"
            endIcon={<Info />}
            className="app-primary-bg-color"
            onClick={() => history.push("/order/detail/1")}
          >
            Chi tiết
          </Button>
        ),
      };
    });
    setData(data_table);
    setTotal(data.totalPage);
  };

  const OrderQuery = useQueryTable("order-list", orderApi.getList, handleData, {
    page: page,
    size: size,
  });

  return (
    <Box className="p-4">
      {OrderQuery.isLoading ? <Loading /> : null}
      <Grid container className="p-4" direction="column">
        <Grid item md={12}>
          <Paper
            className="d-flex flex-row align-items-center p-4 rounded-top"
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
            className="p-4"
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
              loading={OrderQuery.isLoading}
              loadingComponent={Loading}
              defaultPageSize={size}
              showPaginationBottom={true}
              sortable={false}
              resizable={false}
              PaginationComponent={CustomPagination}
              pages={totalPage}
              onFetchData={async (state, instance) => {
                setPage(state.page);
                setSize(state.pageSize);
              }}
              className="-striped -highlight"
              getTdProps={(state, rowInfo, column, instance) => {
                return {
                  onClick: (e, handleOriginal) => {
                    console.log(column);
                    if (column.id !== "options") {
                      history.push("/order/detail/1223");
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
