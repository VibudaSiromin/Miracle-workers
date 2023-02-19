import React from "react";
import { HiPencil } from "react-icons/hi";
import { MdOutlineDeleteForever } from "react-icons/md";
import "./SettingItemRaw.css";

const SettingItemRaw = ({ rawData,id }) => {

  const editHandler=() => {
    console.log(id)
  }
  return (
      <div className="raw">
        <span>{rawData}</span>
        <HiPencil onClick={editHandler}/>
        <MdOutlineDeleteForever />
      </div>
  );
};

export default SettingItemRaw;
