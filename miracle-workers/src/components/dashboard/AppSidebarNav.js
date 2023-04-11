import React,{useContext,useEffect} from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import PropTypes from 'prop-types'
import { GrAdd, GrDashboard } from 'react-icons/gr'
import {AiFillFileAdd} from 'react-icons/ai';
import './AppSidebarNav.css'
import NameAssignModal from './NameAssignModal';
import { useState,useRef } from 'react';
import { CBadge, CNavLink } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import IndexContext from '../../contexts/indexContext';
import {MdDeleteForever} from 'react-icons/md';
import axios from 'axios';

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
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

export const AppSidebarNav = () => {
  const {indexOfSection,setIndexOfSection}=useContext(IndexContext);
  const [locatorPageNames,setLocatorPageNames]=useState([])

  const getLocatorPages=()=>{
    axios
    .get('http://localhost:5000/locators')
    .then((res)=>{
      setLocatorPageNames(res.data.locatorsPageNames);
      console.log("rooooooo",res.data.locatorsPageNames)
    })
    .catch((err) => {
      console.log(err);
    });
  }

  useEffect(() => {
    getLocatorPages();
  }, []);

  console.log("Hoooo",locatorPageNames)

  const [items,setItems]=useState(
    [
      {
        component: CNavItem,
        name: 'Dashboard',
        to: '/dashboard',
        icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
        badge: {
          color: 'info',
        },
      },
      {
        component: CNavItem,
        name: 'Home',
        to: '/buttons/buttons',
        icon: <CIcon icon={cilCalculator} customClassName="nav-icon" />,
      },
      {
        component: CNavGroup,
        name: 'Test Suite',
        to: '/testSuits',
        icon: <CIcon icon={cilCursor} customClassName="nav-icon" />,
        items: [],
      },
      {
        component: CNavGroup,
        name: 'Data',
        icon: <CIcon icon={cilNotes} customClassName="nav-icon" />,
        items: [],
      },
      {
        component: CNavGroup,
        name: 'Component',
        icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
        items: [],
      },
      {
        component: CNavGroup,
        name: 'Locator',
        icon: <CIcon icon={cilBell} customClassName="nav-icon" />,
        items: [],
      },
      {
        component: CNavItem,
        name: 'Setting',
        to: '/settings',
        icon: <CIcon icon={cilCalculator} customClassName="nav-icon" />,
      },
      // {
      //   component: CNavTitle,
      //   name: 'Extras',
      // },
      // {
      //   component: CNavGroup,
      //   name: 'Pages',
      //   icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
      //   items: [
      //     {
      //       component: CNavItem,
      //       name: 'Login',
      //       to: '/login',
      //     },
      //     {
      //       component: CNavItem,
      //       name: 'Register',
      //       to: '/register',
      //     },
      //     {
      //       component: CNavItem,
      //       name: 'Error 404',
      //       to: '/404',
      //     },
      //     {
      //       component: CNavItem,
      //       name: 'Error 500',
      //       to: '/500',
      //     },
      //   ],
      // },
      // {
      //   component: CNavItem,
      //   name: 'Docs',
      //   href: 'https://coreui.io/react/docs/templates/installation/',
      //   icon: <CIcon icon={cilDescription} customClassName="nav-icon" />,
      // },
    ]
  );

  useEffect(()=>{
    let newArray=[];
    for(let i=0;i<locatorPageNames.length;i++){
      newArray.push({
        component: CNavItem,
        name: locatorPageNames[i],
        to: '/locator/'+locatorPageNames[i],        
      })
    }
    let newItems=items;
    newItems[5].items=newArray;
    console.log("Hoooo",newItems)
    setItems(newItems)
  },[locatorPageNames])

  // updating items

  const pageNameHandler = (fieldValue) => {
    const modifiedItems=items.map(item=>{
      //add new pageName to test suite
      if(indexOfSection===2){
        if(item.name==='Test Suite'){
          item.items.push({
            component: CNavItem,
            name: fieldValue,
            to: '/testSuites/'+fieldValue,
          })
        }
        
      }else if(indexOfSection===3){//add new pageName to Data Section
        if(item.name==='Data'){
          item.items.push({
            component: CNavItem,
            name: fieldValue,
            to: '/data/'+fieldValue,
          })
        }
      }else if(indexOfSection===4){//add new pageName to Component section
        if(item.name==='Component'){
          item.items.push({
            component: CNavItem,
            name: fieldValue,
            to: '/buttons/buttons',
          })
        }
      }else if(indexOfSection===5){//add new pageName to Locator section
        if(item.name==='Locator'){
          axios
          .post('http://localhost:5000/locators',{pageName:fieldValue})
          .then((res)=>{
            getLocatorPages();
          })
          .catch((err) => {
            console.log(err);
          });
          // item.items.push({
          //   component: CNavItem,
          //   name: fieldValue,
          //   to: '/locator/'+fieldValue,
          // })
        }
      }

      return item;
    });
    setItems([...modifiedItems]);
  }

  const pagesDeleteHandler=(rest) => {
    const {to}=rest
    //secondChar is used to identify the type of section
    const secondChar=to[1];
    switch(secondChar){
      case 't':

      case 'l':
        const lengthOfUrl=to.length
        const pageName=to.slice(9,lengthOfUrl);
        console.log("Yoooo",pageName);
        const url='http://localhost:5000/locators/'+pageName
        axios
        .delete(url)
        .then((res)=>{
          getLocatorPages();
        })
        .catch((err) => {
          console.log(err);
        });
        break;
      case 'd':

      case 'c':
    }
  }

  const modalRef=useRef();
  const initiateNameAssigner= (index) => {
    console.log("goooooooooo",indexOfSection)
    setIndexOfSection(index);
    console.log('Warlord: ',index);
    modalRef.current.log();//initialize child component modal(NameAssignModal) from parent modal(AppSidebarNav)
}

  const location = useLocation()
  const navLink = (name, icon, badge) => {
    return (
      <>
        {icon && icon}
        {name && name}
        {badge && (
          <CBadge color={badge.color} className="ms-auto">
            {badge.text}
          </CBadge>
        )}
      </>
    )
  }

  const navItem = (item, index) => {
    const { component, name, badge, icon, ...rest } = item
    const Component = component
    return (
      <Component
        {...(rest.to &&
          !rest.items && {
            component: NavLink,
          })}
        key={index}
        {...rest}
      >
        {navLink(name, icon, badge)}
        {(name!=="Dashboard")&&(name!="Home")&&(name!=="Setting")? <MdDeleteForever className="delete" onClick={()=>pagesDeleteHandler(rest)}/>:null}  
      </Component>
    )
  }
  
  const navGroup = (item, index) => {
    const { component, name, icon, to, ...rest } = item
    const Component = component
    return (
      <div className="Component">
        <div className="single-component">
        <Component
          idx={String(index)}
          key={index}
          toggler={navLink(name, icon)}
          visible={location.pathname.startsWith(to)}
          {...rest}
        >
          {item.items?.map((item, index) =>
            item.items ? navGroup(item, index) : navItem(item, index),
          )}
        </Component>
        </div>
        <div className="add-btn">
        <AiFillFileAdd color="#CCD8DD" onClick={()=>initiateNameAssigner(index)}></AiFillFileAdd>
        </div>
      </div>
    )
  }

  return (
    <>
    <React.Fragment>
      {items &&
        items.map((item, index) => (item.items ? navGroup(item, index) : navItem(item, index)))}
    </React.Fragment>
    <NameAssignModal ref={modalRef} indexOfSection={indexOfSection} newPageName={pageNameHandler}></NameAssignModal>
    </>
  )
}

AppSidebarNav.propTypes = {
  items: PropTypes.arrayOf(PropTypes.any).isRequired,
}
