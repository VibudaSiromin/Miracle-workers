import './Mapper.css'
import { useState, useEffect, useRef } from "react";
import axios from 'axios';
import { GrLink } from "react-icons/gr";
import { FaLink } from "react-icons/fa";


const Mapper = (props) => {
  
  const [arrayOne, setArrayOne] = useState([]);
  const [arrayTwo, setArrayTwo] = useState([]);
  const [sheet,setSheet] = useState([]);
  const [sectionHeading,setSectionHeading] = useState([]);
  const [selectedSheet,setSelectedSheet] = useState();
  //const [hideDropDown,setHideDropDown]=useState(true);
  const [showListOne,setShowListOne] = useState(false);
  const [showListTwo,setShowListTwo] = useState(false);

  const depthLevelOne =async () => {

    // try{
    //   const response = await axios.get(
    //     props.URLForGettingSheets
    //   )
    //   setSheet(response.data[props.reqDetailsforDB[0]]);

    // }catch(err){
    //   if (err.response) {
    //     // The client was given an error response (5xx, 4xx)
    //     console.log(err.response.data);
    //     console.log(err.response.status);
    //     console.log(err.response.headers);
    //   } else if (err.request) {
    //     // The client never received a response, and the request was never left
    //     console.log(err.request);
    //   } else {
    //     // Anything else
    //     console.log('Error', err.message);
    //   }
    // }


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
    console.log('monster energy',listArrayOne);
    setArrayOne([...listArrayOne]);

  },[sheet])
  

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
          <button id={sectionHeading[i]} value={sectionHeading[i]}  onClick={(e)=>{addDataReference(e)}} style={btnStyles}>
            {sectionHeading[i]}
          </button>
        </li>
      );
    }
     console.log('red bull',listArrayTwo);
     setArrayTwo([...listArrayTwo]);
     //console.log('petronas',document.getElementById(selectedDataSheet).offsetTop);

  },[sectionHeading])

  //use a proper name for the function
  const addDataReference = (e) => {
    console.log('position',document.getElementById(selectedSheet).getBoundingClientRect().top);
    console.log('selected data field value:',e.target.value);
    console.log("this is the second drop down");
    props.selectedHeading(props.browseBtnId,selectedSheet,e.target.value);
    setShowListOne(false);
    setShowListTwo(false);

  };

  document.addEventListener('click', (event) => {
    console.log('lepord');
    //this if condition only trigger for the normal clicks.It does not trigger for btn clicks
    if (event.target.tagName.toLowerCase() !== 'button') {
    
      setShowListOne(false);
      setShowListTwo(false);

    }

  });

  console.log('SON',document.getElementsByClassName("myUL"));

   const secondListPosition = {top:0}

  // if(selectedDataSheet!==undefined){
  //   secondListPosition.top=document.getElementById(selectedDataSheet).getBoundingClientRect().top+20;
  // }
 
  console.log("Dragon");

  return (
    <>
      {/* <AiOutlineLink id="dataBrowseBtn" onClick={depthLevelOne} size="30px"></AiOutlineLink> */}
      {/* <FaLink id="dataBrowseBtn" onClick={depthLevelOne}></FaLink> */}
      <button id="dataBrowseBtn" onClick={depthLevelOne}>Browse</button>
      <div>
        {showListOne && <ul className="myUL">{arrayOne}</ul>}
      </div>
      <div>
        {showListTwo && <ul className="myUL2">{arrayTwo}</ul>}
      </div>
      
    </>
  );
};

export default Mapper;
