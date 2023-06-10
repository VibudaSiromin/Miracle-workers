import React from "react";
import "./SettingItemPage.css";
import axios from "axios";
import { useState, useEffect, useRef } from "react";
import { BsCommand } from "react-icons/bs";
import { Grid } from "@material-ui/core";
import CommandPopup from "./commandPopup";
import CommandRaw from "./commandRaw";
import { Button } from "react-bootstrap";

const CommandPage = ({ settingType }) => {

  const [commandObject, setCommandObject] = useState([]);

  let url = "http://localhost:5000/settings/commands";
  console.log(url)

  const getData = () => {
    axios
      .get(url)
      .then((res) => {
        setCommandObject(res.data.settingItem); 
        console.log("gft");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  console.log(commandObject);

  const deleteHandler = (id) => {
    console.log("jjjjjjjjj")
    const url = "http://localhost:5000/settings/commands/"+ id;
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
  const editRef=useRef();

  const addItemHandler = () => {
    ref.current.open();
  };
  console.log(commandObject);


  const onEditClickHandler=(command)=>{
    editRef.current.open(command);
  }

  const addNewItemHandler = (commandName,binaryValue) => {
    let url = "http://localhost:5000/settings/commands";
    axios
      .post(url, {
        commandName: commandName,
        binaryValue:binaryValue
      })
      .then((res) => {
        getData();
        console.log("inserted");
      })
      .catch((err) => {
        console.log(err);
      });
  };


  const editHandler=(command,binaryValue,id)=>{
    const url = "http://localhost:5000/settings/commands/"  + id;
    const editedItem={
      id:id,
      newCommand:command,
      binaryValue:binaryValue
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
    <CommandPopup
      ref={ref}
      addNew={addNewItemHandler}
    />
  <table id="data-Table">
    <thead>
      <tr>
        <Button onClick={addItemHandler}>
          Add New Command
        </Button>
      </tr>
      <tr>
          <th>Command</th>
          <th>Locator</th>
          <th>Data</th>
          <th>Brach Selection</th>
          <th>Actions</th>
        </tr>
    </thead>
    <tbody>
          {commandObject.map((command) => (
              <CommandRaw
               command={command}
               onDelete={deleteHandler}
               onCommandEdit={editHandler}
               key={command.id}
              />
          ))}
    </tbody>
  </table>
</div>
  );
};

export default CommandPage;
