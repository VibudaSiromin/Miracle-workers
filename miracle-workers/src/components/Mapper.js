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
  const [inputValue,setInputValue] = useState();
  const [isMount,setIsMount] = useState(false);
  const [selectedHeading,setSelectedHeading] = useState();
  const [showLoopModal,setShowLoopModal] = useState(false);
  const [inputLoopName,setInputLoopName] = useState();
  const [optionsInDDMode,setOptionsInDDMode] = useState([]);
  const [locatorNames,setLocatorNames] = useState([]);
      
  
const nameSchema = yup.object(
    {
        name:yup.number().required('Number is required.'),                
    }     
).required();

const loopSchema = yup.object(
  {
      loopName:yup.string().required('Enter a name for creating a loop')                
  }     
).required();

const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(nameSchema),
    defaultValues: {
      name : ""
    },
  });

  // const {
  //   register1,
  //   handleSubmit2,
  //   formState: { errors2 },
  //   reset2,
  // } = useForm({
  //   resolver: yupResolver(loopSchema),
  //   defaultValues: {
  //     loopName:""
  //   },
  // });
 


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
      setNoofRaws(raws); 
    })
    .catch((err)=>{
      console.log(err);
    })

  }


  useEffect(()=>{
    if(isMount){
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
      console.log("dead",inputValue);
      terminateModal();
      props.selectedHeading(props.browseBtnId,selectedSheet,selectedHeading,inputValue);
      setShowListOne(false);
      setShowListTwo(false);
  };

  const addDataReferenceForLoop = (event) => {
      event.preventDefault();
      event.stopPropagation()
      console.log('york');
      terminateLoopModal();
      props.assignLoopRef(props.browseBtnId,selectedSheet,inputLoopName);
      setShowListOne(false);
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


  console.log('SON',document.getElementsByClassName("myUL"));

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
    if(props.usage==="Data Driven"){
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
  },[])



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
          <form  onSubmit={addDataReference} id={'formInMapper'} register={register} errors={errors}>
            <Modal.Header>
              <Modal.Title>Enter an Index</Modal.Title>    
            </Modal.Header>
            <Modal.Body>
              <label>Enter an Index For Getting a value:</label>
              <input {...register('name')} type="text" onChange={inputHandler}/>
              <small className="text-danger">{errors.name?.message}</small>
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
          <form  onSubmit={addDataReferenceForLoop} id='formLoop' register={register} errors={errors}>
            <Modal.Header closeButton onClick={terminateLoopModal}>
              <Modal.Title> Iteration Based On Data Section</Modal.Title>    
            </Modal.Header>
            <Modal.Body>
              <label>Enter a loop name:</label>
              <input  type="text" onChange={inputLoopNameHandler}/>
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
    return(
      <div className="form-group">
            <label>{props.title}</label>
            <select name="DD_list" id="DD_list" className="form-select" aria-label="Default select example" onChange={(event)=>props.setSelectorValues(event.target.value)}>{optionsInDDMode}</select>
      </div>
    )
  }


};

export default Mapper;
