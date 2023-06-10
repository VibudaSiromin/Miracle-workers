import React from "react";
import "./SettingItemPage.css";
import axios from "axios";
import { useState, useEffect} from "react";
import { Grid } from "@material-ui/core";
import { RiNumber2 } from "react-icons/ri";
import { GrStatusGood } from "react-icons/gr";
import { TbCircle } from "react-icons/tb";

const SettingItemPage = ({ settingType }) => {
  //remove this comment after changing the name "commandObject"

  let logo;

  switch(settingType){
    case 'test-types':
      logo=<RiNumber2 className="logo"/>
      break;
    case 'status':
      logo=<TbCircle className="logo"/>
      break;
    case 'yes-no':
      logo=<GrStatusGood className="logo"/>
      break;
  }

  const [commandObject, setCommandObject] = useState([]);

  let url = "http://localhost:5000/settings/" + settingType;
  console.log(url)

  const getData = () => {
    axios
      .get(url)
      .then((res) => {
        setCommandObject(res.data.settingItem); //all settings items (commands, browsers,...) are sent from database with "settingType" key.
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

  // const deleteHandler = (id, type) => {
  //   const url = "http://localhost:5000/settings/" + type + "/" + id;
  //   axios
  //     .delete(url)
  //     .then((res) => {
  //       getData();
  //       console.log("kll");
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  // const ref = useRef();

  // const addItemHandler = () => {
  //   ref.current.open();
  // };
  console.log(commandObject);

  // const addNewItemHandler = (value) => {
  //   let url = "http://localhost:5000/settings/" + settingType;
  //   axios
  //     .post(url, {
  //       newValue: value,
  //     })
  //     .then((res) => {
  //       getData();
  //       console.log("inserted");
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };


  // const editHandler=(id,type,value)=>{
  //   const url = "http://localhost:5000/settings/" + type + "/" + id;
  //   const editedItem={
  //     id:id,
  //     editedValue:value
  //   }
  //   axios
  //   .put(url,editedItem)
  //   .then((res) => {
  //     getData();
  //     console.log("kll");
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });
  // }

  return (
    <Grid container>
      <Grid xs={12} sm={7} item>
      <div className="version-01">
        <table id="data-Table">
          <thead>
            <tr>
              {settingType}
            </tr>
          </thead>
          <tbody>
            {commandObject.map((command) => (
             <div className="raw" key={command.id}>
                <span>{command.name}</span>
             </div>
            ))}
            </tbody>
          </table>
        </div>
      </Grid>
      <Grid xs={0} sm={5} item>
      <span className="textWithLogo">{settingType}</span>
      <div>
      {logo}
        </div>
      </Grid>
    </Grid>
  );
};

export default SettingItemPage;
