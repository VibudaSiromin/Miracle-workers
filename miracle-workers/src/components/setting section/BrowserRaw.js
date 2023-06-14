// import React, { useState } from "react";
// import {MdModeEdit,MdDeleteForever} from 'react-icons/md';
// // import "./SettingItemRaw.css";
// import { useRef } from "react";
// import BrowserEditPopup from "./BrowserEditPopup";


// const BrowserRaw = ({ item,onDelete,onItemEdit ,onEditClickHandler}) => {

//   // const ref=useRef();

//   const editHandler=(item,id)=>{
//     console.log(item,id)
//     onItemEdit(item,id);
//   }


//   const deleteHandler=() => {
//     onDelete(item.id);
//   }

//   return (
//       <tr className='table-primary'>
//         <td>{item.name}</td>

//         <td className="table-data">
//         <MdModeEdit onClick={()=>onEditClickHandler(item)}/>
//           {" "}
//           <MdDeleteForever onClick={()=>deleteHandler()}/>
//         </td>
//     </tr>
//   );
// };

// export default BrowserRaw;

import React, { useState } from "react";
import {MdModeEdit,MdDeleteForever} from 'react-icons/md';
import "./SettingItemRaw.css";
import { useRef } from "react";
import BrowserEditPopup from "./BrowserEditPopup";

const BrowserRaw = ({ item,onDelete,onItemEdit ,userType}) => {

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
      <tr  key={item.id}>
        <td>{item.name}</td>
        {userType=="Admin"?
        <span>
          <BrowserEditPopup
          ref={ref}
          item={item}
          onEdit={editHandler}
          />    
          <td className="table-data">
          <MdModeEdit onClick={()=>onEditClickHandler()} className="float-right" style={{ marginRight: "18px", marginTop: "7px", color: "#73FBFD" }}/>
          {" "}
          <MdDeleteForever onClick={()=>deleteHandler()} className="float-right"style={{ marginRight: "18px", marginTop: "7px", color: "red"}} />
          </td>
        </span>
        :null      
        }

    </tr>
  );
};

export default BrowserRaw;
