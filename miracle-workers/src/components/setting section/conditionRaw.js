import React, { useState } from "react";
import {MdModeEdit,MdDeleteForever} from 'react-icons/md';
// import "./SettingItemRaw.css";
import { useRef } from "react";
import ConditionEditPopup from "./conditionEditPopup";

const ConditionRaw = ({ item,onDelete,onItemEdit }) => {

  // const [clickedItem, setClickedItem] = useState("");

  const ref=useRef();

  const onEditClickHandler=() => {
    ref.current.open();
  }

  const editHandler=(item,id)=>{
    onItemEdit(item,id);
  }

  const deleteHandler=() => {
    onDelete(item.id);
  }

  return (
      <tr className='table-primary' key={item.id}>
        <td>{item.name}</td>
        <ConditionEditPopup
        ref={ref}
        item={item}
        onEdit={editHandler}
        />
        <td className="table-data">
          <MdModeEdit onClick={()=>onEditClickHandler()}/>
          {" "}
          <MdDeleteForever onClick={()=>deleteHandler()}/>
        </td>
    </tr>
  );
};

export default ConditionRaw;
