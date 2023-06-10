// import React, { useState } from "react";
// import { HiPencil } from "react-icons/hi";
// import { MdOutlineDeleteForever } from "react-icons/md";
// import "./SettingItemRaw.css";
// import SettingPopup from './SettingPopup'
// import SettingEditPopup from "./SettingEditPopup";
// import { useRef } from "react";
// import axios from "axios";

// const SettingItemRaw = ({ rawData,id,type,onDelete,onEdit }) => {

//   let url = "http://localhost:5000/settings/" + type + "/" + id;

//   const [clickedItem, setClickedItem] = useState("");

//   const ref=useRef();

//   const editClickHandler=() => {
//     ref.current.open();
//   }

//   const editHandler=(value)=>{
//       onEdit(id,type,value);
//   }

//   const deleteHandler=() => {
//     onDelete(id,type);
//   }

//   console.log(clickedItem)
//   return (

//   );
// };

// export default SettingItemRaw;
