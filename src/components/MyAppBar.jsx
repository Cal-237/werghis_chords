import { AppBar, Box, Button, Typography, Toolbar, IconButton } from "@mui/material";
import { Home, Home as HomeIcon } from "@mui/icons-material";
import React from "react";
import { useNavigate } from "react-router-dom";


export default function MyAppBar() {

  const navigate = useNavigate();

  return  (
      <Box sx={{flexGrow: 1}}>
          <AppBar position="static">
              <Toolbar>
                  <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="home"
                    sx={{ mr: 2 }}
                    onClick={() => {
                      navigate("/")
                    }}
                  >
                    <HomeIcon />
                  </IconButton>
                  <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Werghis Chords
                  </Typography>
                  <Button color="inherit">Login</Button>
              </Toolbar>
          </AppBar>
      </Box>
  )
}