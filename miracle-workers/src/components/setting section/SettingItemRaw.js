import React, { useState } from "react";
import { HiPencil } from "react-icons/hi";
import { MdOutlineDeleteForever } from "react-icons/md";
import "./SettingItemRaw.css";
import SettingEditPopup from './SettingEditPopup'
import { useRef } from "react";
import axios from "axios";

const SettingItemRaw = ({ rawData,id,type,onDelete }) => {

  let url = "http://localhost:5000/settings/" + type + "/" + id;

  const [clickedItem, setClickedItem] = useState("");

  const ref=useRef();

  const editHandler=() => {
    axios
    .get(url)
    .then((res) => {
      console.log(res.data.itemRaw.name)
      setClickedItem(res.data.itemRaw.name); //all settings items (commands, browsers,...) are sent from database with "settingType" key.
      console.log(clickedItem);
    })
    .catch((err) => {
      console.log(err);
    });
    ref.current.open();
  }

  // const testHandler=() => {
  //   setState("Hello");
  //   ref.current.open();
  // }

  const deleteHandler=() => {
    onDelete(id,type);
  }

  console.log(clickedItem)
  return (
      <div className="raw">
        <span>{rawData}</span>
        <HiPencil onClick={editHandler}/>
        <MdOutlineDeleteForever onClick={deleteHandler}/>
        <SettingEditPopup type={type} ref={ref} itemID={id} value={clickedItem} callingFrom="edit"/>
      </div>
  );
};

export default SettingItemRaw;
