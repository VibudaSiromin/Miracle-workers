// import React from "react";
// import { useState } from "react";
// import { Modal, Button } from "react-bootstrap";
// import { forwardRef, useImperativeHandle} from "react";
// import * as yup from "yup";
// import { useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";

// const SettingPopup = ({ type, itemID ,value,callingFrom, addNew}, ref) => {
//   // let url = "http://localhost:5000/settings/" + type + "/" + itemID;

//   const schema = yup.object().shape({
//     command: yup.string().required("Cannot Be Empty"),
//     browser:yup.string().required("Cannot Be Empty"),
//     testType:yup.string().required("Cannot Be Empty"),
//     status:yup.string().required("Cannot Be Empty"),
//     yesNo:yup.string().required("Cannot Be Empty"),
//     instruction:yup.string().required("Cannot Be Empty"),
//     condition:yup.string().required("Cannot Be Empty")
//   });

//   const { register, handleSubmit, formState: { errors } } = useForm({
//     resolver: yupResolver(schema),
//   });


//   const [enablePopup, setEnablePopup] = useState(false);

//   console.log(value);

//   const [fieldValue,setFieldValue]=useState(value);
//   console.log(fieldValue)
//   const inputHandler=(event) => {
//     setFieldValue(event.target.value);
//   }

//   const closeModal = () => {
//     setEnablePopup(false);
//     setFieldValue("")
//   };

//   useImperativeHandle(ref, () => ({
//     open() {
//       setEnablePopup(true);
//     },
//   }));

//   const onSubmitHandler = (data) => {
//     console.log(data)
//     addNew(fieldValue);
//     setEnablePopup(false);
//     setFieldValue("");
//   };

//   return (
//     <form onSubmit={handleSubmit(onSubmitHandler,errors.command)} id="settingsPopup" action="" method="POST">
//       <Modal show={enablePopup}>
//         <Modal.Header closeButton onClick={closeModal}>
//           <Modal.Title>{callingFrom} {type}</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//         {type=="commands"? (
//           <div>
//             <input type="text" name="command" onChange={inputHandler} {...register("command")}/>
//             <small className="text-danger">{errors.command?.message}</small>
//           </div>
//           ):null}
//         {type=="browsers"? (
//           <>
//             <input type="text" value={fieldValue} onChange={inputHandler}></input>
//             {/* <small className="text-danger">{errors.Secret_key?.message}</small> */}
//           </>
//           ):null}
//         {type=="test-types"? (
//           <>
//             <input type="text" value={fieldValue} onChange={inputHandler}></input>
//             {/* <small className="text-danger">{errors.Secret_key?.message}</small> */}
//           </>
//           ):null}  
//         {type=="status"? (
//           <>
//             <input type="text" value={fieldValue} onChange={inputHandler}></input>
//             {/* <small className="text-danger">{errors.Secret_key?.message}</small> */}
//           </>
//           ):null} 
//         {type=="yes-no"? (
//           <>
//             <input type="text" value={fieldValue} onChange={inputHandler}></input>
//             {/* <small className="text-danger">{errors.Secret_key?.message}</small> */}
//           </>
//           ):null}      
//        {type=="instructions"? (
//           <>
//             <input type="text" value={fieldValue} onChange={inputHandler}></input>
//             {/* <small className="text-danger">{errors.Secret_key?.message}</small> */}
//           </>
//           ):null}     
//        {type=="conditions"? (
//           <>
//             <input type="text" value={fieldValue} onChange={inputHandler}></input>
//             {/* <small className="text-danger">{errors.Secret_key?.message}</small> */}
//           </>
//           ):null}                  
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="danger" onClick={closeModal}>
//             Close
//           </Button>
//           <Button variant="dark" form="settingsPopup" type="submit">
//             <span>Add</span>
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </form>
//   );
// };

// export default forwardRef(SettingPopup);
