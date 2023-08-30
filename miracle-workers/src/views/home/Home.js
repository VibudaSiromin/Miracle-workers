import React from "react";
import JSONGenerator from "../../components/JSONGenerator";
import devImg from "../../assets/images/developer.png";
import { Button } from "react-bootstrap";
import { useNavigate as UseNavigate } from "react-router-dom";

const Home = () => {
  let navigate = UseNavigate();
  const loadFromJson = () => {
    navigate("/loadFormJson");
  };
  return (
    <>
      <div className="home-container">
        <div className="sub-container-one">
          <div>
            <img src={devImg} alt="" />
          </div>
          <div>
            <h1>WELCOME TO ETAS DATA LOADER</h1>
            <p>
              ETAS data loader is a sophisticated web-based data ingestion
              platform that is used to feed data into a test automation tool
              called ETAS. The data loader comprises five sections, a launcher,
              a test suit, a data, a component, and a locator. It's primary
              purpose is to facilitate efficient and reliable data loading and
              generate a final output in JSON format with proper validations.
            </p>
            <Button className="btn btn-success">DEMO</Button>
          </div>
        </div>
        <div className="breaker"></div>
        <div className="btn-container">
          <JSONGenerator></JSONGenerator>
          <Button onClick={loadFromJson}>Load JSON</Button>
        </div>
      </div>
    </>
  );
};

export default Home;
