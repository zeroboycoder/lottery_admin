import { useState, useEffect } from "react";
import { Container, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Loading from "../components/loading/loading";
import moment from "moment";
import axios from "axios";
import { baseUrl } from "../config/base_url";

const resultHistoriesPage = () => {
  const [agents, setAgents] = useState([]);
  const [showPerPage, setShowPerPage] = useState(5);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const fetchAgent = async () => {
      const res = await axios.get(
        `${baseUrl}/admin/agent?page=1&showPerPage=10&sort=desc`
      );
      setAgents(res.data.data.data);
      setShowPerPage(res.data.data.showPerPage);
      setLoading(false);
    };
    fetchAgent();
  }, []);

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
    id: ++i,
    registerDate: moment(agent?.createdAt).format("DD MMM YYYY"),
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
              Agents
            </Typography>
            <DataGrid
              rows={rows}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 5 },
                },
              }}
              pageSizeOptions={[5, 10]}
            />
          </div>
        </Container>
      )}
    </>
  );
};

export default resultHistoriesPage;
