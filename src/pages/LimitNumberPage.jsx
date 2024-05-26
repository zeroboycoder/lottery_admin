import { useState, useEffect } from "react";
import { Container, Modal, TextField, Button } from "@mui/material";
import { Delete } from "@mui/icons-material";
import Loading from "../components/loading/loading";
import axios from "axios";
import { baseUrl } from "../config/base_url";

const LimitedNumberPage = () => {
  const [openModal, setOpenModal] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [number, setNumber] = useState();
  const [amount, setAmount] = useState();
  const [limitedAmountNumbers, setLimitedAmountNumbers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [inputLoading, setInputLoading] = useState(false);

  useEffect(() => {
    const fetchLimitedAmountNumbers = async () => {
      setLoading(true);
      const res = await axios.get(`${baseUrl}/admin/setting/limit-number`);
      setLimitedAmountNumbers(res.data.data);
      setLoading(false);
    };
    fetchLimitedAmountNumbers();
  }, []);

  const addLimitNumber = async () => {
    try {
      setInputLoading(true);
      const res = await axios.post(`${baseUrl}/admin/setting/limit-number`, {
        number,
        amount,
      });
      setLimitedAmountNumbers(res.data.data);
      setErrorMsg(null);
      setInputLoading(false);
      setOpenModal(false);
    } catch (error) {
      setInputLoading(false);
      setErrorMsg(error.response.data.msg);
    }
  };

  const deleteBanNumber = async (num) => {
    console.log(num);
    const res = await axios.delete(`${baseUrl}/admin/setting/limit-number`, {
      data: {
        number: num,
      },
    });
    console.log(res.data);
    setLimitedAmountNumbers(res.data.data);
  };

  const numberBoxes = limitedAmountNumbers?.map((limitedNumber, i) => {
    return (
      <div
        className="flex justify-between border py-2 px-4 rounded shadow"
        key={i}
      >
        <p>{limitedNumber.number}</p>
        <p>{limitedNumber.amount} Ks</p>
        <Delete
          fontSize="small"
          color="error"
          onClick={() => deleteBanNumber(limitedNumber.number)}
        />
      </div>
    );
  });

  return loading ? (
    <Loading />
  ) : (
    <div>
      <Container>
        <h1 className="text-2xl font-medium mb-4">Limited Numbers</h1>
        <div className="space-y-5 mb-20">
          {numberBoxes?.length <= 0 ? (
            <p className="text-sm">No limited numbers.</p>
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
          Add Limited Number
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
            <h1 className="text-xl font-medium">Limit number</h1>
            <TextField
              id="outlined-basic"
              label="Number"
              variant="outlined"
              onChange={(e) => setNumber(e.target.value)}
            />
            <TextField
              id="outlined-basic"
              label="Amount"
              variant="outlined"
              onChange={(e) => setAmount(e.target.value)}
            />
            {errorMsg && <p className="text-red-500 text-sm m-0">{errorMsg}</p>}
            {inputLoading ? (
              <Button variant="outlined" color="error">
                Loading...
              </Button>
            ) : (
              <Button variant="outlined" color="error" onClick={addLimitNumber}>
                Limit Number
              </Button>
            )}
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default LimitedNumberPage;
