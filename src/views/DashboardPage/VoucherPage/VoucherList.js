import { Add, Info } from "@mui/icons-material";
import { Box, Button, Grid, Paper, Typography } from "@mui/material";
import moment from "moment";
import React, { useMemo, useState } from "react";
import { useHistory } from "react-router-dom";
import ReactTable from "react-table-v6";
import voucherApi from "../../../api/voucherApi";
import { CustomPagination } from "../../../components/CustomPagination";
import Filter from "../../../components/FilterTable";
import LoadingTable from "../../../components/LoadingTable";
import { useQueryTable } from "./../../../utils/queryUtils.js";
import voucher_alt from "./../../../assets/img/voucher_alt.jpg";
import { handleUserRole } from "../../../utils/role";
import { customerType, saleType } from "../../../utils/filterParams";

export const VoucherList = (props) => {
  const [data, setData] = useState([]);
  const [_start, setStart] = useState(0);
  const [totalPage, setTotal] = useState(0);
  const [_limit, setLimit] = useState(10);

  const history = useHistory();

  const filterParam = [
    {
      value: "name",
      name: "Tên voucher",
      type: "input",
    },
    {
      value: "sale_type",
      name: "Loại hình giảm giá",
      type: "select",
      params: saleType,
    },
    {
      value: "customer_type",
      name: "Khách hàng áp dụng",
      type: "select",
      params: [
        {
          value: "All",
          label: "Tất cả",
        },
        ...customerType,
      ],
    },
    {
      value: "sale_max_lte",
      name: "Giảm tối đa",
      type: "input",
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
      },
      {
        Header: "Ngày hết hạn",
        accessor: "expired",
        filterable: false,
      },
      {
        Header: "Hình ảnh",
        accessor: "voucher_img",
        filterable: false,
      },
      {
        Header: "Loại hình khách hàng",
        accessor: "customer_type",
        filterable: false,
      },
      {
        Header: "Chi tiết",
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
        customer_type: handleUserRole(prop.customer_type),
        expired: moment(prop.expired).format("DD/MM/YYYY"),
        voucher_img: prop.voucher_img ? (
          <div className="img-cropper__rounded-sm-small d-50 shadow-sm">
            <img
              alt=""
              src={process.env.MAIN_URL + prop.voucher_img.url}
              className="img-fit-container"
            />
          </div>
        ) : (
          <div className="img-cropper__rounded-sm-small d-50 shadow">
            <img alt="" src={voucher_alt} className="img-fit-container" />
          </div>
        ),
        options: (
          <Button
            variant="contained"
            endIcon={<Info />}
            className="app-primary-bg-color"
            onClick={() =>
              history.push("/voucher/detail", {
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
    setTotal(Math.ceil(data / _limit));
  };

  const VoucherQuery = useQueryTable(
    "voucher-list",
    voucherApi.getList,
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

  const SizeQuery = useQueryTable(
    "voucher-count",
    voucherApi.getCount,
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
              Danh sách mã giảm giá
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
                  history.push("/voucher/create", {
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
              loading={VoucherQuery.isLoading || SizeQuery.isLoading}
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
              getTdProps={(state, rowInfo, column, instance) => {
                return {
                  onClick: (e, handleOriginal) => {
                    if (column.id !== "options") {
                      history.push("/voucher/detail", {
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

export default VoucherList;
