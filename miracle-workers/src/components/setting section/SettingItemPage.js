import React from "react";
import "./SettingItemPage.css";
import { RxCross1 } from "react-icons/rx";
import { Button } from "react-bootstrap";
import SettingItemRaw from "./SettingItemRaw";
import axios from "axios";
import { useState, useEffect } from "react";

const SettingItemPage = ({ settingType }) => {
  //remove this comment after changing the name "commandObject"
  const [commandObject, setCommandObject] = useState([]);

  let url='http://localhost:5000/settings/'+settingType;

  useEffect(() => {
    const getData = () => {
      axios
        .get(url)
        .then((res) => {
          setCommandObject(res.data.settingItem);//all settings items (commands, browsers,...) are sent from database with "settingType" key.
          console.log("gft");
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getData();
  }, []);

  console.log(commandObject);

  return (
    <div className="outline">
      <div>
        {settingType}
        <RxCross1 />
        <Button>Add</Button>
      </div>
        {commandObject.map((command) => (
          <SettingItemRaw rawData={command.name} key={command.id} id={command.id}/>
        ))}
    </div>
  );
};

export default SettingItemPage;
