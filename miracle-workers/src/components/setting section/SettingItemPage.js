import React from "react";
import "./SettingItemPage.css";
import { RxCross1 } from "react-icons/rx";
import { BiPlus } from "react-icons/bi";
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
import { fontWeight } from "@mui/system";

const SettingItemPage = ({ settingType }) => {
  //remove this comment after changing the name "commandObject"

  let logo;

  switch (settingType) {
    case "commands":
      logo = <BsCommand className="logo" />;
      break;
    case "browsers":
      logo = <MdOutlineOpenInBrowser className="logo" />;
      break;
    case "test-types":
      logo = <RiNumber2 className="logo" />;
      break;
    case "status":
      logo = <TbCircle className="logo" />;
      break;
    case "yes-no":
      logo = <GrStatusGood className="logo" />;
      break;
    case "instructions":
      logo = <MdOutlineIntegrationInstructions className="logo" />;
      break;
    case "conditions":
      logo = <RiFileSearchLine className="logo" />;
  }

  const [commandObject, setCommandObject] = useState([]);

  let url = "http://localhost:8000/settings/" + settingType;
  console.log(url);

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
    const url = "http://localhost:8000/settings/" + type + "/" + id;
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
    let url = "http://localhost:8000/settings/" + settingType;

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

  const arr = [1, 2, 3];

  return (
    <div className="row">
      <div className="col-lg-8">
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
          <span
            className="settingType float-left"
            style={{
              width: "22%",
              // padding: "22px",
              fontWeight: "700",
              fontSize: "17px",
            }}
          >
            {settingType}
          </span>
          <button className="button float-right" onClick={addItemHandler}>
            <BiPlus className="plus" />
            <span className="add">Add</span>
          </button>
          <RxCross1 className="cross float-right" />
        </div>
        <div className="row" style={{ paddingLeft: "16px" }}>
          <div className="col-lg-8">
            {commandObject.map((command) => (
              <SettingItemRaw
                rawData={command.name}
                key={command.id}
                id={command.id}
                type={settingType}
                onDelete={deleteHandler}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="col-lg-4 center-logo">
        <span className="textWithLogo">{settingType}</span>
        <div>{logo}</div>
      </div>
    </div>
  );
};

export default SettingItemPage;
