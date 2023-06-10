import React from "react";
import "./SettingItemPage.css";
import axios from "axios";
import { useState, useEffect, useRef } from "react";
import BrowserPopup from "./BrowserPopup";
import BrowserRaw from "./BrowserRaw";
import { Button } from "react-bootstrap";


const BrowserPage = () => {

  const [object, setObject] = useState([]);

  let url = "http://localhost:5000/settings/browsers";
  console.log(url)

  const getData = () => {
    axios
      .get(url)
      .then((res) => {
        setObject(res.data.settingItem); 
        console.log("gft");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  console.log(object);

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

  console.log(object);

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

  return (
    // <Grid container>
    //   <Grid xs={12} sm={7} item>
          <div className="version-01">
              <BrowserPopup
                ref={ref}
                addNew={addNewItemHandler}
              />
              <table id="data-Table">
                <thead>
                  <tr>
                    <Button  onClick={addItemHandler}>
                      Add New Browser
                  </Button>
                  </tr>
                  <tr>
                    <th>Browser</th>
                    <th>Actions</th>
                  </tr>
 
                </thead>
                <tbody>
                  {object.map((item) => (
                    <BrowserRaw
                    item={item}
                    onDelete={deleteHandler}
                    onItemEdit={editHandler}
                    key={item.id}
                    />
                ))}
                </tbody>
            </table>
          </div>
  );
};

export default BrowserPage;
