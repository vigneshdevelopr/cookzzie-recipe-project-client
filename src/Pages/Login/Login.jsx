import React from "react";
import "./Login.css";
import { Button, Grid, TextField } from "@mui/material";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function Login() {
  const history = useHistory();
  return (
    <div className="body">
      <div className="wholepage">
        
        <div className="login">
        <p style={{textAlign: "center",fontSize:'20px' }}>Cookzzie</p>
          <div className="login-outline">
            <h1>LOGIN</h1>

            <Grid container direction={"column"} spacing={2}>
              <Grid item>
                <TextField label="Username" variant="outlined" />
              </Grid>
              <Grid item>
                <TextField
                  id="outlined-password-input"
                  label="Password"
                  type="password"
                  autoComplete="current-password"
                />
              </Grid>
              <Grid item>
                <Button
                  style={{ backgroundColor: "#252525", color: "#fecc44" }}
                  variant="contained"
                >
                  Login
                </Button>
              </Grid>
              <Grid item >
                <p className="newaccount" onClick={()=>history.push('/signup')}>Create a new account</p>
              </Grid>
            </Grid>
            <div>
              or <br />
              SignIn With Google <br />
              <img className="newaccount" width="30" height="30" src="https://img.icons8.com/fluency/48/google-logo.png" alt="google-logo"/>
            </div>
          </div>
          

        </div>
      </div>
    </div>
  );
}

export default Login;
