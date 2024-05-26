import { useState, useEffect } from "react";
import { Container, Typography, Modal, TextField, Button } from "@mui/material";
import { Add, WindowSharp } from "@mui/icons-material";
import { DataGrid } from "@mui/x-data-grid";
import Loading from "../components/loading/loading";
import axios from "axios";
import { baseUrl } from "../config/base_url";

const WinningNumberPage = () => {
  const [openModal, setOpenModal] = useState(false);
  const [winningNumbers, setWinningNumbers] = useState([]);
  const [showPerPage, setShowPerPage] = useState();
  const [loading, setLoading] = useState(true);
  const [number, setNumber] = useState();

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      const res = await axios.get(
        `${baseUrl}/admin/winning-number?page=1&showPerPage=5&sort=desc`
      );
      setWinningNumbers(res.data.data.data);
      setShowPerPage(res.data.data.showPerPage);
      setLoading(false);
    };
    fetchData();
  }, []);

  const addWinningNumberHandler = async () => {
    const res = await axios.post(`${baseUrl}/admin/winning-number`, {
      number: number,
    });
    setOpenModal(false);
    window.location.reload();
  };

  const rows = winningNumbers.map((winningNumber, i) => ({
    id: ++i,
    ...winningNumber,
  }));

  const columns = [
    { field: "id", headerName: "No", width: 100 },
    { field: "date", headerName: "Date", width: 130 },
    {
      field: "winningNumber",
      headerName: "Winning Number",
      width: 200,
    },
  ];

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <Container>
            {/* Latest Bets */}
            <div style={{ height: "100%", width: "100%" }}>
              <Typography variant="h5" my={2}>
                Winning Numbers
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

            {/* Add Winnig Number */}
            <Modal
              open={openModal}
              onClose={() => setOpenModal(false)}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10/12 bg-white p-5">
                <div className="flex flex-col space-y-3">
                  <h1 className="text-xl font-medium">Add winning number</h1>
                  <TextField
                    id="outlined-basic"
                    label="Number"
                    variant="outlined"
                    onChange={(e) => setNumber(e.target.value)}
                  />
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={addWinningNumberHandler}
                  >
                    Add Winning Number
                  </Button>
                </div>
              </div>
            </Modal>
          </Container>
          <div className="bg-blue-400 w-fit rounded-full fixed bottom-4 right-4">
            <Button
              variant="contained"
              endIcon={<Add />}
              color="error"
              onClick={() => setOpenModal(true)}
            >
              Add Winning Number
            </Button>
          </div>
        </>
      )}
    </>
  );
};

export default WinningNumberPage;
