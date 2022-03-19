import React, { useEffect, useMemo, useState } from "react";
import { connect } from "react-redux";
import {
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  Paper,
  Typography,
} from "@mui/material";
import ReactTable from "react-table-v6";
import { Add, FilterList, Info } from "@mui/icons-material";
import { CustomPagination } from "../../../components/CustomPagination";
import { useHistory } from "react-router-dom";
import { useQueryTable } from "./../../../utils/queryUtils.js";
import Loading from "./../../../components/Loading";
import moment from "moment";
import LoadingTable from "../../../components/LoadingTable";
import reportApi from './../../../api/reportApi'

export const ReportList = (props) => {
  const [data, setData] = useState([]);
  const [_start, setStart] = useState(0);
  const [totalPage, setTotal] = useState(0);
  const [_limit, setLimit] = useState(10);

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
        Header: "Ngày thực hiện",
        accessor: "createdAt",
        filterable: false,
      },
      {
        Header: "Ngày cập nhật",
        accessor: "updatedAt",
        filterable: false,
      },
      {
        Header: "Người thực hiện",
        accessor: "stocker",
        filterable: false,
      },
      {
        Header: "Tên kho",
        accessor: "storage",
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
    console.log(data[0].stocker.name)
    let data_table = data.map((prop, index) => {
      return {
        ...prop,
        stt: _start * _limit + index + 1,
        stocker: prop.stocker.name,
        storage: prop.storage.name,
        createdAt: moment(prop.createdAt).format("DD/MM/YYYY HH:mm"),
        updatedAt: moment(prop.updatedAt).format("DD/MM/YYYY HH:mm"),
        options: (
          <Button
            variant="contained"
            endIcon={<Info />}
            className="app-primary-bg-color"
            onClick={() => history.push("/report/detail")}
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

  const ReportQuery = useQueryTable("report-list", reportApi.getList, handleData, {
    _start,
    _limit,
  });

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
              Danh sách báo cáo
            </Typography>
            <Box>
              <Button variant="outlined" className="me-2" endIcon={<Add />}>
                Thêm
              </Button>
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
              }}
              className="-striped -highlight"
              getTdProps={(state, rowInfo, column, instance) => {
                return {
                  onClick: (e, handleOriginal) => {
                    if (column.id !== "options") {
                      history.push("/report/detail", {
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

export default connect(mapStateToProps, mapDispatchToProps)(ReportList);
