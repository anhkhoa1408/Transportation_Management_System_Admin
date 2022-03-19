import { Add, FilterList, Info } from "@mui/icons-material";
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
import userApi from './../../../api/userApi'
import { handleUserRole } from "../../../utils/role";

export const CustomerList = (props) => {
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
        Header: "Tên",
        accessor: "name",
        filterable: false,
      },
      {
        Header: "Số điện thoại",
        accessor: "phone",
        filterable: false,
      },
      {
        Header: "Loại thành viên",
        accessor: "type",
        filterable: false,
      },
      {
        Header: "Ngày sinh",
        accessor: "birthday",
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
    let data_table = data.customers.map((prop, index) => {
      return {
        ...prop,
        type: handleUserRole(prop.type),
        stt: _start * _limit + index + 1,
        options: (
          <Button
            variant="contained"
            endIcon={<Info />}
            className="app-primary-bg-color"
            onClick={() => history.push("/customer/info")}
          >
            Chi tiết
          </Button>
        ),
      };
    });
    setData(data_table);
    setTotal(data.totalPage)
  };

  const CustomerQuery = useQueryTable("customer-list", userApi.getCustomers, handleData, {
    _start,
    _limit,
  });

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
              Danh sách khách hàng
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
              }}
              className="-striped -highlight"
              getTdProps={(state, rowInfo, column, instance) => {
                return {
                  onClick: (e, handleOriginal) => {
                    if (column.id !== "options") {
                      history.push("/customer/info", {
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

export default connect(mapStateToProps, mapDispatchToProps)(CustomerList);
