import React from "react";
import "./SettingItemPage.css";
import { RxCross1 } from "react-icons/rx";
import {BiPlus} from "react-icons/bi";
import { Button } from "react-bootstrap";
import SettingItemRaw from "./SettingItemRaw";
import axios from "axios";
import { useState, useEffect, useRef } from "react";
import SettingEditPopup from "./SettingEditPopup";
import { Grid } from "@material-ui/core";
import { RiNumber2 } from "react-icons/ri";
import { BsCommand } from "react-icons/bs";
import { MdOutlineOpenInBrowser } from "react-icons/md";
import { GrStatusGood } from "react-icons/gr";
import { TbCircle } from "react-icons/tb";
import { RiFileSearchLine } from "react-icons/ri";
import { MdOutlineIntegrationInstructions } from "react-icons/md";

const SettingItemPage = ({ settingType }) => {
  //remove this comment after changing the name "commandObject"

  let logo;

  switch(settingType){
    case 'commands':
      logo=<BsCommand className="logo"/>;
      break;
    case 'browsers':
      logo=<MdOutlineOpenInBrowser className="logo"/>
      break;
    case 'test-types':
      logo=<RiNumber2 className="logo"/>
      break;
    case 'status':
      logo=<TbCircle className="logo"/>
      break;
    case 'yes-no':
      logo=<GrStatusGood className="logo"/>
      break;
    case 'instructions':
      logo=<MdOutlineIntegrationInstructions className="logo"/>
      break;
    case 'conditions':
      logo=<RiFileSearchLine className="logo"/>
  }

  const [commandObject, setCommandObject] = useState([]);

  let url = "http://localhost:5000/settings/" + settingType;

  const getData = () => {
    axios
      .get(url)
      .then((res) => {
        setCommandObject(res.data.settingItem); //all settings items (commands, browsers,...) are sent from database with "settingType" key.
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

  const deleteHandler = (id, type) => {
    const url = "http://localhost:5000/settings/" + type + "/" + id;
    axios
      .delete(url)
      .then((res) => {
        getData();
        console.log("kll");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const ref = useRef();

  const addItemHandler = () => {
    ref.current.open();
  };
  console.log(commandObject);

  const addNewItemHandler = (value) => {
    let url = "http://localhost:5000/settings/" + settingType;

    axios
      .post(url, {
        newValue: value,
      })
      .then((res) => {
        getData();
        console.log("inserted");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const arr=[1,2,3]

  return (
    <Grid container>
      <Grid xs={12} sm={7} item>
        <SettingEditPopup
          type={settingType}
          ref={ref}
          itemID={null}
          value={""}
          callingFrom="add"
          addNewOrEdit={addNewItemHandler}
        />

        {/* <Box sx={{
            width: 577.81,
            height:62.99,
            backgroundColor: 'primary.dark'
          }}/> */}
          <div className="headerBox">
            <span className="settingType">{settingType}</span>
            <RxCross1 className="cross"/>
            <button className="button" onClick={addItemHandler}>
              <BiPlus className="plus"/>
              <span className="add">Add</span>
              </button>
          </div>
            {arr.map((command) => (
              <SettingItemRaw
                rawData={command.name}
                key={command.id}
                id={command.id}
                type={settingType}
                onDelete={deleteHandler}
              />
            ))}
      </Grid>
      <Grid xs={0} sm={5} item>
      <span className="textWithLogo">{settingType}</span>
      <div>
      {logo}
        </div>
      </Grid>
    </Grid>
  );
};

export default SettingItemPage;
