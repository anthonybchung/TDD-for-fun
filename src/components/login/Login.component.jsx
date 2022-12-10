import { Button, Alert, Input } from "@mui/material";
import { useEffect, useState } from "react";
import "./Login.styles.css";
import axios from "../../config/api";

const Login = () => {
  const defaultLoginValue = {
    userName: "",
    password: "",
  };

  const LOGIN_URL = "api/v1/auth/login";
  const publicHeaders = {
    headers: { "Content-Type": "application/json" },
    withCredentials: false,
  };

  const [user, setUser] = useState(defaultLoginValue);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [alertMessage, setAlertMessage] = useState("");
  const [isAlertDisabled, setIsAlertDisabled] = useState(true);

  useEffect(() => {
    if (user.userName.length === 0 || user.password.length === 0) {
      setIsButtonDisabled(true);
    } else {
      setIsButtonDisabled(false);
    }
  }, [user.userName, user.password]);

  const handlerFieldInput = (event) => {
    event.preventDefault();
    setUser({ ...user, [event.target.name]: event.target.value });
  };

  const handlerSubmit = async (event) => {
    event.preventDefault();
    try {
      console.log("!!!!!!! click");
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({ userName: user.userName, password: user.password }),
        publicHeaders
      );
      console.log(response);
    } catch (err) {
      console.log("************************");
      console.log(err);
      console.log("*******");
      console.log(err.response?.status);
      if (err.response?.status === 404) {
        setAlertMessage("Server not connected (status: 404)");
        setIsAlertDisabled(false);
      }
      if (err.message === "Network Error") {
        setAlertMessage(err.message);
        setIsAlertDisabled(false);
      }
    }
  };

  return (
    <div className="login-container">
      <Input
        className="login-input"
        placeholder="User Name"
        onChange={handlerFieldInput}
        value={user.userName}
        name="userName"
      />
      <Input
        className="login-input"
        placeholder="Password"
        type="password"
        onChange={handlerFieldInput}
        value={user.password}
        name="password"
      />
      <Button
        sx={{ mt: 2, ml: "auto", mr: 1 }}
        variant="contained"
        disabled={isButtonDisabled}
        onClick={handlerSubmit}
      >
        Login
      </Button>
      {!isAlertDisabled && (
        <Alert severity="error">This is an error alert — check it out!</Alert>
      )}
    </div>
  );
};

export default Login;
