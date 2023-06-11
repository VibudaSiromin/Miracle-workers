import React from "react";
import "./SettingItemPage.css";
import axios from "axios";
import { useState, useEffect, useRef } from "react";
import { BsCommand } from "react-icons/bs";
import { Grid } from "@material-ui/core";
import InstructionPopup from "./InstructionPopup";
import InstructionRaw from "./InstructionRaw";
import { Button } from "react-bootstrap";

const InstructionPage = () => {

  const [item, setItem] = useState([]);

  let url = "http://localhost:5000/settings/instructions";
  console.log(url)

  const getData = () => {
    axios
      .get(url)
      .then((res) => {
        setItem(res.data.settingItem); 
        console.log("gft");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  console.log(item);

  const deleteHandler = (id) => {
    console.log("jjjjjjjjj")
    const url = "http://localhost:5000/settings/instructions/"+ id;
    axios
      .delete(url)
      .then((res) => {
        getData();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const ref = useRef();

  const addItemHandler = () => {
    ref.current.open();
  };
  console.log(item);

  const addNewItemHandler = (item) => {
    let url = "http://localhost:5000/settings/instructions";
    axios
      .post(url, {
        newValue: item,
      })
      .then((res) => {
        getData();
        console.log("inserted");
      })
      .catch((err) => {
        console.log(err);
      });
  };


  const editHandler=(item,id)=>{
    const url = "http://localhost:5000/settings/instructions/"  + id;
    const editedItem={
      id:id,
      editedValue:item,
    }
    axios
    .put(url,editedItem)
    .then((res) => {
      getData();
      console.log("kll");
    })
    .catch((err) => {
      console.log(err);
    });
  }
  // const arr=[1,2,3]

  return (
    // <Grid container>
    //   <Grid xs={12} sm={7} item>
  <div className="version-01">
    <InstructionPopup
      ref={ref}
      addNew={addNewItemHandler}
    />
  <table id="data-Table">
    <thead>
      <tr>
        <Button onClick={addItemHandler}>
          Add New Instruction
        </Button>
      </tr>
      <tr>
          <th>Instruction</th>
          <th>Actions</th>
        </tr>
    </thead>
    <tbody>
          {item.map((item) => (
              <InstructionRaw
               item={item}
               onDelete={deleteHandler}
               onItemEdit={editHandler}
               key={item.id}
              />
          ))}
    </tbody>
  </table>
</div>
  );
};

export default InstructionPage;
