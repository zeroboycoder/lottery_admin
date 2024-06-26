import { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Pagination,
  Button,
  TextField,
  Modal,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Loading from "../components/loading/loading";
import moment from "moment";
import axios from "axios";
import { baseUrl } from "../config/base_url";

const AgentPage = () => {
  const [openModal, setOpenModal] = useState(false);
  const [agents, setAgents] = useState([]);
  const [phone, setPhone] = useState(null);
  const [name, setName] = useState(null);
  const [password, setPassword] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [loading, setLoading] = useState(true);
  const [inputLoading, setInputLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(null);

  const showPerPage = 10;

  useEffect(() => {
    const fetchAgent = async () => {
      const res = await axios.get(
        `${baseUrl}/admin/agent?page=${page}&showPerPage=${showPerPage}&sort=desc`
      );
      setAgents(res.data.data.data);
      setCount(res.data.data.totalCount);
      setLoading(false);
    };
    fetchAgent();
  }, [page]);

  const columns = [
    { field: "id", headerName: "No", width: 90 },
    { field: "name", headerName: "Name", width: 150 },
    {
      field: "phone",
      headerName: "Phone",
      width: 130,
    },
    {
      field: "registerDate",
      headerName: "Register Date",
      width: 130,
    },
  ];

  const rows = agents?.map((agent, i) => ({
    ...agent,
    id: ++i + (page - 1) * showPerPage,
    registerDate: moment(agent?.createdAt).format("DD MMM YYYY"),
  }));

  const createAgentHandler = async () => {
    setInputLoading(true);
    try {
      const data = {
        phone,
        name,
        password,
      };
      const res = await axios.post(`${baseUrl}/agent/auth/register`, data);
      setInputLoading(false);
      setAgents(res.data.data.data);
      setCount(res.data.data.totalCount);
      setOpenModal(false);
    } catch (error) {
      setInputLoading(false);
      setErrorMsg(error.response.data.msg);
    }
  };

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
                Agents
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
              Creae Agent
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
                <h1 className="text-xl font-medium">Create Agent</h1>
                <TextField
                  id="outlined-basic"
                  label="Phone"
                  variant="outlined"
                  onChange={(e) => setPhone(e.target.value)}
                />
                <TextField
                  id="outlined-basic"
                  label="Name"
                  variant="outlined"
                  onChange={(e) => setName(e.target.value)}
                />
                <TextField
                  id="outlined-basic"
                  label="Password"
                  variant="outlined"
                  onChange={(e) => setPassword(e.target.value)}
                />
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
                    onClick={createAgentHandler}
                  >
                    Create Agent
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

export default AgentPage;
