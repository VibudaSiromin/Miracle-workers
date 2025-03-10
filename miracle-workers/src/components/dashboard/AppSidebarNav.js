import React, { useContext, useEffect } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { GrAdd, GrDashboard } from "react-icons/gr";
import { AiFillFileAdd } from "react-icons/ai";
import "./AppSidebarNav.css";
import NameAssignModal from "./NameAssignModal";
import { useState, useRef } from "react";
import { CBadge, CNavLink } from "@coreui/react";
import CIcon from "@coreui/icons-react";
import IndexContext from "../../contexts/indexContext";
import { MdDeleteForever, MdModeEdit } from "react-icons/md";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import axios from "axios";
import { useParams } from "react-router-dom";
import MessageBox from "../MessageBox";
import NameRenameModal from "./NameRenameModal";

import {
  cilBell,
  cilCalculator,
  cilChartPie,
  cilCursor,
  cilDescription,
  cilDrop,
  cilNotes,
  cilPencil,
  cilPuzzle,
  cilSpeedometer,
  cilStar,
} from "@coreui/icons";
import { CNavGroup, CNavItem, CNavTitle } from "@coreui/react";

let globleitems;

export const AppSidebarNav = () => {
  const { indexOfSection, setIndexOfSection } = useContext(IndexContext);
  const [locatorPageNames, setLocatorPageNames] = useState([]);
  const [dataPageNames, setDataPageNames] = useState([]);
  const [dataPageName, setDataPageName] = useState(null);
  const [testPageNames, setTestPageNames] = useState([]);
  const [testPageName, setTestPageName] = useState(null);
  const [URLSection, setURLSection] = useState({});
  const [indexOfRenamePage, setIndexOfRenamePage] = useState();
  const dispatch = useDispatch();

  const modalRefD = useRef();
  const modalRefRename = useRef();

  const getLocatorPages = () => {
    axios
      .get("http://localhost:5000/locators")
      .then((res) => {
        setLocatorPageNames(res.data.locatorsPageNames);
        console.log("rooooooo", res.data.locatorsPageNames);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //get available data page names as an array
  const getDataPages = () => {
    axios
      .get("http://localhost:5000")
      .then((res) => {
        setDataPageNames(res.data.dataPageNames);
        console.log("rooooooo", res.data.dataPageNames);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getTestPages = () => {
    console.log("gothum city");
    axios
      .get("http://localhost:5000/testPages")
      .then((res) => {
        const newTestPageNames = res.data.testPageNames;
        console.log("141", newTestPageNames);
        setTestPageNames([...newTestPageNames]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // const getDataPages = () => {
  //   axios
  //   .
  // }

  // const getDataPages=()=>{
  //   axios
  //   .get('http://localhost:5000/data')
  //   .then((res)=>{
  //     setDataPageNames(res.data.dataPageNames);
  //     console.log("rooooooo",res.data.dataPageNames)
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });
  // }

  useEffect(() => {
    console.log("Normandy");
    getLocatorPages();
    getDataPages();
    getTestPages();
  }, []);

  console.log("Hoooo", locatorPageNames);

  const navigate = useNavigate();
  const [items, setItems] = useState([
    {
      component: CNavItem,
      name: "Dashboard",
      to: "/dashboard",
      icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
      badge: {
        color: "info",
      },
    },
    {
      component: CNavItem,
      name: "Home",
      to: "/buttons/buttons",
      icon: <CIcon icon={cilCalculator} customClassName="nav-icon" />,
    },
    {
      component: CNavGroup,
      name: "Test Suite",
      to: "/testSuits",
      icon: <CIcon icon={cilCursor} customClassName="nav-icon" />,
      items: [],
    },
    {
      component: CNavGroup,
      name: "Data",
      icon: <CIcon icon={cilNotes} customClassName="nav-icon" />,
      items: [],
    },
    {
      component: CNavGroup,
      name: "Component",
      icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
      items: [],
    },
    {
      component: CNavGroup,
      name: "Locator",
      icon: <CIcon icon={cilBell} customClassName="nav-icon" />,
      items: [],
    },
    {
      component: CNavItem,
      name: "Setting",
      to: "/settings",
      icon: <CIcon icon={cilCalculator} customClassName="nav-icon" />,
    },
  ]);

  useEffect(() => {
    console.log("mass effect");
    let newArray = [];
    for (let i = 0; i < locatorPageNames.length; i++) {
      newArray.push({
        component: CNavItem,
        name: locatorPageNames[i],
        to: "/locator/" + locatorPageNames[i],
      });
    }
    let newItems = items;
    newItems[5].items = newArray;
    console.log("space", newItems);
    setItems([...newItems]);
  }, [locatorPageNames]); //when locatorPageName changes this useEffect hook will be triggered

  //add data sheet names from the store

  useEffect(() => {
    console.log("mass effect");
    let newArray = [];
    for (let i = 0; i < dataPageNames.length; i++) {
      //routing path will be decided according to the last character of the page name
      //if last character='E' => path = '/dataJunction/dataExcel'
      //if last character='M' => path = '/dataJunction/data'
      if (dataPageNames[i].charAt(dataPageNames[i].length - 1) === "E") {
        newArray.push({
          component: CNavItem,
          name: dataPageNames[i].slice(0, -1),
          to: "/dataJunction/dataExcel/" + dataPageNames[i].slice(0, -1),
        });
      } else if (dataPageNames[i].charAt(dataPageNames[i].length - 1) === "M") {
        newArray.push({
          component: CNavItem,
          name: dataPageNames[i].slice(0, -1),
          to: "/dataJunction/data/" + dataPageNames[i].slice(0, -1),
        });
      }
    }
    let newItems = items;
    newItems[3].items = newArray;
    console.log("space", newItems);
    setItems([...newItems]);
  }, [dataPageNames]);

  useEffect(() => {
    console.log("citadel");
    let newArray = [];
    for (let i = 0; i < testPageNames.length; i++) {
      //routing path will be decided according to the last character of the page name
      //if last character='J' => path = '/testJunction/testJson'
      //if last character='M' => path = '/testJunction/testManual'
      if (testPageNames[i].charAt(testPageNames[i].length - 1) === "J") {
        newArray.push({
          component: CNavItem,
          name: testPageNames[i].slice(0, -1),
          to: "/testJunction/testJson/" + testPageNames[i].slice(0, -1),
        });
      } else if (testPageNames[i].charAt(testPageNames[i].length - 1) === "M") {
        newArray.push({
          component: CNavItem,
          name: testPageNames[i].slice(0, -1),
          to: "/testJunction/testManual/" + testPageNames[i].slice(0, -1),
        });
      }
    }
    let newItems = items;
    newItems[2].items = newArray;
    console.log("space", newItems);
    setItems([...newItems]);
  }, [testPageNames]);

  const pageNameHandler = (fieldValue) => {
    const modifiedItems = items.map((item) => {
      //add new pageName to test suite
      if (indexOfSection === 2) {
        if (item.name === "Test Suite") {
          navigate("/testJunction");
          setTestPageName(fieldValue);
          // item.items.push({
          //   component: CNavItem,
          //   name: fieldValue,
          //   to: '/testSuites/'+fieldValue,
          // })
        }
      } else if (indexOfSection === 3) {
        //add new pageName to Data Section
        if (item.name === "Data") {
          navigate("/dataJunction");
          setDataPageName(fieldValue);
          //   globleitems=items;
          //   item.items.push({
          //   component: CNavItem,
          //   name: fieldValue,
          //   to: '/dataJunction',
          // })
          // .catch((err) => {
          //   console.log(err);
          // });
          axios
            .post("http://localhost:5000/data", { pageName: fieldValue })
            .then((res) => {
              getDataPages();
            })
            .catch((err) => {
              console.log(err);
            });
          // if(item.name==='Data'){
          //   item.items.push({
          //     component: CNavItem,
          //     name: fieldValue,
          //     to: '/data/'+fieldValue,
          //   })
        }
      } else if (indexOfSection === 4) {
        //add new pageName to Component section
        if (item.name === "Component") {
          item.items.push({
            component: CNavItem,
            name: fieldValue,
            to: "/buttons/buttons",
          });
        }
      } else if (indexOfSection === 5) {
        //add new pageName to Locator section
        if (item.name === "Locator") {
          axios
            .post("http://localhost:5000/locators", { pageName: fieldValue })
            .then((res) => {
              getLocatorPages();
            })
            .catch((err) => {
              console.log(err);
            });
        }
      }

      return item;
    });
    setItems([...modifiedItems]);
  };

  ///////////////////////////

  const addDataSheetBasedOnExcel = () => {
    if (dataPageName !== null) {
      console.log("calling from Excel");
      if (indexOfSection === 3) {
        //add new pageName to Data Section

        axios
          .post("http://localhost:5000/dataJunction/dataExcel", {
            pageName: dataPageName + "E",
          })
          .then((res) => {
            getDataPages();
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  };

  const addDataSheetBasedOnManual = () => {
    if (dataPageName !== null) {
      console.log("calling from manual");
      if (indexOfSection === 3) {
        //add new pageName to Data Section

        axios
          .post("http://localhost:5000/dataJunction/data", {
            pageName: dataPageName + "M",
          })
          .then((res) => {
            getDataPages();
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  };

  const addTestSheetBasedOnJson = () => {
    if (testPageName !== null) {
      console.log("calling from Json test");
      if (indexOfSection === 2) {
        //add new pageName to Data Section

        axios
          .post("http://localhost:5000/testJunction/testJson", {
            pageName: testPageName + "J",
          })
          .then((res) => {
            getTestPages();
          })
          .catch((err) => {
            console.log(err);
          });

        // axios
        // .post('http://localhost:5000/testJunction/testJson',{pageName:testPageName+"J"})
        // .then((res)=>{
        //   getTestPages();
        // })
        // .catch((err) => {
        //   console.log(err);
        // });

        // const modifiedItems=items;
        // modifiedItems[3].items.push({
        //   component: CNavItem,
        //   name: dataPageName,
        //   to: '/dataJunction/dataExcel',
        // })
        // setItems([...modifiedItems]);
      }
    }
  };

  const addTestSheetBasedOnManual = () => {
    console.log("Winnn");
    if (testPageName !== null) {
      console.log("calling from manual test");
      if (indexOfSection === 2) {
        //add new pageName to Data Section

        axios
          .post("http://localhost:5000/testJunction/testManual", {
            pageName: testPageName + "M",
          })
          .then((res) => {
            console.log("fightclub");
            getTestPages();
          })
          .catch((err) => {
            console.log(err);
          });

        // const modifiedItems=items;
        // modifiedItems[3].items.push({
        //   component: CNavItem,
        //   name: dataPageName,
        //   to: '/dataJunction/data',
        // })
        // setItems([...modifiedItems]);
      }
    }
  };

  //const myFunctionCalled = useSelector((state) => state.addDataSheetName.myFunctionCalled);
  //console.log('KDK',myFunctionCalled);

  //for data section

  const calledFromExcel = useSelector(
    (state) => state.addDataSheetName.myFunctionCalledExcel
  );
  console.log("KDK", calledFromExcel);

  const calledFromManual = useSelector(
    (state) => state.addDataSheetName.myFunctionCalledManual
  );
  console.log("KDK", calledFromManual);

  const runningConditionForExcel = useSelector(
    (state) => state.addDataSheetName.initialRunningConditionForExcel
  );
  console.log("JDM", runningConditionForExcel);

  const runningConditionForManual = useSelector(
    (state) => state.addDataSheetName.initialRunningConditionForManual
  );
  console.log("Nismo", runningConditionForManual);

  //for testSuite

  const calledFromJsonTest = useSelector(
    (state) => state.addTestSheetName.functionCalledJson
  );
  console.log("KDK", calledFromJsonTest);

  const calledFromManualTest = useSelector(
    (state) => state.addTestSheetName.functionCalledManual
  );
  console.log("KDK", calledFromManualTest);

  const runningConditionForJsonTest = useSelector(
    (state) => state.addTestSheetName.initialRunningConditionForJson
  );
  console.log("JDM", runningConditionForJsonTest);

  const runningConditionForManualTest = useSelector(
    (state) => state.addTestSheetName.initialRunningConditionForManual
  );
  console.log("Nismo", runningConditionForManualTest);

  useEffect(() => {
    if (runningConditionForExcel) {
      addDataSheetBasedOnExcel();
    }
  }, [calledFromExcel]);

  useEffect(() => {
    if (runningConditionForManual) {
      addDataSheetBasedOnManual();
    }
  }, [calledFromManual]);

  useEffect(() => {
    if (runningConditionForJsonTest) {
      addTestSheetBasedOnJson();
    }
  }, [calledFromJsonTest]);

  useEffect(() => {
    if (runningConditionForManualTest) {
      addTestSheetBasedOnManual();
    }
  }, [calledFromManualTest]);

  //////////////////////////

  const pagesDeleteHandler = () => {
    //'to' is an array of characters
    const { to } = URLSection;
    //secondChar is used to identify the type of section
    const secondChar = to[1];
    console.log("NOLAN", to);
    //console.log("NOLANNN",rest);
    console.log("XMEN", secondChar);
    // event.stopPropagation();
    // event.preventDefault();

    const URL = "http://localhost:5000" + to;
    console.log("bliss", URL);
    if (secondChar === "t") {
      console.log("mk4");
      const urlSections = URL.split("/");
      const pageName = urlSections.slice(-1)[0];
      console.log("ronn", urlSections.slice(-1)[0]);

      axios
        .delete("http://localhost:5000/testJunction/testManual/deletePage", {
          params: {
            testPageName: pageName,
          },
        })
        .then((res) => {
          console.log(res);
          getTestPages();
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (secondChar === "d") {
      const urlSections = URL.split("/");
      const pageName = urlSections.slice(-1)[0];
      console.log("ronn", urlSections.slice(-1)[0]);

      axios
        .delete("http://localhost:5000/dataJunction/deletePage", {
          params: {
            dataPageName: pageName,
          },
        })
        .then((res) => {
          console.log(res);
          getDataPages();
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (secondChar === "c") {
      const urlSections = URL.split("/");
      const pageName = urlSections.slice(-1)[0];
      console.log("ronn", urlSections.slice(-1)[0]);

      axios
        .delete("http://localhost:5000/testJunction/testManual/deletePage", {
          params: {
            testPageName: pageName,
          },
        })
        .then((res) => {
          console.log(res);
          getTestPages();
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (secondChar === "l") {
      const urlSections = URL.split("/");
      const pageName = urlSections.slice(-1)[0];
      console.log("ronn", urlSections.slice(-1)[0]);

      axios
        .delete("http://localhost:5000/testJunction/testManual/deletePage", {
          params: {
            testPageName: pageName,
          },
        })
        .then((res) => {
          console.log(res);
          getTestPages();
        })
        .catch((err) => {
          console.log(err);
        });
    }

    // Stop event propagation to the link
    // switch(secondChar){
    //   case 't':

    //   case 'l':
    //     const lengthOfUrl=to.length;
    //     const pageName=to.slice(9,lengthOfUrl);
    //     console.log("Yoooo",pageName);
    //     const url='http://localhost:5000/locators/'+pageName
    //     axios
    //     .delete(url)
    //     .then((res)=>{
    //       getLocatorPages();
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //     });
    //     break;
    //   // case 'd':
    //   //   lengthOfUrl=to.length;
    //   //   pageName=to.slice(6,lengthOfUrl);
    //   //   console.log("Yoooo",pageName);
    //   //   url='http://localhost:5000/data/'+pageName
    //   //   axios
    //   //   .delete(url)
    //   //   .then((res)=>{
    //   //     getDataPages();
    //   //   })
    //   //   .catch((err) => {
    //   //     console.log(err);
    //   //   });
    //   //   break;

    //   case 'c':
    // }
  };

  const alertMsgBoxForDeleting = (event, rest) => {
    event.stopPropagation(); // Stop event propagation to the link
    event.preventDefault();
    setURLSection(rest);
    const { to } = rest;
    const URL = "http://localhost:5000" + to;
    const urlSections = URL.split("/");
    const pageName = urlSections.slice(-1)[0];
    modalRefD.current.log(
      "Are you sure you want to delete " + "'" + pageName + "'" + "?"
    );
  };

  const pagesRenameHandler = () => {
    const { to } = URLSection;
    const URL = "http://localhost:5000" + to;
    const urlSections = URL.split("/");
    if (urlSections[3] === "testJunction") {
      setIndexOfSection(2);
      dispatch({ type: "INITIATE_RENAME_MODAL" });
      //INITIATE_RENAME_MODAL
    } else if (urlSections[3] === "dataJunction") {
      setIndexOfSection(3);
      dispatch({ type: "INITIATE_RENAME_MODAL" });
    } else if (urlSections[3] === "component") {
      setIndexOfSection(4);
      dispatch({ type: "INITIATE_RENAME_MODAL" });
    } else if (urlSections[3] === "locator") {
      setIndexOfSection(5);
      dispatch({ type: "INITIATE_RENAME_MODAL" });
    }
  };

  const alertMsgBoxForRenaming = (event, rest, index) => {
    event.preventDefault();
    event.stopPropagation();
    setURLSection(rest);
    console.log("puma", index);
    setIndexOfRenamePage(index);
    const { to } = rest;
    const URL = "http://localhost:5000" + to;
    const urlSections = URL.split("/");
    const pageName = urlSections.slice(-1)[0];
    modalRefRename.current.log(
      "Do you want to rename " + "'" + pageName + "'" + "?"
    );
  };

  //const modalRef=useRef();
  const initiateNameAssigner = (event, index) => {
    event.stopPropagation(); // Stop event propagation to the link
    setIndexOfSection(index);
    console.log("Warlord: ", index);
    dispatch({ type: "INITIATE_NAME_ASSIGNER" });
    //modalRef.current.log();//initialize child component modal(NameAssignModal) from parent modal(AppSidebarNav)
  };

  const location = useLocation();
  const navLink = (name, icon, badge, index) => {
    console.log("sell", name);
    console.log("In navLink", name);
    console.log("buy", index);
    if (
      name === "Test Suite" ||
      name === "Data" ||
      name === "Component" ||
      name === "Locator"
    ) {
      return (
        <>
          {icon && icon}
          {name && name}
          {badge && (
            <CBadge color={badge.color} className="ms-auto">
              {badge.text}
            </CBadge>
          )}
          <AiFillFileAdd
            color="#CCD8DD"
            style={{ position: "absolute", right: "17%" }}
            onClick={(event) => initiateNameAssigner(event, index)}
          ></AiFillFileAdd>
        </>
      );
    } else {
      return (
        <>
          {icon && icon}
          {name && name}
          {badge && (
            <CBadge color={badge.color} className="ms-auto">
              {badge.text}
            </CBadge>
          )}
          {/* <AiFillFileAdd color="#CCD8DD" onClick={()=>initiateNameAssigner()}></AiFillFileAdd> */}
        </>
      );
    }
  };

  const navItem = (item, index) => {
    console.log("geeshock", item);
    const { component, name, badge, icon, ...rest } = item;
    const Component = component;
    console.log("swiss", component);
    console.log("In navItem", name);
    return (
      <Component
        {...(rest.to &&
          !rest.items && {
            component: NavLink,
          })}
        key={index}
        {...rest}
      >
        {navLink(name, icon, badge, index)}
        {name !== "Dashboard" && name !== "Home" && name !== "Setting" ? (
          <div style={{ position: "absolute", right: "19%" }}>
            <MdModeEdit
              onClick={(event) => alertMsgBoxForRenaming(event, rest, index)}
            ></MdModeEdit>
            <MdDeleteForever
              id="myIcon"
              /*className="delete"*/ onClick={(event) =>
                alertMsgBoxForDeleting(event, rest)
              }
            />
          </div>
        ) : null}
      </Component>
    );
  };

  const navGroup = (item, index) => {
    const { component, name, badge, icon, to, ...rest } = item;
    const Component = component;
    console.log("In navGroup", name);
    return (
      <div className="single-component">
        <Component
          idx={String(index)}
          key={index}
          toggler={navLink(name, icon, badge, index)}
          visible={location.pathname.startsWith(to)}
          {...rest}
        >
          {item.items?.map((item, index) =>
            item.items ? navGroup(item, index) : navItem(item, index)
          )}
        </Component>
      </div>
    );
  };

  console.log("SIM", globleitems);

  return (
    <>
      <React.Fragment>
        {items &&
          items.map((item, index) =>
            item.items ? navGroup(item, index) : navItem(item, index)
          )}
      </React.Fragment>
      <NameAssignModal
        /*ref={modalRef}*/ indexOfSection={indexOfSection}
        newPageName={pageNameHandler}
      ></NameAssignModal>
      <MessageBox
        ref={modalRefRename}
        modalFooterfuncOne={pagesRenameHandler}
        id="pageNameRenameModal"
      ></MessageBox>
      <MessageBox
        ref={modalRefD}
        modalFooterfuncOne={pagesDeleteHandler}
        id="pageNameDeleteModal"
      ></MessageBox>
      <NameRenameModal
        indexOfSection={indexOfSection}
        reloadDataPageNames={getDataPages}
        currentURLSection={URLSection}
        renamePageIndex={indexOfRenamePage}
      ></NameRenameModal>
    </>
  );
};

AppSidebarNav.propTypes = {
  items: PropTypes.arrayOf(PropTypes.any).isRequired,
};

// export default AppSidebarNav;
