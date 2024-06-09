import { useState } from "react";
import {
  Container,
  Typography,
  Button,
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  Paper,
  Divider,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Loading from "../components/loading/loading";
import axios from "axios";
import moment from "moment";
import { baseUrl } from "../config/base_url";

const ReportPage = () => {
  const [month, setMonth] = useState(null);
  const [year, setYear] = useState(null);
  const [winningNumbers, setWinningNumbers] = useState([]);
  const [totalBetAmount, setTotalBetAmount] = useState(null);
  const [totalDirectWinningAmount, setTotalDirectWinningAmount] =
    useState(null);
  const [totalWinningAmount, setTotalWinningAmount] = useState(null);
  const [totalTootWinningAmount, setTotalTootWinningAmount] = useState(null);
  const [totalWinLose, setTotalWinLose] = useState(null);

  const [loading, setLoading] = useState(false);

  const onSearchHandler = async () => {
    setLoading(true);
    const res = await axios.get(
      `${baseUrl}/admin/report/montly-report/${month}/${year}`
    );
    setWinningNumbers(res.data.data.winningNumbers);
    setTotalBetAmount(res.data.data.totalBetAmount);
    setTotalDirectWinningAmount(res.data.data.totalDirectWinningAmount);
    setTotalTootWinningAmount(res.data.data.totalTootWinningAmount);
    setTotalWinningAmount(res.data.data.totalWinningAmount);
    setTotalWinLose(res.data.data.totalWinLose);
    setLoading(false);
  };

  const winningNumberTables =
    winningNumbers.length > 0
      ? winningNumbers.map((winningNumber, i) => {
          return (
            <div key={i}>
              <h2 className="font-medium mb-2">{winningNumber.date}</h2>
              <TableContainer component={Paper}>
                <Table className="w-full border" aria-label="simple table">
                  <TableBody>
                    <TableRow>
                      <TableCell>Direct Number</TableCell>
                      <TableCell>{winningNumber.winningNumber}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Toot Number</TableCell>
                      <TableCell>
                        {winningNumber.tootNumbers.join(", ")}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
              <Divider style={{ margin: "1.5rem 0 1rem 0" }} />
            </div>
          );
        })
      : [];

  return (
    <>
      <Container>
        {/* Latest Bets */}
        <div style={{ height: "100%", width: "100%" }}>
          <Typography variant="h5" my={2}>
            Monthly Report
          </Typography>
          <div className="mb-6">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <div className="flex space-x-3">
                <DatePicker
                  label="Year"
                  openTo="year"
                  views={["year"]}
                  className="w-36"
                  onChange={(value) => setYear(moment(new Date(value)).year())}
                />
                <DatePicker
                  label="Month"
                  openTo="month"
                  views={["month"]}
                  className="w-36"
                  onChange={(value) =>
                    setMonth(moment(new Date(value)).format("MMMM"))
                  }
                />
                <Button
                  variant="outlined"
                  color="error"
                  className="w-28"
                  onClick={onSearchHandler}
                >
                  Search
                </Button>
              </div>
            </LocalizationProvider>
          </div>
          {loading ? (
            <Loading />
          ) : (
            <>
              <TableContainer component={Paper}>
                <Table className="w-full border" aria-label="simple table">
                  <TableBody>
                    <TableRow>
                      <TableCell>Total Bet Amount</TableCell>
                      <TableCell>
                        {totalBetAmount
                          ? totalBetAmount.toLocaleString("en-US")
                          : 0}{" "}
                        Ks
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Total Direct Winning Amount</TableCell>
                      <TableCell>
                        {totalDirectWinningAmount
                          ? totalDirectWinningAmount.toLocaleString("en-US")
                          : 0}{" "}
                        Ks
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Total Toot Winning Amount</TableCell>
                      <TableCell>
                        {totalTootWinningAmount
                          ? totalTootWinningAmount.toLocaleString("en-US")
                          : 0}{" "}
                        Ks
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Total Winning Amount</TableCell>
                      <TableCell>
                        {totalWinningAmount
                          ? totalWinningAmount.toLocaleString("en-US")
                          : 0}{" "}
                        Ks
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Total Win Lose</TableCell>
                      <TableCell
                        style={
                          totalWinLose && parseInt(totalWinLose) < 0
                            ? { color: "red" }
                            : { color: "green" }
                        }
                      >
                        {totalWinLose
                          ? totalWinLose.toLocaleString("en-US")
                          : 0}{" "}
                        Ks
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
              <Divider style={{ margin: "1.5rem 0 1rem 0" }} />

              <h2 className="font-medium text-xl mb-2">
                {winningNumbers.length > 0 && "Winning Numbers"}
              </h2>
              {winningNumberTables}
            </>
          )}
        </div>
      </Container>
    </>
  );
};

export default ReportPage;
