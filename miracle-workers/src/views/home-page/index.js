import React from "react";
import { Grid } from "@material-ui/core";
import { Typography, Button } from "@mui/material";
import './home-page.scss'

function index() {
  return (
    <>
      <Grid container spacing={5}>
        <Grid item sm={5} xs={5} md={5}>
          <Typography
            variant="h4"
            color="#38ECFE"
            sx={{ fontWeight: "800" }}
            fontSize="40px"
            textAlign="left"
          >
            WELCOME TO ETAS
          </Typography>
        </Grid>
      </Grid>
      <Grid container spacing={5} sx={{ backgroundColor: "red" }}>
        <Grid item sm={5} xs={5} md={5}>
          <Typography textAlign={"left"} color="#FFFFFF">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 150traset sheets
          </Typography>
        </Grid>
      </Grid>
      <Grid container spacing={5} sx={{ backgroundColor: "red" }}>
        <Grid item sm={5} xs={5} md={5} textAlign="center">
          <Button
            variant="contained"
            sx={{
              borderRadius: "84px",
              backgroundColor: "#38ECFE",
              color: "black",
              Width: "207px",
              Height: "76px",
            
            }}
          >
            Get Started
          </Button>
        </Grid>
      </Grid>
    </>
  );
}

export default index;
