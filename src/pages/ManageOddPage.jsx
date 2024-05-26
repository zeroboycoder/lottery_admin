import { useState, useEffect } from "react";
import { Container, Button, Modal, TextField } from "@mui/material";
import Loading from "../components/loading/loading";
import axios from "axios";
import { baseUrl } from "../config/base_url";

const ManageOddPage = () => {
  const [openModal, setOpenModal] = useState(false);
  const [odds, setOdds] = useState(null);
  const [number, setNumber] = useState();
  const [loading, setLoading] = useState(true);
  const [inputLoading, setInputLoading] = useState(false);

  useEffect(() => {
    const fetchOdds = async () => {
      setLoading(true);
      const res = await axios.get(`${baseUrl}/admin/setting/odds`);
      console.log(res.data.data);
      setOdds(res.data.data);
      setLoading(false);
    };
    fetchOdds();
  }, []);

  const updateOddsHandler = async () => {
    try {
      setInputLoading(true);
      const res = await axios.post(`${baseUrl}/admin/setting/odds`, {
        odds: number,
      });
      setOdds(res.data.data);
      setInputLoading(false);
      setOpenModal(false);
    } catch (error) {
      setInputLoading(false);
    }
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <Container>
            <h1 className="text-2xl font-bold mb-xl">Current Odds</h1>
            <div className="flex  mt-4">
              <p className="border border-red-500 py-3 px-4 w-fit text-xl font-medium">
                {odds ? `${odds}X` : <p>No odds currently set.</p>}
              </p>
            </div>
          </Container>
          <Container className="fixed bottom-0 w-full py-3 border border-t-2 bg-white">
            <Button
              variant="outlined"
              className="w-full"
              color="error"
              onClick={() => setOpenModal(true)}
            >
              Update Odds
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
                <h1 className="text-xl font-medium">Update Odds</h1>
                <TextField
                  id="outlined-basic"
                  label="Odds"
                  variant="outlined"
                  onChange={(e) => setNumber(e.target.value)}
                />
                {inputLoading ? (
                  <Button variant="outlined" color="error">
                    Loading...
                  </Button>
                ) : (
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={updateOddsHandler}
                  >
                    Update
                  </Button>
                )}
              </div>
            </div>
          </Modal>
        </>
      )}
    </>
  );
};

export default ManageOddPage;
