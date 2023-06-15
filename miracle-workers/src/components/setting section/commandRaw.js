import React, { useState } from "react";
import {MdModeEdit,MdDeleteForever} from 'react-icons/md';
import "./SettingItemRaw.css";
import { useRef } from "react";
import axios from "axios";
import CommandEditPopup from "./commandEditPopup";

const CommandRaw = ({ command,onDelete,onCommandEdit,userType }) => {

  // const [clickedItem, setClickedItem] = useState("");

  const ref=useRef();

  const onEditClickHandler=() => {
    ref.current.open();
  }

  const editHandler=(command,binaryValue,id,oldValue)=>{
    onCommandEdit(command,binaryValue,id,oldValue);
  }

  const deleteHandler=() => {
    onDelete(command.id);
  }

  return (
    <div className="raw">
      <span
        className="float-left"
        style={{ marginLeft: "18px", marginTop: "7px", color: "white" }}
      >
          {command.name}
          {command.binaryValue[0]=="1"?"True":"False"}
          {command.binaryValue[1]=="1"?"True":"False"}
          {command.binaryValue[2]=="1"?"True":"False"}
      </span>

        {
          userType=="Admin"?  
          <span>
          <CommandEditPopup
          ref={ref}
          command={command}
          onEdit={editHandler}
          />
          <td className="table-data">
            <MdModeEdit onClick={()=>onEditClickHandler()} className="float-right" style={{ marginRight: "18px", marginTop: "7px", color: "#73FBFD" }}/>
            {" "}
            <MdDeleteForever onClick={()=>deleteHandler()} className="float-right"style={{ marginRight: "18px", marginTop: "7px", color: "red"}}/>
          </td>
          </span>

          :null
        }
    </div>
  );
};

export default CommandRaw;
