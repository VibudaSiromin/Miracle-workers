import { useNavigate as UseNavigate } from 'react-router-dom';
import React from 'react';
import JSONGenerator from '../../components/JSONGenerator';
import devImg from '../../assets/images/developer.png';
import img2 from '../../assets/images/react.jpg';
import img3 from '../../assets/images/vue.jpg';
import { Button } from 'react-bootstrap';
import Alert from '../../components/Alert';
import MessageBox from '../../components/MessageBox';
import { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';

const Home = () => {
  let navigate = UseNavigate();
  const loadFromJson = () => {
    navigate('/loadFormJson');
  };

  const dispatch = useDispatch();
  const modalRefNewProject = useRef();
  const newProjectMessenger = () => {
    console.log('hellcat');
    modalRefNewProject.current.log(
      'Are you sure to create a new project?This action will permenantly erase all the data.'
    );
  };

  const savingSystemData = () => {
    dispatch({ type: 'INITIATE_JSON_GENERATOR' });
  };

  return (
    <>
      <Alert />

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
          <Button
            type="button"
            className="btn btn-dark"
            onClick={newProjectMessenger}
          >
            New Project
          </Button>
          <JSONGenerator></JSONGenerator>
          <Button onClick={loadFromJson}>Load JSON</Button>
        </div>
        {/* <a href="#JSONForge">
          <Button type="button" className="btn btn-dark">Let's Dive</Button>
        </a>
        <div >
          <div>
            <h1>JSON FORGE</h1>
          </div>
          <div id="JSONForge" data-coreui-spy="scroll" data-coreui-target="#JSONForge" data-coreui-offset="0" class="scrollspy-example" tabindex="0">
            <Button type="button" className="btn btn-dark" onClick={newProjectMessenger}>New Project</Button>
            <JSONGenerator></JSONGenerator>
            <Button>Load JSON</Button>
          </div>
        </div> */}
        <MessageBox
          ref={modalRefNewProject}
          modalFooterfuncOne={savingSystemData}
          id="newProjectMessenger"
          modalTitle={'New Project'}
          icon={''}
          btnValues={['save & create', 'cancel']}
          isTwobtn={true}
        ></MessageBox>
      </div>
    </>
  );
};

export default Home;
