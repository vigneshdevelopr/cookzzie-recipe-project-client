import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useHistory } from 'react-router-dom/cjs/react-router-dom';
import {useCookies} from 'react-cookie'
import logoutimg from '../assets/logout.png'
import accountimg from '../assets/account.png'

export default function NavBar() {
  const history = useHistory();
  const[cookies, setCookies]=useCookies([
    "access_token"
  ]);

  const Username = window.localStorage.getItem('username')

  const logout = () =>{
 alert(`Hey ${Username} You want to leave from Cookzzie Application 🥺`)
    setCookies("access_token","");
    window.localStorage.removeItem("access_token");
    window.localStorage.removeItem("userId");
    window.localStorage.removeItem("username");
    history.push('/')
  }
  return (

    <Box sx={{ flexGrow: 1,marginBottom:'4rem' }}>
      <AppBar style={{backgroundColor:'#e8e8e1',color:'#344444'}} position="fixed">
        <Toolbar>
          {/* <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton> */}
          <Typography variant="h6" component="div">
          Cookzzie
          </Typography>
          <div className="navbuttons">
            <Button onClick={()=>history.push("/recipes")}  color='inherit'>Home</Button>
            <Button onClick={()=>history.push("/create")} color='inherit'>Create</Button>
            <Button onClick={()=>history.push("/saved")}  color='inherit'>Saved</Button>

          </div>
          <div className="nav-sec">
          {!cookies.access_token ? (<img src={accountimg} alt='accountimg' onClick={()=>history.push('/')} />): <img src={logoutimg} alt='logoutimg' onClick={logout} />}
           
          </div>

        </Toolbar>
      </AppBar>
    </Box>
  );
}