// import React from "react";
// import { useState } from "react";
// import { Modal, Button } from "react-bootstrap";
// import { forwardRef, useImperativeHandle} from "react";


// const BrowserEditPopup = ({item,onEdit,open,onSubmit,register,handleSubmit,errors,setOpen}) => {


//   const [enablePopup, setEnablePopup] = useState(false);

//   // console.log(item);

//   const closeModal = () => {
//     setOpen(false);
//   };

//   // useImperativeHandle(ref, () => ({
//   //   open() {
//   //     setEnablePopup(true);
//   //     setValue('browser',item.name)
//   //   },
//   // }));


//   return (
//       <Modal show={open}>
//             <form onSubmit={handleSubmit(onSubmit)} id="browserEditPopup" method="POST">

//         <Modal.Header closeButton onClick={closeModal}>
//           <Modal.Title>Edit Browser</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <input type="text" name="browser" {...register("browser")}/>
//           <div>
//           <small className="text-danger">{errors.browser?.message}</small>
//           </div>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="danger" onClick={closeModal}>
//             Close
//           </Button>
//           {/* <Button variant="dark" form="browserEditPopup" type="submit">
//             <span>Edit</span>
//           </Button> */}
//           <button type="submit">
//             Save
//           </button>
//         </Modal.Footer>
//         </form>
//       </Modal>
//   );
// };

// export default BrowserEditPopup;

import React from "react";
import { useState } from "react";
import { Modal, Button} from "react-bootstrap";
import { forwardRef, useImperativeHandle} from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

const BrowserEditPopup = ({item, onEdit}, ref) => {

  const schema = yup.object().shape({
    browser: yup.string().required("Browser cannot Be Empty")
    .matches(/^[A-Z][a-zA-Z]*$/, "Name must start with an uppercase letter"),

  });

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    defaultValues:{
      browser:item.name,
    }
  });

  console.log(item)

  const [enablePopup, setEnablePopup] = useState(false);

  const closeModal = () => {
    setEnablePopup(false);
    // setFieldValue("")
  };

  useImperativeHandle(ref, () => ({
    open() {
      setEnablePopup(true);
    },
  }));

  const onSubmitHandler = (data) => {
    onEdit(data.browser,item.id);
    setEnablePopup(false);
  };

  return (
      <Modal show={enablePopup}>
        <Modal.Header closeButton onClick={closeModal}>
          <Modal.Title>Edit Browser</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <form onSubmit={handleSubmit(onSubmitHandler)} id="browserEditPopup" method="POST">

          <div>
            <div>
              Edit Browser
            </div>
            <input type="text" name="browser" {...register("browser")}/>
            <small className="text-danger">{errors.browser?.message}</small>
          </div>  
          </form>
             
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={closeModal}>
            Close
          </Button>
          <Button variant="dark" form="browserEditPopup" type="submit">
            <span>Edit</span>
          </Button>
        </Modal.Footer>
      </Modal>
  );
};

export default forwardRef(BrowserEditPopup);
