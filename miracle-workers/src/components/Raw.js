import React, { useRef,useState } from "react";
import { Button } from "react-bootstrap";
import { propTypes } from "react-bootstrap/esm/Image";
import EditModalDialog from "./EditPopUpWindow";
import {MdModeEdit,MdDeleteForever,MdArrowDropUp,MdArrowDropDown} from 'react-icons/md';
import './Raw.css';

const Raw = ({ testStep, rawIndex, onDelete, onEdit,onArrowClick,title,generalPurpose,enableChainPopUps}) => {

  const tableDataArray=[];

  const modalRef=useRef();
  const editButtonHandler = () => {
    console.log('Captian Price');
    modalRef.current.log();
    console.log(testStep);
  };

  console.log("raw eliye index"+rawIndex);

  const onEditHandler = (editedTableData) => {
    //console.log('Index in raw props'+myindex);
    console.log('AUZI ',editedTableData,'Index ',rawIndex);
    onEdit(editedTableData,rawIndex);
  }

  const moveUpDownHandler=(upOrDown) => {
    if(upOrDown===0){
      // console.log("move up",rawIndex);
      onArrowClick(upOrDown,rawIndex);

    }else{
      // console.log("move down",rawIndex);
      onArrowClick(upOrDown,rawIndex);
    }
  }

  //const arrayConvertor=Object.values(testStep);//convert testStep object to an array
  console.log('menna mehe',testStep);


  for(let i=0;i<title.length;i++){
    let key=title[i];
    if(testStep[key]===undefined || testStep[key]===" "){
      tableDataArray.push(
        <td>{"null"}</td>
      )
    }else{
      tableDataArray.push(
        <td>{testStep[key]}</td>
      )
    }
    
    console.log('tableDataArray:' , tableDataArray);
  }

  console.log('Flying machine',generalPurpose);

  return (
    <>
      <EditModalDialog
        enableChainPopUps={enableChainPopUps}
        ref={modalRef}
        // title={[
        //   "group",
        //   "instruction",
        //   "command",
        //   "locator",
        //   "locatorParameter",
        //   "data",
        //   "swapResult",
        //   "branchSelection",
        //   "action",
        //   "comment",
        // ]}
        title={title}
        noFields={[3, 7]}
        rawNumber={null}
        raw={testStep} 
        index={rawIndex}
        onEdit={onEditHandler}
        generalPurpose={generalPurpose}
      ></EditModalDialog>
      <tr>
        <td className="table-data">
          {" "}
          <MdModeEdit color="04D9FF" size="20px"  onClick={()=>editButtonHandler()}></MdModeEdit>
        </td>
        <td className="table-data">
          {" "}
          <MdDeleteForever color="#FF291C" size="20px" onClick={()=>{onDelete(rawIndex)}}></MdDeleteForever>
        </td>
        <td className="table-data"><MdArrowDropUp size="30px" color="#00FF00" onClick={()=>moveUpDownHandler(0)}/><MdArrowDropDown size="30px" color="#00FF00" onClick={()=>moveUpDownHandler(1)}/></td>
        {/* <td>{testStep.group}</td>
        <td>{testStep.instruction}</td>
        <td>{testStep.command}</td>
        <td>{testStep.locator}</td>
        <td>{testStep.locatorParameter}</td>
        <td>{testStep.data}</td>
        <td>{testStep.swapResult}</td>
        <td>{testStep.branchSelection}</td>
        <td>{testStep.action}</td>
        <td>{testStep.comment}</td> */}
        {tableDataArray}
      </tr>
    </>
  );
};

export default Raw;
