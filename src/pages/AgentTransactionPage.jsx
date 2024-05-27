import { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import {
  Typography,
  Container,
  Modal,
  TextField,
  Button,
  Pagination,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import axios from "axios";
import moment from "moment";
import Loading from "../components/loading/loading";
import { baseUrl } from "../config/base_url";

const AgentTransactionPage = () => {
  const [openModal, setOpenModal] = useState(false);
  const [transaction, setTransaction] = useState([]);
  const [phone, setPhone] = useState(null);
  const [amount, setAmount] = useState();
  const [date, setDate] = useState();
  const [errorMsg, setErrorMsg] = useState(null);
  const [loading, setLoading] = useState(true);
  const [inputLoading, setInputLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(null);

  const showPerPage = 10;

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(
        `${baseUrl}/admin/transaction?page=${page}&showPerPage=${showPerPage}&sort=desc`
      );
      setTransaction(res.data.data.data);
      setCount(res.data.data.totalCount);
      setLoading(false);
    };
    fetchData();
  }, [page]);

  const addTransactionHandler = async () => {
    try {
      setInputLoading(true);
      const data = {
        phone,
        amount,
        date: moment(date).format("YYYY-MM-DD"),
      };

      const res = await axios.post(`${baseUrl}/admin/transaction`, data);
      setTransaction(res.data.data.data);
      setInputLoading(false);
      setPhone(null);
      setAmount(null);
      setDate(null);
      setOpenModal(false);
    } catch (error) {
      setOpenModal(false);
      setErrorMsg(error.response.data.msg);
    }
  };

  const columns = [
    { field: "id", headerName: "No", width: 100 },
    { field: "name", headerName: "Name", width: 150 },
    {
      field: "phone",
      headerName: "Phone",
      width: 130,
    },
    {
      field: "date",
      headerName: "Pay Date",
      width: 130,
    },
    {
      field: "amount",
      headerName: "Amount",
      width: 130,
    },
  ];

  const rows = transaction
    ? transaction?.map((trx, i) => ({
        id: ++i + (page - 1) * showPerPage,
        ...trx,
        name: trx.agentId.name,
        phone: trx.agentId.phone,
        amount: trx.amount + " Ks",
      }))
    : [];

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div>
          <Container>
            {/* Latest Bets */}
            <div style={{ height: "100%", width: "100%" }}>
              <Typography variant="h5" my={2}>
                Agent Transactions
              </Typography>
              <DataGrid
                rows={rows}
                columns={columns}
                initialState={{
                  pagination: {
                    paginationModel: { pageSize: showPerPage },
                  },
                }}
              />
              <div className="flex justify-end w-full  mt-3">
                <Pagination
                  count={Math.ceil(count / showPerPage)}
                  color="error"
                  onChange={(event, value) => setPage(value)}
                />
              </div>
            </div>
          </Container>

          <Container className="fixed bottom-0 w-full py-3 border border-t-2 bg-white">
            <Button
              variant="outlined"
              className="w-full"
              color="error"
              onClick={() => setOpenModal(true)}
            >
              Add Transaction
            </Button>
          </Container>

          <Modal
            open={openModal}
            onClose={() => setOpenModal(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10/12 bg-white p-5">
              <div className="flex flex-col space-y-3">
                <h1 className="text-xl font-medium">Add transaction</h1>
                <TextField
                  id="outlined-basic"
                  label="Phone"
                  variant="outlined"
                  onChange={(e) => setPhone(e.target.value)}
                />
                <TextField
                  id="outlined-basic"
                  label="Amount"
                  variant="outlined"
                  onChange={(e) => setAmount(e.target.value)}
                />
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker onChange={(e) => setDate(e)} />
                </LocalizationProvider>
                {errorMsg && (
                  <p className="text-red-500 text-sm m-0">{errorMsg}</p>
                )}
                {inputLoading ? (
                  <Button variant="outlined" color="error">
                    Loading...
                  </Button>
                ) : (
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={addTransactionHandler}
                  >
                    Limit Number
                  </Button>
                )}
              </div>
            </div>
          </Modal>
        </div>
      )}
    </>
  );
};

export default AgentTransactionPage;
