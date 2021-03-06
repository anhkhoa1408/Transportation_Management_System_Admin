import { Star } from "@mui/icons-material";
import { Box, Chip, Grid, Paper } from "@mui/material";
import React, { useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import ReactTable from "react-table-v6";
import { Badge } from "reactstrap";
import orderApi from "../../../api/orderApi";
import { CustomPagination } from "../../../components/CustomPagination";
import LoadingTable from "../../../components/LoadingTable";
import { useQueryTable } from "../../../utils/queryUtils.js";

function CustomerOrderList() {
  const [data, setData] = useState([]);
  const [_start, setStart] = useState(0);
  const [totalPage, setTotal] = useState(0);
  const [_limit, setLimit] = useState(10);

  const location = useLocation();

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
        Header: "Số điện thoại",
        accessor: "sender_phone",
        filterable: false,
      },
      {
        Header: "Trạng thái",
        accessor: "state",
        filterable: false,
      },
      {
        Header: "Đánh giá",
        accessor: "rating_point",
        filterable: false,
      },
      {
        Header: "Phản hồi",
        accessor: "rating_note",
        filterable: false,
      }
    ],
    [],
  );

  const handleData = (data) => {
    let data_table = data.map((prop, index) => {
      return {
        ...prop,
        stt: _start * _limit + index + 1,
        state: handleState(prop.state),
        rating_note: prop.rating_note || "Chưa có bình luận",
        rating_point:
          !prop.rating_point ? (
            "Chưa có xếp hạng"
          ) : prop.rating_point === 5 ? (
            <Box>
              {Array.from({ length: 5 }, (_, idx) => (
                <Star key={idx} className="text-warning"></Star>
              ))}
            </Box>
          ) : (
            <Box>
              {Array.from({ length: prop.rating_point }, (_, idx) => (
                <Star key={idx} className="text-warning"></Star>
              ))}
              {Array.from({ length: 5 - prop.rating_point }, (_, idx) => (
                <Star key={idx} className="text-dark opacity-25"></Star>
              ))}
            </Box>
          )
      };
    });
    setData(data_table);
    setTotal(data.totalPage);
  };

  const OrderQuery = useQueryTable(
    "user-order-list",
    orderApi.getList,
    handleData,
    {
      _start,
      _limit,
      customer: location?.state?.id,
    },
  );

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

  return (
    <Grid container direction="column">
      <Grid item md={12} xs={12}>
        <Paper
          className="pb-4 shadow-none"
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
            }}
            className="-striped -highlight"
          />
        </Paper>
      </Grid>
    </Grid>
  );
}

export default CustomerOrderList;
