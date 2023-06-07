import React from "react";
import { Grid, Button } from "@material-ui/core";
import { useNavigate as UseNavigate } from 'react-router-dom';

function index() {

    let navigate = UseNavigate();
    const loadFromJson=()=>{
        navigate('/loadFormJson')
    }

  return (
    <Grid container spacing={5}>
      <Grid item sm={5} xs={5} md={5}>
        <Button variant="contained" onClick={loadFromJson}>Load From Json</Button>
      </Grid>
    </Grid>
  );
}

export default index;
