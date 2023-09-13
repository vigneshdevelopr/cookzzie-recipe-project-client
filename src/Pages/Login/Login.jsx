import React, { useState } from "react";
import "./Login.css";
import { Button, Grid, TextField } from "@mui/material";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import LoginPng from "../../assets/Login.png";
import { useCookies } from "react-cookie";
import Loading from "../../Components/Spinner";

function Login() {
  const history = useHistory();
  const [values, setValues] = useState({
    username: "",
    password: "",
  });
  const [_, setCookies] = useCookies(["access_token"]);
  const { username, password } = values;
const[load,setLoad]=useState(false)
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
setLoad(true)
      const response = await fetch("https://cookzzie.up.railway.app/users/signin", {
        method: "POST",
        body: JSON.stringify(newData),
        headers: {
          "content-type": "application/json",
        },
      });

      const data = await response.json();
      console.log(data);
      if (response.status === 200) {
        setCookies("access_token", data.token);
        window.localStorage.setItem("access_token", data.token);
        window.localStorage.setItem("userId", data.userID);
        alert(`Hey Buddy! Welcome Back, ${data.user} `);

        history.push("/recipes");
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
    }finally{
      setLoad(false)
    }
  };

  return (
      <div className="body">
        {load?(<Loading />):(

       
        <>
        
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
                label="Email"
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
          {/* <div>
            or <br />
            SignIn With Google <br />
            <img
              id="google"
              width="30"
              height="30"
              src="https://img.icons8.com/fluency/48/google-logo.png"
              alt="google-logo"
            />
          </div> */}
        </div>
        </>
         )}
      </div>
  );
}

export default Login;
