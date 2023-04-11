import React from "react";
import { Button } from "react-bootstrap";
import Table from "./Table";
import ModalDialog from './PopUpWindow';
import {useState,useEffect} from 'react'

const Heading = (props) => {
    const [heading,setHeading]=useState([]);
    /* 
    When you initialize the state variable using a prop value, 
    it will only be set once when the component mounts. 
    If the prop value changes after that, 
    it won't automatically update the state variable.
    That's why useEffect hook is used
    */
    useEffect(() => {
      setHeading(props.initialHeading);
    }, [props.initialHeading]);

    console.log('file headinggggxxx ',heading);
    const addHeading = (addTitle) => {
        const valueList=Object.values(addTitle);//converts object values to array values
        const newTitle=[...heading,valueList];
        setHeading(newTitle);
        //props.heading(heading);
    }

    const dropHeading = (headingIndex) => {
      const slicingHeading=[...heading];
      slicingHeading.splice(headingIndex,1);
      setHeading(slicingHeading);  
    }


    return(
        <>
        {/* <Button variant="success" onClick={addTitle}>column</Button> */}
        <ModalDialog
          enableChainPopUps={false}
          generalPurpose={props.generalPurpose}//true
          title={["Column Name"]}//Adding a new column name
          noFields={props.noFields}
          buttonValue="Column"
          saveNewHeadingData={addHeading}
          purpose='addHeading'
          formID={["myFormOnePart1", "myFormOnePart2"]}  
        >
        </ModalDialog>
        <Table title={heading} dropHeading={dropHeading} generalPurpose={props.generalPurpose} /*true*/ noFields={[heading.length]} enableChainPopUps={false} purpose="fillData" removeHeading={props.removeHeading} /*true*/initialData={props.initialData}></Table>
        {/* initialData can be null array as well. */}
        <></>
        </>
    )
}

export default Heading;