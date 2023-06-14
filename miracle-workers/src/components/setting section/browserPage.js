// import React from "react";
// import "./SettingItemPage.css";
// import axios from "axios";
// import { useState, useEffect, useRef } from "react";
// import BrowserPopup from "./BrowserPopup";
// import BrowserRaw from "./BrowserRaw";
// import { Button } from "react-bootstrap";
// import BrowserEditPopup from "./BrowserEditPopup";
// import * as yup from "yup";
// import { useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";

// const BrowserPage = () => {

//   const [object, setObject] = useState([]);

//   let url = "http://localhost:5000/settings/browsers";
//   console.log(url)

//   const getData = () => {
//     axios
//       .get(url)
//       .then((res) => {
//         setObject(res.data.settingItem); 
//         console.log("gft");
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   };

//   useEffect(() => {
//     getData();
//   }, []);

//   console.log(object);

//   const [open,setOpen]=useState(false)
  
//   const onEditClickHandler=(item) => {
//     // ref.current.open();
//     setOpen(true);
//     setValue('browser',item.name)
//   }

//   const schema = yup.object().shape({
//     browser: yup.string().required("Cannot Be Empty"), 
//   });
    
//   const { register, handleSubmit,setValue, formState: { errors } } = useForm({
//         resolver: yupResolver(schema),
//   });

  
//   const onSubmitHandler = (data) => {
    
//     console.log("abc")
//     // onEdit(data.browser,item.id);
//     setOpen(false);
//     console.log("def")

//   };
//   const deleteHandler = (id) => {
//     console.log("jjjjjjjjj")
//     const url = "http://localhost:5000/settings/browsers/"+ id;
//     axios
//       .delete(url)
//       .then((res) => {
//         getData();
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   };

//   const ref = useRef();

//   const addItemHandler = () => {
//     ref.current.open();
//   };

//   console.log(object);

//   const addNewItemHandler = (item) => {
//     let url = "http://localhost:5000/settings/browsers";
//     axios
//       .post(url, {
//         newValue: item,
//       })
//       .then((res) => {
//         getData();
//         console.log("inserted");
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   };

//   const editHandler=(item,id)=>{
//     const url = "http://localhost:5000/settings/browsers/"  + id;
//     const editedItem={
//       id:id,
//       editedValue:item,
//     }
//     axios
//     .put(url,editedItem)
//     .then((res) => {
//       getData();
//       console.log("kll");
//     })
//     .catch((err) => {
//       console.log(err);
//     });
//   }

//   return (
//     // <Grid container>
//     //   <Grid xs={12} sm={7} item>
//           <div className="version-01">
//               {/* <BrowserPopup
//                 ref={ref}
//                 addNew={addNewItemHandler}
//               /> */}
//               <BrowserEditPopup
//                   open={open}
//                   onEdit={editHandler}
//                   onSubmit={onSubmitHandler}
//                   register={register}
//                   handleSubmit={handleSubmit}
//                   errors={errors}
//                   setOpen={setOpen}
//              />
//               <table id="data-Table">
//                 <thead>
//                   <tr>
//                     <Button  onClick={addItemHandler}>
//                       Add New Browser
//                   </Button>
//                   </tr>
//                   <tr>
//                     <th>Browser</th>
//                     <th>Actions</th>
//                   </tr>
 
//                 </thead>
//                 <tbody>
//                   {object.map((item) => (
//                     <BrowserRaw
//                     item={item}
//                     onDelete={deleteHandler}
//                     onItemEdit={editHandler}
//                     key={item.id}
//                     onEditClickHandler={onEditClickHandler}
//                     />
//                 ))}
//                 </tbody>
//             </table>
//           </div>
//   );
// };

// export default BrowserPage;

import React from "react";
import "./SettingItemPage.css";
import axios from "axios";
import { useState, useEffect, useRef } from "react";
import { BsCommand } from "react-icons/bs";
import { Grid } from "@material-ui/core";
import BrowserPopup from "./BrowserPopup";
import BrowserRaw from "./BrowserRaw";
import jwt_decode from "jwt-decode";
import { useDispatch,useSelector } from "react-redux";
import { BiPlus } from "react-icons/bi";
import { Button } from "react-bootstrap";

const BrowserPage = () => {

  const [item, setItem] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {

      const decodedToken = jwt_decode(token);
      const { userType } = decodedToken;
      if(userType=="Admin"){
        dispatch({ type: "SET_ADMIN" })
      }
    }
  }, [dispatch]);

  const userType=useSelector(state => state.userTypeReducer.userType);

  let url = "http://localhost:5000/settings/browsers";
  console.log(url)

  const getData = () => {
    axios
      .get(url)
      .then((res) => {
        setItem(res.data.settingItem); 
        console.log("gft");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  console.log(item);

  const deleteHandler = (id) => {
    console.log("jjjjjjjjj")
    const url = "http://localhost:5000/settings/browsers/"+ id;
    axios
      .delete(url)
      .then((res) => {
        getData();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const ref = useRef();

  const addItemHandler = () => {
    ref.current.open();
  };
  console.log(item);

  const addNewItemHandler = (item) => {
    let url = "http://localhost:5000/settings/browsers";
    axios
      .post(url, {
        newValue: item,
      })
      .then((res) => {
        getData();
        console.log("inserted");
      })
      .catch((err) => {
        console.log(err);
      });
  };


  const editHandler=(item,id)=>{
    const url = "http://localhost:5000/settings/browsers/"  + id;
    const editedItem={
      id:id,
      editedValue:item,
    }
    axios
    .put(url,editedItem)
    .then((res) => {
      getData();
      console.log("kll");
    })
    .catch((err) => {
      console.log(err);
    });
  }
  // const arr=[1,2,3]

  return (
    // <Grid container>
    //   <Grid xs={12} sm={7} item>
  <div>
    <BrowserPopup
      ref={ref}
      addNew={addNewItemHandler}
    />
  <table >

    <thead>
      <tr>
  <div className="headerBox">
    <span
      className="settingType float-left"
      style={{
      width: "22%",
              // padding: "22px",
      fontWeight: "700",
      fontSize: "17px",
      }}
      >
        Browsers
    </span>
    {userType=="Admin"?
        <button className="button float-right" onClick={addItemHandler}>
          <BiPlus className="plus" />
          <span className="add"> Add New Browser</span>
        </button>
      :null
      }
        {/* <RxCross1 className="cross float-right" /> */}
      </div>
      </tr>
      {/* <tr>
          <th>Browser</th>
          {userType=="Admin"?
          <th>Actions</th>
          :null
          }
        </tr> */}
    </thead>
    <tbody>
          {item.map((item) => (
              <BrowserRaw
               item={item}
               onDelete={deleteHandler}
               onItemEdit={editHandler}
               key={item.id}
               userType={userType}
              />
          ))}
    </tbody>
  </table>
</div>
  );
};

export default BrowserPage;
