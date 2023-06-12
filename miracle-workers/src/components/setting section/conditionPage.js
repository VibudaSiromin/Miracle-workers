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

  const deleteHandler = (id) => {
    console.log("jjjjjjjjj")
    const url = "http://localhost:5000/settings/conditions/"+ id;
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
    let url = "http://localhost:5000/settings/conditions";
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
    const url = "http://localhost:5000/settings/conditions/"  + id;
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
  <div className="version-01">
    <ConditionPopup
      ref={ref}
      addNew={addNewItemHandler}
    />
  <table id="data-Table">
    <thead>
      {userType=="Admin"?
      <tr>
        <Button onClick={addItemHandler}>
            Add New Condition
        </Button>
      </tr>
      :null
      }

      <tr>
          <th>Condition</th>
          {
            userType=="Admin"?
            <th>Actions</th>
            :null
          }
        </tr>
    </thead>
    <tbody>
          {item.map((item) => (
              <ConditionRaw
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

export default ConditionPage;
