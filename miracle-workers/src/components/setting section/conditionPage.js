import React from "react";
import "./SettingItemPage.css";
import axios from "axios";
import { useState, useEffect, useRef } from "react";
import { BsCommand } from "react-icons/bs";
import { Grid } from "@material-ui/core";
import ConditionRaw from "./conditionRaw";
import ConditionPopup from "./conditionPopup";
import { Button } from "react-bootstrap";
import jwt_decode from "jwt-decode";
import { useDispatch,useSelector } from "react-redux";
import { RiFileSearchLine } from "react-icons/ri";
import { BiPlus } from "react-icons/bi";
import Swal from 'sweetalert2';

const ConditionPage = () => {

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

  let url = "http://localhost:5000/settings/conditions";
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

  // const deleteHandler = (id) => {
  //   console.log("jjjjjjjjj")
  //   const url = "http://localhost:5000/settings/conditions/"+ id;
  //   axios
  //     .delete(url)
  //     .then((res) => {
  //       getData();
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };
  const deleteHandler = (id) => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    });
  
    swalWithBootstrapButtons.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        const url = "http://localhost:5000/settings/conditions/" + id;
        axios
          .delete(url)
          .then((res) => {
            // Optional: Show success message using SweetAlert2
            swalWithBootstrapButtons.fire(
              'Deleted!',
              'Condition has been added.',
              'success'
            );
            // Perform any additional actions after successful deletion
            getData();
          })
          .catch((err) => {
            console.log(err);
            // Optional: Show error message using SweetAlert2
            swalWithBootstrapButtons.fire(
              'Error',
              'Failed to delete the Condition.',
              'error'
            );
          });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        swalWithBootstrapButtons.fire(
          'Cancelled',
          '',
          'error'
        );
      }
    });
  };

  const ref = useRef();

  const addItemHandler = () => {
    ref.current.open();
  };
  console.log(item);

  const addNewItemHandler = (newItem) => {

    const isNamePresent = item.some((obj) => obj.name === newItem);
    if(isNamePresent===true){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Duplicate Condition. Cannot be added',
        footer: ''
      })
      return;
    }

    let url = "http://localhost:5000/settings/conditions";
    axios
      .post(url, {
        newValue: newItem,
      })
      .then((res) => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Condition has been added',
          showConfirmButton: false,
          timer: 1500
        });
        getData();
        console.log("inserted");
      })
      .catch((err) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
          footer: ''
        })
        console.log(err);
      });
  };


  const editHandler=(newItem,id,oldValue)=>{

    if(newItem!==oldValue){
      const isNamePresent = item.some((obj) => obj.name === newItem);
      if(isNamePresent===true){
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Duplicate Condition. Cannot be edited',
          footer: ''
        })
        return;
      }
    }else{
      Swal.fire({
        icon: 'success',
        title: 'Oops...',
        text: 'You entered the current Condition',
        footer: ''
      })
      return;
    }

    const url = "http://localhost:5000/settings/conditions/"  + id;
    const editedItem={
      id:id,
      editedValue:newItem,
    }
    axios
    .put(url,editedItem)
    .then((res) => {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Condition has been edited',
        showConfirmButton: false,
        timer: 1500
      });
      getData();
      console.log("kll");
    })
    .catch((err) => {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
        footer: ''
      })
      console.log(err);
    });
  }

  return (
    
    <div className="row">
      <div className="col-lg-9">
        <ConditionPopup
          ref={ref}
          addNew={addNewItemHandler}
        />
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
            Conditions
          </span>
          {userType=="Admin"?
              <button className="button float-right" onClick={addItemHandler}>
                <BiPlus className="plus" />
                <span className="add"> Add</span>
              </button>
            :null
            }
          </div>
      </div>


          {/* <th>Condition</th>
          {
            userType=="Admin"?
            <th>Actions</th>
            :null
          } */}
    <div className="row" style={{ paddingLeft: "16px" }}>
        <div className="col-lg-9">
          {item.map((item) => (
              <ConditionRaw
               item={item}
               onDelete={deleteHandler}
               onItemEdit={editHandler}
               key={item.id}
               userType={userType}
              />
          ))}
          </div>
          <div className="col-lg-3 center-logo">
            <span className="textWithLogo">Browser</span>
            <div><RiFileSearchLine className="logo"/></div>
          </div>
      </div>
  </div>
  );
};

export default ConditionPage;
