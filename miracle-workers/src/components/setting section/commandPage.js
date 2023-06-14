import React from "react";
import "./SettingItemPage.css";
import axios from "axios";
import { useState, useEffect, useRef } from "react";
import CommandPopup from "./commandPopup";
import CommandRaw from "./commandRaw";
import { BiPlus } from "react-icons/bi";
import { BsCommand } from "react-icons/bs";
import jwt_decode from "jwt-decode";
import { useDispatch,useSelector } from "react-redux";
import Swal from 'sweetalert2';

const CommandPage = () => {

  const [commandObject, setCommandObject] = useState([]);

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


  let url = "http://localhost:5000/settings/commands";
  console.log(url)

  const getData = () => {
    axios
      .get(url)
      .then((res) => {
        setCommandObject(res.data.settingItem); 
        console.log("gft");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  console.log(commandObject);

  // const deleteHandler = (id) => {
  //   console.log("jjjjjjjjj")
  //   const url = "http://localhost:5000/settings/commands/"+ id;
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
        const url = "http://localhost:5000/settings/commands/" + id;
        axios
          .delete(url)
          .then((res) => {
            // Optional: Show success message using SweetAlert2
            swalWithBootstrapButtons.fire(
              'Deleted!',
              'Command has been deleted.',
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
              'Failed to delete the Command.',
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
  const editRef=useRef();

  const addItemHandler = () => {
    ref.current.open();
  };
  console.log(commandObject);

  const addNewItemHandler = (commandName,binaryValue) => {
    let url = "http://localhost:5000/settings/commands";
    axios
      .post(url, {
        commandName: commandName,
        binaryValue:binaryValue
      })
      .then((res) => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Command has been added',
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


  const editHandler=(command,binaryValue,id)=>{
    const url = "http://localhost:5000/settings/commands/"  + id;
    const editedItem={
      id:id,
      newCommand:command,
      binaryValue:binaryValue
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
      <div className="col-lg-10">
        <CommandPopup
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
                Commands
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
          <tr>
              <th>Command</th>
              <th>Locator</th>
              <th>Data</th>
              <th>Brach Selection</th>
              {userType=="Admin"?<th>Actions</th>:null}
          </tr>
        <div className="row" style={{ paddingLeft: "16px" }}>
          <div className="col-lg-10">
            {commandObject.map((command) => (
                <CommandRaw
                command={command}
                onDelete={deleteHandler}
                onCommandEdit={editHandler}
                key={command.id}
                userType={userType}
                />
            ))}
          </div>
            <div className="col-lg-2 center-logo">
              <span className="textWithLogo">Browser</span>
              <div><BsCommand className="logo"/></div>
            </div>
      </div>
  </div>
  );
};

export default CommandPage;
