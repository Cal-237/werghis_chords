import { Button, IconButton, Menu, MenuItem } from "@mui/material"
import { AccountCircle as AccountIcon } from "@mui/icons-material";

import { auth } from '../firebase';
import { GoogleAuthProvider, signInWithPopup, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";

import { signOut } from "firebase/auth";

export default function LoginButton() {

    // stuff to set up authentication
    const [user, setUser] = useState(null);
    const provider = new GoogleAuthProvider();

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            console.log("hi");
            if (user) {
              // user got logged in
              setUser(user)
            } else {
              // User got signed out
              setUser(null)
            }
        });
    }, [])


    // stuff to set up Menu
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };
  
    

    return ( user ?

    (<>
    <IconButton 
        aria-controls={open ? 'menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        color="inherit"
        onClick={handleClick}
    >
        <AccountIcon/>
    </IconButton>
    <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem disabled>User: {user.email}</MenuItem>
        <MenuItem disabled divider>Authorized</MenuItem>
        <MenuItem onClick={() => {
            signOut(auth).then(() => {
                // Sign-out successful.
            }).catch((error) => {
                console.error(error);
            });
        }}>
            Logout
        </MenuItem>
    </Menu>
    </>)

    :

    (<Button
        color="inherit"
        onClick={() => {
          signInWithPopup(auth, provider)
            .then(() => {
              // Already handled in onAuthStateChanged()
            })
            .catch((error) => {
              // Handle Errors here.
              console.error(error);
            });
        }}
    > 
        Login
    </Button>)

    );

}