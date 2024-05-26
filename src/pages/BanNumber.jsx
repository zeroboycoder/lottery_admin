import { useState, useEffect } from "react";
import { Container, Modal, TextField, Button } from "@mui/material";
import { Delete } from "@mui/icons-material";
import axios from "axios";
import { baseUrl } from "../config/base_url";

const SettingPage = () => {
  const [openModal, setOpenModal] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [number, setNumber] = useState();
  const [bannedNumbers, setBannedNumbers] = useState([]);

  useEffect(() => {
    const fetchBanNumbers = async () => {
      const res = await axios.get(`${baseUrl}/admin/setting/ban-number`);
      setBannedNumbers(res.data.data);
    };
    fetchBanNumbers();
  }, []);

  const addBanNumber = async () => {
    try {
      await axios.post(`${baseUrl}/admin/setting/ban-number`, {
        number,
      });
      setBannedNumbers([...bannedNumbers, number]);
      setErrorMsg(null);
      setOpenModal(false);
    } catch (error) {
      setErrorMsg(error.response.data.msg);
    }
  };

  const deleteBanNumber = async (num) => {
    await axios.delete(`${baseUrl}/admin/setting/ban-number`, {
      data: { num },
    });
    setBannedNumbers(bannedNumbers.filter((number) => number !== num));
  };

  const numberBoxes = bannedNumbers.map((number, i) => {
    return (
      <div
        className="flex justify-between border py-2 px-4 rounded shadow"
        key={i}
      >
        <p>{number}</p>
        <Delete
          fontSize="small"
          color="error"
          onClick={() => deleteBanNumber(number)}
        />
      </div>
    );
  });

  return (
    <>
      <Container>
        <h1 className="text-2xl font-medium mb-4">Banned Numbers</h1>
        <div className="space-y-5 mb-20">
          {numberBoxes.length <= 0 ? (
            <p className="text-sm">No banned numbers.</p>
          ) : (
            numberBoxes
          )}
        </div>
      </Container>
      <Container className="fixed bottom-0 w-full py-3 border border-t-2 bg-white">
        <Button
          variant="outlined"
          className="w-full"
          color="error"
          onClick={() => setOpenModal(true)}
        >
          Add Ban Number
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
            <h1 className="text-xl font-medium">Add number</h1>
            <TextField
              id="outlined-basic"
              label="Number"
              variant="outlined"
              onChange={(e) => setNumber(e.target.value)}
            />
            {errorMsg && <p className="text-red-500 text-sm m-0">{errorMsg}</p>}
            <Button variant="outlined" color="error" onClick={addBanNumber}>
              Ban
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default SettingPage;
