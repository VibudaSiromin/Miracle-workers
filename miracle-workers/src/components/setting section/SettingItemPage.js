import React from "react";
import "./SettingItemPage.css";
import axios from "axios";
import { useState, useEffect} from "react";
import { RiNumber2 } from "react-icons/ri";
import { GrStatusGood } from "react-icons/gr";
import { TbCircle } from "react-icons/tb";
import "./SettingItemPage.css";
import "./SettingItemRaw.css";

const SettingItemPage = ({ settingType }) => {

  let logo;

  switch(settingType){
    case 'test-types':
      logo=<RiNumber2 className="logo"/>
      break;
    case "status":
      logo = <TbCircle className="logo" />;
      break;
    case "yes-no":
      logo = <GrStatusGood className="logo" />;
      break;
  }

  const [commandObject, setCommandObject] = useState([]);

  let url = "http://localhost:5000/settings/" + settingType;
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

  return (
    <div className="row">
      <div className="col-lg-9">
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
          </div>
        </div>
        <div className="row" style={{ paddingLeft: "16px" }}>
          <div className="col-lg-9">
              {commandObject.map((command) => (
                  <div className="raw" key={command.id}>
                  <span
                    className="float-left"
                    style={{ marginLeft: "18px", marginTop: "7px", color: "white" }}
                  >
                    {command.name}
                  </span>
              </div>
              ))}
          </div>
            <div className="col-lg-3 center-logo">
              <span className="textWithLogo">{settingType}</span>
              <div>{logo}</div>
            </div>
        </div>
    </div>
  );
};

export default SettingItemPage;
