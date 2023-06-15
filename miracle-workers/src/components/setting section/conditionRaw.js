import React, { useState } from "react";
import {MdModeEdit,MdDeleteForever} from 'react-icons/md';
import "./SettingItemRaw.css";
import { useRef } from "react";
import ConditionEditPopup from "./conditionEditPopup";

const ConditionRaw = ({ item,onDelete,onItemEdit,userType }) => {

  // const [clickedItem, setClickedItem] = useState("");

  const ref=useRef();

  const onEditClickHandler=() => {
    ref.current.open();
  }

  const editHandler=(item,id,oldValue)=>{
    onItemEdit(item,id,oldValue);
  }

  const deleteHandler=() => {
    onDelete(item.id);
  }

  return (
    <div className="raw">
      <span
        className="float-left"
        style={{ marginLeft: "18px", marginTop: "7px", color: "white" }}
      >
      {item.name}
      </span>
        {userType=="Admin"?
          <span>
            <ConditionEditPopup
            ref={ref}
            item={item}
            onEdit={editHandler}
            />  
              <MdModeEdit onClick={()=>onEditClickHandler()} className="float-right" style={{ marginRight: "18px", marginTop: "7px", color: "#73FBFD" }}/>
              {" "}
              <MdDeleteForever onClick={()=>deleteHandler()} className="float-right"style={{ marginRight: "18px", marginTop: "7px", color: "red"}}/>
          </span>
        :null
        }
    </div>
  );
};

export default ConditionRaw;
