import { Button, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { authActions } from "../store";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [inputs, setInputs] = useState({
    name: "mahadi",
    email: "mahadi@gmail.com",
    password: "123456",
  });
  const [isSignup, setIsSignup] = useState(false);

  const handlerChange = (e) => {
    setInputs((prevState) => {
      return {
        ...prevState,
        [e.target.name]: e.target.value,
      };
    });
  };

  const SendRequest = async (type = "login") => {
    const res = await axios
      .post(`http://localhost:5000/api/user/${type}`, {
        name: inputs.name,
        email: inputs.email,
        password: inputs.password,
      })
      .catch((err) => console.log(err));

    const data = await res.data;
    return data;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);
    if (isSignup) {
      SendRequest("signup")
        .then(() => dispatch(authActions.login()))
        .then(() => navigate("/auth"))
        .then(() => alert("User registered succefully login please"))
        .then((data) => console.log(data));
    } else {
      SendRequest("login")
        .then((data) => localStorage.setItem("userId", data.user._id))
        .then(() => dispatch(authActions.login()))
        .then(() => navigate("/blogs"))
        .then((data) => console.log(data));
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <Box
          maxWidth={400}
          display="flex"
          flexDirection={"column"}
          alignItems="center"
          justifyContent={"center"}
          boxShadow="10px 10px 20px #ccc"
          padding={3}
          margin="auto"
          marginTop={5}
          borderRadius={5}
        >
          <Typography variant="h2" padding={3} textAlign="center">
            {isSignup ? "SignUp" : "LogIn"}
          </Typography>
          {isSignup && (
            <TextField
              name="name"
              onChange={handlerChange}
              value={inputs.name}
              type={"text"}
              required
              placeholder="Name"
              margin="normal"
            />
          )}

          <TextField
            name="email"
            onChange={handlerChange}
            value={inputs.email}
            type={"email"}
            required
            placeholder="Email"
            margin="normal"
          />
          <TextField
            name="password"
            onChange={handlerChange}
            value={inputs.password}
            type={"password"}
            required
            placeholder="Password"
            margin="normal"
          />
          <Button
            variant="contained"
            sx={{ borderRadius: 3, marginTop: 3 }}
            color="warning"
            type="submit"
          >
            Submit
          </Button>
          <Button
            sx={{ borderRadius: 3, marginTop: 3 }}
            onClick={() => setIsSignup(!isSignup)}
          >
            Change To {isSignup ? "Login" : "Signup"}
          </Button>
        </Box>
      </form>
    </>
  );
};

export default Auth;
