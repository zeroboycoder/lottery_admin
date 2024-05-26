import { useState, useEffect } from "react";
import { Container, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Loading from "../components/loading/loading";
import axios from "axios";
import moment from "moment";
import { baseUrl } from "../config/base_url";

const ResultHistoriesPage = () => {
  const [winners, setWinners] = useState([]);
  const [showPerPage, setShowPerPage] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      const res = await axios.get(
        `${baseUrl}/admin/winner?page=1&showPerPage=10&sort=desc`
      );
      console.log(res.data.data.data);
      setWinners(res.data.data.data);
      setShowPerPage(res.data.data.showPerPage);
      setLoading(false);
    };
    fetchData();
  }, []);

  const columns = [
    { field: "id", headerName: "No", width: 70 },
    { field: "date", headerName: "Date", width: 130 },
    {
      field: "playerName",
      headerName: "Name",
      width: 130,
    },
    {
      field: "betAmount",
      headerName: "Bet Amount",
      width: 130,
    },
    {
      field: "winningAmount",
      headerName: "Winning Amount",
      width: 130,
    },
  ];

  const rows = winners?.map((winner, i) => ({
    id: ++i,
    ...winner,
    date: moment(winner.date).format("YYYY-MM-DD"),
  }));

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <Container>
          {/* Latest Bets */}
          <div style={{ height: "100%", width: "100%" }}>
            <Typography variant="h5" my={2}>
              Winner Lists
            </Typography>
            <DataGrid
              rows={rows}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: showPerPage },
                },
              }}
            />
          </div>
        </Container>
      )}
    </>
  );
};

export default ResultHistoriesPage;
