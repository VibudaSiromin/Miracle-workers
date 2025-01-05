import React from "react";
import "./SettingsItem.css";
import { Link } from "react-router-dom";

const SettingsItem = ({ title, symbol, linearGradient }) => {
  let url;

  switch (title) {
    case "TestType":
      url = "test-types";
      break;
    case "Status":
      url = "status";
      break;
    case "Yes/No":
      url = "yes-no";
      break;
    default:
      const titleInLowerCase = title.toLowerCase();
      url = titleInLowerCase + "s";
  }
  console.log(url);
  return (
    <div
      className={linearGradient === 1 ? "setting color-1" : "setting color-2"}
    >
      <div className="row">
        <div className="col-lg-12">
          <Link to={url}>
            <div
              style={{
                color: "white",
                margin: 0,
                position: "absolute",
                top: "60%",
                left: "52%",
                transform: "translate(-58%, 75%)",
              }}
            >
              <div>{title}</div>
              <div className="symbol">{symbol}</div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SettingsItem;
