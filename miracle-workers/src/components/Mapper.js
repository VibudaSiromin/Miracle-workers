import './Mapper.css'
import { useState, useEffect, useRef } from "react";
import axios from 'axios';
import { Modal, Button } from "react-bootstrap";
import { GrLink } from "react-icons/gr";
import { FaLink } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";


const Mapper = (props) => {
  
  const [arrayOne, setArrayOne] = useState([]);
  const [arrayTwo, setArrayTwo] = useState([]);
  const [sheet,setSheet] = useState([]);
  const [sectionHeading,setSectionHeading] = useState([]);
  const [selectedSheet,setSelectedSheet] = useState();
  const [showModal,setShowModal] = useState(false);
  const [showListOne,setShowListOne] = useState(false);
  const [showListTwo,setShowListTwo] = useState(false);
  const [noofRaws,setNoofRaws] = useState(0);
  const [inputValue,setInputValue] = useState(null);
  const [isMount,setIsMount] = useState(false);
  const [selectedHeading,setSelectedHeading] = useState();
  const [showLoopModal,setShowLoopModal] = useState(false);
  const [inputLoopName,setInputLoopName] = useState(null);
  const [optionsInDDMode,setOptionsInDDMode] = useState([]);
  const [locatorNames,setLocatorNames] = useState([]);
  const [showErrMsgOne,setShowErrMsgOne] = useState(false);
  const [showErrMsgTwo,setShowErrMsgTwo] = useState(false);


  const depthLevelOne =(event) => {
    event.preventDefault();
    event.stopPropagation();
    console.log('razor');
    axios.get(props.URLForGettingSheets)
           .then(function (response) {
            setSheet(response.data[props.reqDetailsforDB[0]]);
        })
            .catch(function (error) {
             console.log(error);
      })

      setShowListOne(true);
  };


  const btnStyles = {
    display:'block'
  };

  useEffect(()=>{
    let listArrayOne = [];

    if(props.usage==='basicDataSection'){
      console.log('dim');
      for (let i = 0; i < sheet.length; i++) {
        listArrayOne.push(
        <li className="menu-items">
          <button 
            id={sheet[i]}
            value={sheet[i]}
            onClick={(e) => {
              depthLevelTwo(e);
            }}

            style={btnStyles}
          >
            {sheet[i]}
          </button>
        </li>
      );
    }
    }else if(props.usage==='basicLocSection'){
      for (let i = 0; i < sheet.length; i++) {
        listArrayOne.push(
        <li className="menu-items">
          <button 
            id={sheet[i]}
            value={sheet[i]}
            onClick={(e) => {
              depthLevelTwoLoc(e);
            }}
            style={btnStyles}
          >
            {sheet[i]}
          </button>
        </li>
      );
    }

    }else if(props.usage==="iteration-data"){
      console.log('sim');
      for (let i = 0; i < sheet.length; i++) {
        listArrayOne.push(
        <li className="menu-items">
          <button 
            id={sheet[i]}
            value={sheet[i]}
            onClick={(e) => {
              getLoopName(e);
            }}

            style={btnStyles}
          >
            {sheet[i]}
          </button>
        </li>
      );
    }
    }
    console.log('monster energy',listArrayOne);
    setArrayOne([...listArrayOne]);

  },[sheet])
  
  const depthLevelTwoLoc = (e) => {
    e.preventDefault();
    e.stopPropagation()
    setSelectedSheet(e.target.value);
    axios
    .get('http://localhost:5000/locators/getLocatorNames',{
      params:{
        locatorName:e.target.value
      }
    })
    .then((res)=>{
      setLocatorNames(res.data.locatorNames);
    })
    .catch((err)=>{
      console.log(err);
    })

    setShowListTwo(true);
  }

  useEffect(()=>{
    console.log('croc',locatorNames);
    let listArrayTwo = [];
    for (let i = 0; i < locatorNames.length; i++) {
      listArrayTwo.push(
        <li className="menu-items">
          <button id={locatorNames[i]} value={locatorNames[i]}  onClick={(e)=>addReferenceForLocator(e)} style={btnStyles}>
            {locatorNames[i]}
          </button>
        </li>
      );
    }
     console.log('red bull',listArrayTwo);
     setArrayTwo([...listArrayTwo]);

  },[locatorNames])

  const depthLevelTwo = (event) => {
    console.log("GG", event.target.value);
    setSelectedSheet(event.target.value);
    axios.get(props.URLForGettingHeadings, {
	    params: {
		    dataPageName: event.target.value,
	    }
    }).then(function(response){
            setSectionHeading(response.data[props.reqDetailsforDB[2]])
            console.log('OOP123',response.data); 
         }).catch(function(error){
            console.log(error);
         })
   
         setShowListTwo(true);  
  };


  useEffect(()=>{
    console.log('devil');
    let listArrayTwo = [];
    for (let i = 0; i < sectionHeading.length; i++) {
      console.log("saman", i);
      listArrayTwo.push(
        <li className="menu-items">
          <button id={sectionHeading[i]} value={sectionHeading[i]}  onClick={(e)=>depthLevelThree(e)} style={btnStyles}>
            {sectionHeading[i]}
          </button>
        </li>
      );
    }
     console.log('red bull',listArrayTwo);
     setArrayTwo([...listArrayTwo]);
     //console.log('petronas',document.getElementById(selectedDataSheet).offsetTop);

  },[sectionHeading])


  const depthLevelThree = (e) => {
    setSelectedHeading(e.target.value)
    axios
    .get(props.URLForGettingNoofRaws,{
      params: {
		    pageName: selectedSheet,
	    }
    })
    .then((res)=>{
      console.log('kaha',res.data.noofRaws)
      const raws=res.data.noofRaws;
      const rawArr = [raws];
      setNoofRaws([...rawArr]); 
    })
    .catch((err)=>{
      console.log(err);
    })

  }


  useEffect(()=>{
    if(isMount){
      console.log('RAWS',noofRaws)
      setShowModal(true);
    }else{
      setIsMount(true);
    }
  },[noofRaws])

  const terminateModal = () => {
    setShowModal(false)
  }

  const terminateLoopModal = () => {
    setShowLoopModal(false)
  }

  //use a proper name for the function
  const addDataReference = (event) => {
      event.preventDefault();
      event.stopPropagation();

      if(inputValue===null && inputLoopName!==''){
        console.log('y value is null')
        setShowErrMsgOne(true);
        setInputValue(null);
      }else if(!isNaN(+inputValue)){
        if(inputValue<=noofRaws && inputValue>0){
          terminateModal();
          props.selectedHeading(props.browseBtnId,selectedSheet,selectedHeading,inputValue);
          setShowListOne(false);
          setShowListTwo(false);
          setInputValue(null);
          setShowErrMsgOne(false);
        }else{
          setShowErrMsgOne(true);
        }
      }else{
        console.log('y value is not number');
        setInputValue(null);
        setShowErrMsgOne(true);
      }


      console.log("dead",inputValue);
      
  };

  const addDataReferenceForLoop = (event) => {
      event.preventDefault();
      event.stopPropagation();
      if(inputLoopName!==null && inputLoopName!==''){
        terminateLoopModal();
        props.assignLoopRef(props.browseBtnId,selectedSheet,inputLoopName);
        setShowListOne(false);
        setInputLoopName(null);
        setShowErrMsgTwo(false);
      }else{
        setInputLoopName(null);
        setShowErrMsgTwo(true);
      }

      
  }

  const addReferenceForLocator = (event) => {
    const selectedLocatorName = event.target.value;
    const valueFormat = '#loc.'+selectedSheet+"."+selectedLocatorName
    props.locatorNames(valueFormat);
    setShowListOne(false);
    setShowListTwo(false);
  }

  document.addEventListener('click', (event) => {
    console.log('lepord');
    //this if condition only trigger for the normal clicks.It does not trigger for btn clicks
    if (event.target.tagName.toLowerCase() !== 'button') {
    
      setShowListOne(false);
      setShowListTwo(false);

    }

  });


  const getLoopName = (event) => {
    console.log('eye');
    setSelectedSheet(event.target.value);
    setShowLoopModal(true);
  }

   const secondListPosition = {top:0}

  // if(selectedDataSheet!==undefined){
  //   secondListPosition.top=document.getElementById(selectedDataSheet).getBoundingClientRect().top+20;
  // }
 
  console.log("Dragon");

  const inputHandler = (event) => {
        setInputValue(event.target.value);
  }

  const inputLoopNameHandler = (event) => {
        setInputLoopName(event.target.value);
  }


  useEffect(()=>{
    console.log('MAN');
    if(props.usage==="Data Driven"){
      //http://localhost:5000/data/datasheets/getHeadings
      axios.get(props.URLForGettingHeadings, {
        params: {
          dataPageName: props.dataSheetName
        }
      }).then(function(response){
              const headingArr=response.data.getHeadings;
              const dataOptionsInDDMode=[];
              for(let i=0;i<headingArr.length;i++){
                dataOptionsInDDMode.push(
                  <option value={"#data."+props.dataSheetName+"."+headingArr[i][0]}>{"#data."+props.dataSheetName+"."+headingArr[i][0]}</option>
                )
              }
              console.log('damn',headingArr);
              setOptionsInDDMode(dataOptionsInDDMode);
           }).catch(function(error){
              console.log(error);
           })
    }
  },[props.usage])



  if(props.usage==='basicDataSection'){
    return (
      <>
        {/* <AiOutlineLink id="dataBrowseBtn" onClick={depthLevelOne} size="30px"></AiOutlineLink> */}
        {/* <FaLink id="dataBrowseBtn" onClick={depthLevelOne}></FaLink> */}
        <Button  id="dataBrowseBtn" className="btn-sm" onClick={depthLevelOne}>Refer</Button>
        <div>
          {showListOne && <ul className="myUL">{arrayOne}</ul>}
        </div>
        <div>
          {showListTwo && <ul className="myUL2">{arrayTwo}</ul>}
        </div>     
          <Modal show={showModal} tabIndex="-1" size="sm" centered>
          <form  onSubmit={addDataReference} id={'formInMapper'} >
            <Modal.Header closeButton onClick={terminateModal}>
              <Modal.Title>Enter Raw Number</Modal.Title>    
            </Modal.Header>
            <Modal.Body>
              <label>Enter a raw For Getting a value:</label>
              <input type="text" onChange={inputHandler} className="form-control"/>
              {showErrMsgOne?<small className="text-danger">{"Enter a value from 1 to "+noofRaws}</small>:<></>}
            </Modal.Body>
            <Modal.Footer> 
              <Button variant="success" form={'formInMapper'} type="submit">
                Enter
              </Button>
            </Modal.Footer>
            </form>
          </Modal> 
      </>
    );
  }else if(props.usage==='basicLocSection'){
    return(
    <>
      <Button  id="dataBrowseBtn" className="btn-sm" onClick={depthLevelOne} >Refer</Button>
      <div>
        {showListOne && <ul className="myUL">{arrayOne}</ul>}
      </div>
      <div>
        {showListTwo && <ul className="myUL2">{arrayTwo}</ul>}
      </div>  
    </>
    )
  }else if(props.usage==="iteration-data"){
    return(
      <>
      <Button className='btn-sm' id="loopBtn"  onClick={(e)=>depthLevelOne(e)}>Loop</Button>
      <div>
          {showListOne && <ul className="myUL">{arrayOne}</ul>}
      </div>     
          <Modal show={showLoopModal} tabIndex="-1" size="sm" centered> 
          <form  onSubmit={addDataReferenceForLoop} id='formLoop' >
            <Modal.Header closeButton onClick={terminateLoopModal}>
              <Modal.Title> Iteration Based On Data Section</Modal.Title>    
            </Modal.Header>
            <Modal.Body>
              <label>Enter a loop name:</label>
              <input  type="text" onChange={inputLoopNameHandler} className="form-control"/>
              {showErrMsgTwo?<small className="text-danger">{"Enter a loop name"}</small>:<></>}
            </Modal.Body>
            <Modal.Footer> 
              <Button variant="success" form='formLoop' type="submit">
                Enter
              </Button>
            </Modal.Footer>
            </form>
            </Modal>
            
           
      </>
    )
    
  }else if(props.usage==='Data Driven' && optionsInDDMode.length!==0){
    console.log('DD!!');
    return(
      <div className="form-group">
            <label>{props.title}</label>
            <select name="DD_list" id="DD_list" className="form-select" aria-label="Default select example" onChange={(event)=>props.setSelectorValues(event.target.value)}>{optionsInDDMode}</select>
      </div>
    )
  }


};

export default Mapper;
