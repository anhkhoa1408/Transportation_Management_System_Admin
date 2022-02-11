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
import { Add, FilterList, Info, Star } from "@mui/icons-material";
import { CustomPagination } from "../../../components/CustomPagination";
import { useHistory } from "react-router-dom";

export const FeedbackList = (props) => {
  const [data, setData] = useState([
    {
      id: 1,
      customerName: "Yoga Shibe",
      date: "12/12/2012",
      rank: 4,
      comment: "Vận chuyển rất bruh",
    },
  ]);

  const history = useHistory();

  const columns = useMemo(
    () => [
      {
        Header: "ID",
        accessor: "id",
        filterable: false,
        width: 100,
      },
      {
        Header: "Tên khách hàng",
        accessor: "customerName",
        filterable: false,
      },
      {
        Header: "Ngày đánh giá",
        accessor: "date",
        filterable: false,
      },
      {
        Header: "Xếp hạng",
        accessor: "rank",
        filterable: false,
      },
      {
        Header: "Bình luận",
        accessor: "comment",
        filterable: false,
      },
    ],
    [],
  );

  const handleData = (data) => {
    let data_table = data.map((prop, index) => {
      return {
        ...prop,
        rank:
          prop.rank === 5 ? (
            <Box>
              {Array.from({ length: 5 }, (_, idx) => (
                <Star key={idx} color="warning"></Star>
              ))}
            </Box>
          ) : (
            <Box>
              {Array.from({ length: prop.rank }, (_, idx) => (
                <Star key={idx} color="warning"></Star>
              ))}
              {Array.from({ length: 5 - prop.rank }, (_, idx) => (
                <Star key={idx} className="text-dark opacity-25"></Star>
              ))}
            </Box>
          ),
      };
    });
    setData(data_table);
  };

  useEffect(() => {
    if (data.length) handleData(data);
  }, []);

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
              data={data}
              columns={columns}
              previousText={"<"}
              nextText={">"}
              rowsText={"hàng"}
              ofText="/"
              // loading={<div>aaaa</div>}
              // LoadingComponent={LoadingTable}
              manual
              defaultPageSize={10}
              showPaginationBottom={true}
              sortable={false}
              resizable={false}
              PaginationComponent={() => <CustomPagination />}
              // pages={totalPage}
              className="-striped -highlight"
              // getTdProps={(state, rowInfo, column, instance) => {
              //   return {
              //     onClick: (e, handleOriginal) => {
              //       console.log(column);
              //       if (column.id !== "options") {
              //         history.push("/report/detail/1223");
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
