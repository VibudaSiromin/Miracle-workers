import React, { useState } from "react";
import {MdModeEdit,MdDeleteForever} from 'react-icons/md';
// import "./SettingItemRaw.css";
import commandEditPopup from "./commandEditPopup";
import { useRef } from "react";
import axios from "axios";
import CommandEditPopup from "./commandEditPopup";

const CommandRaw = ({ command,onDelete,onCommandEdit }) => {

  // const [clickedItem, setClickedItem] = useState("");

  const ref=useRef();

  const onEditClickHandler=() => {
    ref.current.open();
  }

  const editHandler=(command,binaryValue,id)=>{
    onCommandEdit(command,binaryValue,id);
  }

  const deleteHandler=() => {
    onDelete(command.id);
  }

  return (
      <tr className='table-primary' key={command.id}>
        <td>{command.name}</td>
        <td>{command.binaryValue[0]=="1"?"True":"False"}</td>
        <td>{command.binaryValue[1]=="1"?"True":"False"}</td>
        <td>{command.binaryValue[2]=="1"?"True":"False"}

        <CommandEditPopup
        ref={ref}
        command={command}
        onEdit={editHandler}
        />
        </td>
        <td className="table-data">
          <MdModeEdit onClick={()=>onEditClickHandler()}/>
          {" "}
          <MdDeleteForever onClick={()=>deleteHandler()}/>
        </td>
    </tr>
  );
};

export default CommandRaw;
