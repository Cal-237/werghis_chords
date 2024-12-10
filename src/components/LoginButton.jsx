import { Button, IconButton, Menu, MenuItem } from "@mui/material"
import { AccountCircle as AccountIcon, CheckCircleOutline as CheckIcon } from "@mui/icons-material";

import { auth } from '../firebase';
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useState } from "react";

import { signOut } from "firebase/auth";

export default function LoginButton({ authorized }) {

    // stuff to set up authentication
    const provider = new GoogleAuthProvider();

    // stuff to set up Menu
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };


    return ( auth.currentUser ?

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
        <MenuItem disabled>User: {auth.currentUser.email}</MenuItem>
        { authorized ?
          <MenuItem disabled divider>Authorized<CheckIcon color="success" sx={{ml: 1}}/></MenuItem>
          :
          <MenuItem disabled divider>Not Authorized</MenuItem>
        }
        <MenuItem onClick={() => {
            signOut(auth).then(() => {
                // Already handled in onAuthStateChanged()
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