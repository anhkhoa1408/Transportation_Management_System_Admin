import { Add, Info } from "@mui/icons-material";
import {
  Box,
  Button, Grid, Paper,
  Typography
} from "@mui/material";
import moment from "moment";
import React, { useMemo, useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import ReactTable from "react-table-v6";
import { Badge } from "reactstrap";
import { CustomPagination } from "../../../components/CustomPagination";
import Filter from "../../../components/FilterTable";
import LoadingTable from "../../../components/LoadingTable";
import { reportType } from "../../../utils/filterParams";
import { convertReportType } from "../../../utils/report";
import reportApi from "./../../../api/reportApi";
import { useQueryTable } from "./../../../utils/queryUtils.js";

export const ReportList = (props) => {
  const [data, setData] = useState([]);
  const [_start, setStart] = useState(0);
  const [totalPage, setTotal] = useState(0);
  const [_limit, setLimit] = useState(10);
  const [sort, setSort] = useState("createdAt:DESC");

  const history = useHistory();

  const filterParam = [
    {
      value: "storage.name",
      name: "Thuộc kho",
      type: "input",
    },
    {
      value: "stocker.name",
      name: "Người thực hiện",
      type: "input",
    },
    {
      value: "type",
      name: "Loại báo cáo",
      type: "select",
      params: reportType
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
        Header: "Ngày thực hiện",
        accessor: "createdAt",
        filterable: false,
        sortable: true,
      },
      {
        Header: "Ngày cập nhật",
        accessor: "updatedAt",
        filterable: false,
        sortable: true,
      },
      {
        Header: "Người thực hiện",
        accessor: "stocker",
        filterable: false,
        sortable: true,
      },
      {
        Header: "Tên kho",
        accessor: "storage",
        filterable: false,
        sortable: true,
      },
      {
        Header: "Loại báo cáo",
        accessor: "type",
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

  const handleReportTypeStyle = (type) => {
    switch (type) {
      case "day":
        return (
          <Badge className="app-bg--neutral-primary">
            <span className="app--primary">Báo cáo ngày</span>
          </Badge>
        );
      case "week":
        return (
          <Badge className="app-bg--neutral-secondary">
            <span className="app--secondary">Báo cáo tuần</span>
          </Badge>
        );
      case "month":
        return (
          <Badge className="app-bg--neutral-success">
            <span className="app--success">Báo cáo tháng</span>
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
    let data_table = data.map((prop, index) => {
      return {
        ...prop,
        stt: _start * _limit + index + 1,
        stocker: prop.stocker.name,
        storage: prop.storage.name,
        createdAt: moment(prop.createdAt).format("DD/MM/YYYY HH:mm"),
        updatedAt: moment(prop.updatedAt).format("DD/MM/YYYY HH:mm"),
        type: handleReportTypeStyle(prop.type),
        options: (
          <Button
            variant="contained"
            endIcon={<Info />}
            className="app-bg--primary"
            onClick={() =>
              history.push("/report/detail", {
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

  const ReportQuery = useQueryTable(
    "report-list",
    reportApi.getList,
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
    "report-count",
    reportApi.getCount,
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
              Danh sách báo cáo
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
                  history.push("/report/create", {
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
              loading={ReportQuery.isLoading || SizeQuery.isLoading}
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
                      history.push("/report/detail", {
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

export default connect(mapStateToProps, mapDispatchToProps)(ReportList);
