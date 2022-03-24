import { Add, FilterList, Star } from "@mui/icons-material";
import { Box, Button, Grid, Paper, Typography } from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import ReactTable from "react-table-v6";
import { CustomPagination } from "../../../components/CustomPagination";
import { useQueryTable } from "./../../../utils/queryUtils.js";
import Loading from "./../../../components/Loading";
import moment from "moment";
import LoadingTable from "../../../components/LoadingTable";
import feedbackApi from "../../../api/feedbackApi";
import { ratingPoint } from "../../../utils/filterParams";
import Filter from "../../../components/FilterTable";

export const FeedbackList = (props) => {
  const [data, setData] = useState([]);
  const [_start, setStart] = useState(0);
  const [totalPage, setTotal] = useState(0);
  const [_limit, setLimit] = useState(10);

  const filterParam = [
    {
      value: "rating_point",
      name: "Đánh giá",
      type: "select",
      params: ratingPoint,
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
        Header: "Tên khách hàng",
        accessor: "customer",
        filterable: false,
      },
      {
        Header: "Ngày đánh giá",
        accessor: "createdAt",
        filterable: false,
      },
      {
        Header: "Xếp hạng",
        accessor: "rating_point",
        filterable: false,
      },
      {
        Header: "Bình luận",
        accessor: "rating_note",
        filterable: false,
      },
    ],
    [],
  );

  const handleData = (data) => {
    let data_table = data.feedbacks.map((prop, index) => {
      return {
        ...prop,
        stt: _start * _limit + index + 1,
        createdAt: moment(prop.createdAt).format("DD/MM/YYYY"),
        customer: prop.customer.name,
        rating_note: prop.rating_note || "Chưa có bình luận",
        rating_point: !prop.rating_point ? (
          "Chưa có xếp hạng"
        ) : prop.rating_point === 5 ? (
          <Box>
            {Array.from({ length: 5 }, (_, idx) => (
              <Star key={idx} color="warning"></Star>
            ))}
          </Box>
        ) : (
          <Box>
            {Array.from({ length: prop.rating_point }, (_, idx) => (
              <Star key={idx} color="warning"></Star>
            ))}
            {Array.from({ length: 5 - prop.rating_point }, (_, idx) => (
              <Star key={idx} className="text-dark opacity-25"></Star>
            ))}
          </Box>
        ),
      };
    });
    setData(data_table);
    setTotal(data.totalPage);
  };

  const FeedbackQuery = useQueryTable(
    "feedback-list",
    feedbackApi.getList,
    handleData,
    filterName && filterValue
      ? {
          _start,
          _limit,
          [filterName]: filterValue,
        }
      : {
          _start,
          _limit,
        },
  );

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
              Danh sách đánh giá
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
              loading={FeedbackQuery.isLoadingyTablfeedbackApi}
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
              // getTdProps={(state, rowInfo, column, instance) => {
              //   return {
              //     onClick: (e, handleOriginal) => {
              //       if (column.id !== "options") {
              //         history.push("/order/detail", {
              //           id: rowInfo.row.id,
              //         });
              //       }
              //     },
              //   };
              // }}
            />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(FeedbackList);
