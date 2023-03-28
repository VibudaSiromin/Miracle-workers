import React from 'react'
import { NavLink, useLocation,useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types'
import { GrAdd } from 'react-icons/gr'
import {AiFillFileAdd} from 'react-icons/ai';
import './AppSidebarNav.css'
import NameAssignModal from './NameAssignModal';
import { useState,useRef } from 'react';
import { CBadge } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {configureStore} from 'redux'

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

  let globleitems;

 export const AppSidebarNav = () => {
  const [indexOfSection,setIndexOfSection]=useState();
  const navigate = useNavigate();
  const [items,setItems]=useState(
    [
      {
        component: CNavItem,
        name: 'Dashboard',
        to: '/dashboard',
        icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
        badge: {
          color: 'info',
          text: 'NEW',
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
        to: '/buttons/buttons',
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
        to: '/widgets',
        icon: <CIcon icon={cilCalculator} customClassName="nav-icon" />,
        badge: {
          color: 'info',
          text: 'NEW',
        },
      },
    ]
  );


  const waitForResponse = () => {
  //   return new Promise.all((resolve,reject)=>{
  //     setTimeout(()=>{
  //         resolve();
  //     }, 3000);
  // });
  }

  //////////////////////////////
  //updating items

  const pageNameHandler =(fieldValue) => {
    const modifiedItems=items.map((item)=>{
      //add new pageName to test suite
      if(indexOfSection===2){
        if(item.name==='Test Suite'){
          item.items.push({
            component: CNavItem,
            name: fieldValue,
            to: '/testSuites',
          })
        }
        
      }else if(indexOfSection===3){//add new pageName to Data Section
        if(item.name==='Data'){
            navigate('/dataJunction');
            globleitems=items;
            item.items.push({
            component: CNavItem,
            name: fieldValue,
            to: '/dataJunction',
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
          item.items.push({
            component: CNavItem,
            name: fieldValue,
            to: '/buttons/buttons',
          })
        }
      }

      return item;
    });

    setItems([...modifiedItems]);

  }

  /////////////////////////////

  const modalRef=useRef();
  const initiateNameAssigner= (index) => {
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
        < AiFillFileAdd color="#CCD8DD" onClick={()=>initiateNameAssigner(index)}></AiFillFileAdd>
        </div>
      </div>
    )
  }

  console.log('SIM',globleitems);

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

// export default AppSidebarNav;