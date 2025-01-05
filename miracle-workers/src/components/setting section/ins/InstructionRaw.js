import React, { useState } from "react";
import {MdModeEdit,MdDeleteForever} from 'react-icons/md';
// import "./SettingItemRaw.css";
import { useRef } from "react";
import InstructionEditPopup from "./InstructionEditPopup";

const InstructionRaw = ({ item,onDelete,onItemEdit }) => {

  const ref=useRef();

  const onEditClickHandler=() => {
    ref.current.open();
  }

  const editHandler=(item,id)=>{
    console.log(item,id)
    onItemEdit(item,id);
  }

  const deleteHandler=() => {
    onDelete(item.id);
  }

  return (
      <tr className='table-primary'>
        <td>{item.name}</td>
        <InstructionEditPopup
        ref={ref}
        item={item}
        onEdit={editHandler}
        />
        <MdModeEdit onClick={()=>onEditClickHandler()}/>
        <MdDeleteForever onClick={()=>deleteHandler()}/>
    </tr>
  );
};

export default InstructionRaw;
