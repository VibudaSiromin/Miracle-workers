import "./Mapper.css";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { AiOutlineLink } from "react-icons/ai";

const Mapper = (props) => {
  const [arrayOne, setArrayOne] = useState([]);
  const [arrayTwo, setArrayTwo] = useState([]);
  const [dataSheet, setDataSheet] = useState([]);
  const [sectionHeading, setSectionHeading] = useState([]);
  const [selectedDataSheet, setSelectedDataSheet] = useState();
  const [hideDropDown, setHideDropDown] = useState(true);

  const depthLevelOne = () => {
    if (hideDropDown === true) {
      //Unhide first list items
      for (let i = 0; i < dataSheet.length; i++) {
        document.getElementById(dataSheet[i]).style.display = "block";
      }
      //Unhide second list items
      for (let j = 0; j < sectionHeading.length; j++) {
        document.getElementById(sectionHeading[j]).style.display = "block";
      }
      setHideDropDown(false);
    }
    console.log("vision plus");
    console.log("hello", selectedDataSheet);
    axios
      .get("http://localhost:5000/data/getDatasheets")
      .then(function (response) {
        setDataSheet(response.data.dataPageNames);
        console.log("LOL", response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    let listArrayOne = [];
    for (let i = 0; i < dataSheet.length; i++) {
      listArrayOne.push(
        <li className="menu-items">
          <button
            id={dataSheet[i]}
            value={dataSheet[i]}
            onClick={(e) => {
              depthLevelTwo(e);
            }}
          >
            {dataSheet[i]}
          </button>
        </li>
      );
    }
    setArrayOne([...listArrayOne]);
  }, [dataSheet]);

  const depthLevelTwo = (event) => {
    console.log("GG", event.target.value);
    setSelectedDataSheet(event.target.value);
    axios
      .get("http://localhost:5000/data/datasheets/getHeadings", {
        params: {
          dataPageName: event.target.value,
        },
      })
      .then(function (response) {
        setSectionHeading(response.data.getHeadings);
        console.log("OOP123", response.data);
      })
      .catch(function (error) {
        console.log(error);
      });

    console.log("KK", arrayTwo);
  };

  useEffect(() => {
    let listArrayTwo = [];
    for (let i = 0; i < sectionHeading.length; i++) {
      console.log("saman", i);
      listArrayTwo.push(
        <li className="menu-items">
          <button
            id={sectionHeading[i]}
            value={sectionHeading[i]}
            onClick={(e) => {
              addDataReference(e);
            }}
          >
            {sectionHeading[i]}
          </button>
        </li>
      );
    }
    console.log("red bull", listArrayTwo);
    setArrayTwo(listArrayTwo);
    //console.log('petronas',document.getElementById(selectedDataSheet).offsetTop);
  }, [sectionHeading]);

  //use a proper name for the function
  const addDataReference = (e) => {
    console.log(
      "position",
      document.getElementById(selectedDataSheet).getBoundingClientRect().top
    );
    console.log("selected data field value:", e.target.value);
    console.log("this is the second drop down");
    props.selectedHeading(props.browseBtnId, selectedDataSheet, e.target.value);
  };

  document.addEventListener("click", (event) => {
    console.log("lepord");
    //this if condition only trigger for the normal clicks.It does not trigger for btn clicks
    if (event.target.tagName.toLowerCase() !== "button") {
      console.log("inner lepord");
      //Hide first list items
      for (let i = 0; i < dataSheet.length; i++) {
        console.log("trojen", dataSheet[i]);
        if (dataSheet[i] !== null) {
          document.getElementById(dataSheet[i]).style.display = "none";
        }
      }
      //Hide second list items
      for (let j = 0; j < sectionHeading.length; j++) {
        console.log("pompe", sectionHeading[j]);
        if (sectionHeading[j] !== null) {
          document.getElementById(sectionHeading[j]).style.display = "none";
        }
      }
      setHideDropDown(true);
    }
  });

  console.log("SON", document.getElementsByClassName("myUL"));

  const secondListPosition = { top: 0 };

  if (selectedDataSheet !== undefined) {
    secondListPosition.top =
      document.getElementById(selectedDataSheet).getBoundingClientRect().top +
      20;
  }

  console.log("Dragon");

  return (
    <>
      {/* <AiOutlineLink id="dataBrowseBtn" onClick={depthLevelOne} size="30px"></AiOutlineLink> */}
      <button id="dataBrowseBtn" onClick={depthLevelOne}>
        Browse
      </button>
      <ul className="myUL">{arrayOne}</ul>
      {selectedDataSheet !== undefined ? (
        <ul className="myUL2" style={secondListPosition}>
          {arrayTwo}
        </ul>
      ) : (
        <></>
      )}
    </>
  );
};

export default Mapper;
