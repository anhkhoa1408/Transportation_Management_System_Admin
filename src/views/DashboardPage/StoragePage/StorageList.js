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
import { Badge } from "reactstrap";
import LoadingTable from "../../../components/LoadingTable";
import { useQueryTable } from "./../../../utils/queryUtils.js";
import { joinAddress } from "./../../../utils/address";
import storageApi from "./../../../api/storageApi";

export const StorageList = (props) => {
  const [data, setData] = useState([]);
  const [_start, setStart] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const [total, setTotal] = useState(0);
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
        Header: "Địa chỉ",
        accessor: "address",
        filterable: false,
      },
      {
        Header: "Diện tích kho",
        accessor: "size",
        filterable: false,
      },
      {
        Header: "Thủ kho",
        accessor: "store_managers",
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
        address: joinAddress(prop.address),
        size: prop.size + " m²",
        store_managers: prop.store_managers[0].name,
        options: (
          <Button
            variant="contained"
            endIcon={<Info />}
            className="app-primary-bg-color"
            onClick={() => history.push("/storage/info", {
              id: prop.id
            })}
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

  const VehicleQuery = useQueryTable(
    "vehicle-list",
    storageApi.getList,
    handleData,
    {
      _start,
      _limit,
    },
  );

  const SizeQuery = useQueryTable(
    "order-count",
    storageApi.getCount,
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
              Danh sách kho hàng
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
              loading={VehicleQuery.isLoading || SizeQuery.isLoading}
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
                      history.push("/storage/info", {
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

export default connect(mapStateToProps, mapDispatchToProps)(StorageList);
