import { useState, useEffect } from "react";
import { Container, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { baseUrl } from "../config/base_url";
import Loading from "../components/loading/loading";

const LatestBetPage = () => {
  const [betDatas, setBetData] = useState([]);
  const [showPerPage, setShowPerPage] = useState(5);
  const [loading, setLoading] = useState();

  useEffect(() => {
    setLoading(true);
    const fetchLatestBets = async () => {
      const res = await axios.get(
        `${baseUrl}/admin/betting?page=1&showPerPage=10&sort=desc`
      );
      setBetData(res.data.data.data);
      setShowPerPage(res.data.data.showPerPage);
      setLoading(false);
    };
    fetchLatestBets();
  }, []);

  const columns = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "playerName", headerName: "Name", width: 130 },
    {
      field: "betNumber",
      headerName: "Bet Number",
      width: 200,
    },
    { field: "betDate", headerName: "Bet Date", width: 190 },
    {
      field: "betAmount",
      headerName: "Bet Amount",
      width: 160,
    },
  ];

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <Container>
          {/* Latest Bets */}
          <div style={{ height: "100%", width: "100%" }}>
            <Typography variant="h5" my={2}>
              Latest Bets
            </Typography>
            <DataGrid
              rows={betDatas}
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

export default LatestBetPage;
