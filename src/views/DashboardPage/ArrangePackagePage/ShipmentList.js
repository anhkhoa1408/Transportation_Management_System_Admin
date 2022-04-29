import { Add, Info } from "@mui/icons-material";
import { Box, Button, Grid, Paper, Typography } from "@mui/material";
import moment from "moment";
import React, { useMemo, useState } from "react";
import { connect, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import ReactTable from "react-table-v6";
import shipmentApi from "../../../api/shipmentApi";
import { CustomPagination } from "../../../components/CustomPagination";
import Filter from "../../../components/FilterTable";
import LoadingTable from "../../../components/LoadingTable";
import { joinAddress } from "./../../../utils/address";
import { useQueryTable } from "./../../../utils/queryUtils.js";
import { arriveType, shipmentCreatedType } from "./../../../utils/filterParams";

export const ShipmentList = (props) => {
  const [data, setData] = useState([]);
  const [_start, setStart] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const [total, setTotal] = useState(0);
  const [_limit, setLimit] = useState(10);
  const [sort, setSort] = useState("createdAt:DESC");

  const userInfo = useSelector((state) => state.userInfo.user);

  const history = useHistory();

  const filterParam = [
    {
      value: "driver.name_contains",
      name: "Người vận chuyển",
      type: "input",
    },
    {
      value: "from_storage.name_contains",
      name: "Từ kho",
      type: "input",
    },
    {
      value: "to_storage.name_contains",
      name: "Đến kho",
      type: "input",
    },
    {
      value: "arrived_time_null",
      name: "Hoàn thành",
      type: "select",
      params: arriveType,
    },
    {
      value: "_sort",
      name: "Thời gian tạo",
      type: "select",
      params: shipmentCreatedType,
    },
    {
      value: "driver_null",
      name: "Chưa được nhận",
      type: "select",
      params: [
        {
          value: "true",
          label: "Chưa nhận",
        },
        {
          value: "false",
          label: "Đã nhận",
        },
      ],
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
        width: 50,
      },
      {
        Header: "Chờ nhận",
        accessor: "status",
        filterable: false,
      },
      {
        Header: "Người phụ trách",
        accessor: "driver",
        sortable: true,
        filterable: false,
      },
      {
        Header: "Từ địa chỉ",
        accessor: "from_address",
        filterable: false,
        sortable: true,
      },
      {
        Header: "Đến địa chỉ",
        accessor: "to_address",
        filterable: false,
        sortable: true,
      },
      {
        Header: "Loại hình",
        accessor: "type",
        filterable: false,
      },
      {
        Header: "Chờ hoàn thành",
        accessor: "arrived_time",
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

  const calcWaitingShipmentTime = (startDate) => {
    let start = new Date(startDate);
    let end = new Date();
    let diff = Math.abs(end - start);
    let diffToDate = diff / (1000 * 60 * 60 * 24);
    let remainHour = ((diff % (1000 * 60 * 60)) / (1000 * 60 * 60)) * 24;
    return `${Math.floor(diffToDate)} ngày ${Math.floor(remainHour)} giờ`;
  };

  const handleData = (data) => {
    let data_table = data.map((prop, index) => {
      return {
        ...prop,
        stt: _start * _limit + index + 1,
        status: prop.driver
          ? "Đã được nhận"
          : calcWaitingShipmentTime(prop.updatedAt),
        driver: prop?.driver?.name || "Chưa có",
        type:
          prop.from_storage && prop.to_storage
            ? "Liên tỉnh"
            : prop.from_storage && !prop.to_storage
            ? "Giao hàng"
            : "Thu gom hàng",
        from_address: joinAddress(prop.from_address),
        to_address: joinAddress(prop.to_address),
        arrived_time: prop.arrived_time
          ? moment(prop.arrived_time).format("DD/MM/YYYY HH:mm")
          : calcWaitingShipmentTime(prop.createdAt),
        options: (
          <Button
            variant="contained"
            endIcon={<Info />}
            className="app-primary-bg-color"
            onClick={() =>
              history.push("/shipment/detail", {
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

  const ShipmentQuery = useQueryTable(
    "shipment-list",
    shipmentApi.getList,
    handleData,
    filterName && filterValue
      ? {
          _start,
          _limit,
          [filterName]: filterValue,
          _sort: sort
        }
      : {
          _start,
          _limit,
          _sort: sort
        },
  );

  const SizeQuery = useQueryTable(
    "shipment-count",
    shipmentApi.getCount,
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
              Danh sách chuyến xe
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
                onClick={() => history.push("/shipment/arrange")}
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
              loading={ShipmentQuery.isLoading || SizeQuery.isLoading}
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
                      history.push("/shipment/detail", {
                        id: rowInfo.row["_original"].id,
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

export default connect(mapStateToProps, mapDispatchToProps)(ShipmentList);
