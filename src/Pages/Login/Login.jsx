import React, { useState } from "react";
import "./Login.css";
import { Button, Grid, TextField } from "@mui/material";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import Base from "../../Components/Base";
import LoginPng from "../../assets/Login.png";

function Login() {
  const history = useHistory();
  const [values, setValues] = useState({
    username: "",
    password: "",
  });
  const { username, password } = values;

  //handleChange
  const handleChange = (name) => (event) => {
    const value = event.target.value;
    setValues({ ...values, [name]: value });
  };

  const LoginUser = async (event) => {
    event.preventDefault();
    try {
      const newData = {
        username,
        password,
      };
      //fetch:

      const response = await fetch("http://localhost:5000/users/signin", {
        method: "POST",
        body: JSON.stringify(newData),
        headers: {
          "content-type": "application/json",
        },
      });
      const data = await response.json();
      console.log(data);
      if (response.status === 200) {
        alert(`Hey Buddy! Welcome Back, ${data.userID} `);
      } else if (response.status === 401) {
        alert(`Sorry! You Entered Invalid Credentials `);
      } else if (response.status === 404) {
        alert(
          `Sorry! User not found, please register to continue our services`
        );
      }
    } catch (error) {
      alert("Internal Server Error");
      console.log(error.message);
    }
  };

  return (
    <Base>
      <div className="body">
        <div id="loginpng">
          <img src={LoginPng} alt="login-png" />
        </div>
        <div className="border-sec">
          <p style={{ fontSize: "20px" }}>Cookzzie</p>
          <h1>LOGIN</h1>

          <Grid container direction={"column"} spacing={2}>
            <Grid item>
              <TextField
                value={username}
                name="username"
                onChange={handleChange("username")}
                label="Username"
                variant="outlined"
              />
            </Grid>
            <Grid item>
              <TextField
                id="outlined-password-input"
                value={password}
                name="password"
                onChange={handleChange("password")}
                label="Password"
                type="password"
                autoComplete="current-password"
              />
            </Grid>
            <Grid item>
              <Button
                onClick={LoginUser}
                style={{ backgroundColor: "#252525", color: "#fecc44" }}
                variant="contained"
              >
                Login
              </Button>
            </Grid>
            <Grid item>
              <p className="newaccount" onClick={() => history.push("/signup")}>
                Create a new account
              </p>
            </Grid>
          </Grid>
          <div>
            or <br />
            SignIn With Google <br />
            <img
              id="google"
              width="30"
              height="30"
              src="https://img.icons8.com/fluency/48/google-logo.png"
              alt="google-logo"
            />
          </div>
        </div>
      </div>
    </Base>
  );
}

export default Login;
