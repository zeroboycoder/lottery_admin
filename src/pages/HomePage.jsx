import { useState, useEffect } from "react";
import { Container, Typography, Divider } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { Checklist } from "@mui/icons-material";
import DashboardBox from "../components/box/DashbaordBox";
import axios from "axios";
import moment from "moment";
import { baseUrl } from "../config/base_url";

const HomePage = () => {
  const [todayBetCount, setTodayBetCount] = useState(null);
  const [totalBetCount, setTotalBetCount] = useState(null);
  const [latestBets, setLatestBets] = useState([]);
  const totalBetCountStartDate = moment()
    .startOf("years")
    .format("DD MMM YYYY");

  const totalBetCountEndDate = moment().endOf("years").format("DD MMM YYYY");

  useEffect(() => {
    const fetchTodayBetCount = async () => {
      const res = await axios.get(`${baseUrl}/admin/dashboard/today-bet-count`);
      setTodayBetCount(res.data?.data?.count);
    };
    const fetchTotalBetCount = async () => {
      const res = await axios.get(`${baseUrl}/admin/dashboard/total-bet-count`);
      setTotalBetCount(res.data?.data?.count);
    };
    const latestFiveBet = async () => {
      const res = await axios.get(
        `${baseUrl}/admin/betting?page=1&showPerPage=10&sort=desc`
      );
      setLatestBets(res.data?.data?.data);
    };
    fetchTodayBetCount();
    fetchTotalBetCount();
    latestFiveBet();
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
    <Container>
      {/* Dashboard Box */}
      <div>
        {todayBetCount !== null ? (
          <DashboardBox
            name="Today Bets"
            icon={<Checklist />}
            shadowColor="#0093fe66"
            count={todayBetCount}
          />
        ) : null}
        {totalBetCount !== null ? (
          <DashboardBox
            name="Total Bets"
            icon={<Checklist />}
            shadowColor="#f1c62d66"
            count={totalBetCount}
            date={`${totalBetCountStartDate} - ${totalBetCountEndDate}`}
          />
        ) : null}
      </div>
      <Divider />
      {/* Latest Bets */}
      <div style={{ height: 400, width: "100%" }}>
        <Typography variant="h6" my={2}>
          Latest Bets
        </Typography>
        <DataGrid
          rows={latestBets}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
        />
      </div>
    </Container>
  );
};

export default HomePage;
