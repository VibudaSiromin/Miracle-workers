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
    modalRef.current.log();
  };

  const onEditHandler = (editedTableData) => {
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

  for(let i=0;i<title.length;i++){
    console.log('your test step:',testStep);
    let key=title[i];
    if(testStep[key]===undefined || testStep[key]===''){
      tableDataArray.push(
        <td>{"null"}</td>
      )
    }else{
      tableDataArray.push(
        <td>{testStep[key]}</td>
      )
    }
    
  }

  return (
    <>
      <EditModalDialog
        enableChainPopUps={enableChainPopUps}
        ref={modalRef}
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
          <MdModeEdit color="04D9FF" size="20px"  onClick={editButtonHandler}></MdModeEdit>
        </td>
        <td className="table-data">
          {" "}
          <MdDeleteForever color="#FF3131" size="20px" onClick={()=>{onDelete(rawIndex)}}></MdDeleteForever>
        </td>
        <td className="table-data"><MdArrowDropUp size="25px" color="#39ff14" onClick={()=>moveUpDownHandler(0)}/><MdArrowDropDown size="25px" color="#39ff14" onClick={()=>moveUpDownHandler(1)}/></td>
        {tableDataArray}
      </tr>
    </>
  );
};

export default Raw;
