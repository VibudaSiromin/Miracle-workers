import React from "react";
import { Button } from "react-bootstrap";
import Table from './Table'
import ModalDialog from './PopUpWindow';
import {useState} from 'react'

const Heading = (props) => {
    //const title=[];
    const [heading,setHeading]=useState([]);
    console.log('Dunlop:',props.purpose);
    const addHeading = (addTitle) => {
        const valueList=Object.values(addTitle);
        const newTitle=[...heading,valueList];
        setHeading(newTitle);
        props.heading(heading);
    }

    const updateGeneralData = (tableData) => {
       // console.log('Big smoke');
    }
    console.log("All the heading titles: "+ heading);

    return(
        <>
        {/* <Button variant="success" onClick={addTitle}>column</Button> */}
        <ModalDialog
          enableChainPopUps={false}
          generalPurpose={props.generalPurpose}//true
          title={["Column Name"]}//Adding a new column name
          noFields={props.noFields}
          buttonValue="Column"
        //saveNewData={addHeading}
          saveNewHeadingData={addHeading}
          purpose='addHeading'
          formID={["myFormOnePart1", "myFormOnePart2"]}  
        >
        </ModalDialog>
        <Table title={heading} generalPurpose={props.generalPurpose} /*true*/ noFields={[heading.length]} enableChainPopUps={false} purpose="fillData"></Table>
        <></>
        </>
    )
}

export default Heading;