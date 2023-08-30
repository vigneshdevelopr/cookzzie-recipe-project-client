import React, { useState } from "react";
import { Button, Grid, TextField } from "@mui/material";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import Base from "../../Components/Base";
import SignupPng from "../../assets/Joinnow.png";

function Signup() {
  const history = useHistory();
  const [values, setValues] = useState({
    username: "",
    password: "",
  });
  const { username, password } = values;
  //handleChange:
  const handleChange = (name) => (event) => {
    event.preventDefault();
    const value = event.target.value;
    setValues({ ...values, [name]: value });
  };
  //Fetching;
  const addUser = async (event) => {
    event.preventDefault();
    try {
      const newData = {
        username,
        password,
      };
      const response = await fetch("https://cookzzie-server.onrender.com/users/signup", {
        method: "POST",
        body: JSON.stringify(newData),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = response.json();
      console.log(data);

      setValues({
        ...values,
        username: "",
        password: "",
      });
      if (response.status === 200) {
        window.alert(
          "Hey Welcome to Cookzzie! please click the ok button to continue..."
        );
      } else if (response.status === 409) {
        window.alert("Hey Buddy! This User has already Exists!");
      }
      console.log(values.name);
    } catch (error) {
      window.alert(error.message);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      name: data.get("name"),
      email: data.get("email"),
      password: data.get("password"),
    });
  };

  return (
      <div className="body">
        <div id="signuppng">
          <img src={SignupPng} alt="login-png" />
        </div>
        <div onSubmit={handleSubmit} className="border-sec">
          <p style={{ fontSize: "20px" }}>Cookzzie</p>
          <h1>Signup</h1>

          <Grid container direction={"column"} spacing={2}>
            <Grid item>
              <TextField
                value={username}
                onChange={handleChange("username")}
                name="username"
                label="Email"
                variant="outlined"
              />
            </Grid>
            <Grid item>
              <TextField
                id="outlined-password-input"
                name="password"
                value={password}
                onChange={handleChange("password")}
                label="Password"
                type="password"
                autoComplete="current-password"
              />
            </Grid>
            <Grid item>
              <Button
                style={{ backgroundColor: "#252525", color: "#fecc44" }}
                variant="contained"
                onClick={addUser}
              >
                Signup
              </Button>
            </Grid>
            <Grid item>
              <p className="newaccount" onClick={() => history.push("/")}>
                Already have a account 🍔
              </p>
            </Grid>
          </Grid>
          <div>
            or <br />
            Signup With Google <br />
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
  );
}

export default Signup;
