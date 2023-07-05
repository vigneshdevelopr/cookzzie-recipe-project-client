import React from "react";
import "./Signup.css";
import { Button, Grid, TextField } from "@mui/material";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function Signup() {
  const history = useHistory();
  return (
    <div className="body">
      <div className="wholepage">
        
        <div className="Signup">
        <p style={{textAlign: "center",fontSize:'20px' }}>Cookzzie</p>
          <div className="Signup-outline">
            <h1>Signup</h1>

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
                  Signup
                </Button>
              </Grid>
              <Grid item >
                <p className="newaccount" onClick={()=>history.push('/')}>Already have a Account !</p>
              </Grid>
            </Grid>
            <div>
              or <br />
              Register With Google <br />
              <img className="newaccount" width="30" height="30" src="https://img.icons8.com/fluency/48/google-logo.png" alt="google-logo"/>
            </div>
          </div>
          

        </div>
      </div>
    </div>
  );
}

export default Signup;
