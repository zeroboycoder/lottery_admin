import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Stack, TextField, Button } from "@mui/material";
import axios from "axios";

import { baseUrl } from "../config/base_url";

const LoginPage = () => {
  const [phone, setPhone] = useState(null);
  const [password, setPassword] = useState(null);
  const navigate = useNavigate();

  const loginHandler = async () => {
    try {
      const data = {
        phone,
        password,
      };
      const res = await axios.post(`${baseUrl}/admin/auth/login`, data);
      const token = res?.data?.data?.token;
      const adminId = res?.data?.data?.adminId;
      localStorage.setItem("token", token);
      localStorage.setItem("adminId", adminId);
      return navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Stack
      justifyContent="center"
      alignItems="center"
      style={{ width: "100%", height: "calc(100vh - 200px)" }}
    >
      <div className="flex flex-col w-72 space-y-5">
        <h1 className="text-center text-3xl font-bold">Welcome Back!</h1>
        <TextField
          id="outlined-basic"
          label="Phone"
          variant="outlined"
          onChange={(e) => setPhone(e.target.value)}
        />
        <TextField
          id="outlined-basic"
          label="Password"
          variant="outlined"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button variant="outlined" onClick={loginHandler}>
          Login
        </Button>
      </div>
    </Stack>
  );
};

export default LoginPage;
