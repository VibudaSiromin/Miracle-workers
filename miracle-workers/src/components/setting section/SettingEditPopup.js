// import React from "react";
// import { useState } from "react";
// import { Modal, Button } from "react-bootstrap";
// import { forwardRef, useImperativeHandle} from "react";

// const SettingEditPopup = ({ type, itemID ,value, edit}, ref) => {
//   // let url = "http://localhost:5000/settings/" + type + "/" + itemID;

//   const [enablePopup, setEnablePopup] = useState(false);

//   console.log(value);

//   const [fieldValue,setFieldValue]=useState(value);
//   console.log(fieldValue)
//   const inputHandler=(event) => {
//     setFieldValue(event.target.value);
//   }

//   const closeModal = () => {
//     setEnablePopup(false);
//     setFieldValue(value)
//   };

//   useImperativeHandle(ref, () => ({
//     open() {
//       setEnablePopup(true);
//     },
//   }));

//   const onSubmitHandler = (event) => {
//     event.preventDefault();
//     edit(fieldValue);
//     setEnablePopup(false);
//     setFieldValue("");
//   };

//   return (
//     <form onSubmit={onSubmitHandler} id="settingsEPopup" action="" method="POST">
//       <Modal show={enablePopup}>
//         <Modal.Header closeButton onClick={closeModal}>
//           <Modal.Title>Edit {type}</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <input type="text" value={fieldValue} onChange={inputHandler}></input>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="danger" onClick={closeModal}>
//             Close
//           </Button>
//           <Button variant="dark" form="settingsEPopup" type="submit">
//             <span>Edit</span>
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </form>
//   );
// };

// export default forwardRef(SettingEditPopup);
