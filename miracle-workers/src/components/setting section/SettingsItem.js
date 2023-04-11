import React from "react";
import "./SettingsItem.css";
import { Link } from "react-router-dom";

const SettingsItem = ({ title, symbol }) => {

  let url;

  switch(title){
    case "TestType":
      url="test-types";
      break;
    case "Status":
      url="status";
      break;
    case "Yes/No":
      url="yes-no";
      break;
    default:
      const titleInLowerCase = title.toLowerCase();
      url=titleInLowerCase+"s";
  }
  console.log(url)

  return (
    <div className="setting">
      <Link to={url}>
        <div>
          <div>{title}</div>
          <div className="symbol">{symbol}</div>
        </div>
      </Link>
    </div>
  );
};

export default SettingsItem;
