import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import ModalDialog from "./components/PopUpWindow";
import Table from "./components/Table";
import { Button } from "react-bootstrap";
import OutputJSON from './components/OutputJSON';
import Card from './components/Card';
import Data from './pages/Data'
import ExcelSection from './pages/Data(Excel)'
import React, { Component, Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './scss/style.scss'
import { IndexContextProvider } from "./contexts/indexContext";

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// import Launcher from "./components/Launcher";

// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))

// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'))
const Register = React.lazy(() => import('./views/pages/register/Register'))
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'))
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'))

const PropsForChainPopUp = {
  enableChainPopUps: true,
  noFields: [3, 7],
  titles: ["Group", "Instruction", "Command", ""],
};

function App() {
 
  return (
    <div className="App">
      <IndexContextProvider>
       <BrowserRouter>
        <Suspense fallback={loading}>
          <Routes>
            <Route exact path="/login" name="Login Page" element={<Login />} />
            <Route exact path="/register" name="Register Page" element={<Register />} />
            <Route exact path="/404" name="Page 404" element={<Page404 />} />
            <Route exact path="/500" name="Page 500" element={<Page500 />} />
            <Route path="*" name="Home" element={<DefaultLayout />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
      {/* <Table title={title} noFields={[3, 7]} generalPurpose={false} enableChainPopUps={true}></Table> */}
      {/* <Card></Card>*/}
      {/* <Data generalPurpose={true} initialHeading={[]}></Data> */}
      {/* <StickyHeadTable></StickyHeadTable> */}
      {/* <ExcelSection></ExcelSection> */}
      {/* <BasicTable></BasicTable> */}
      </IndexContextProvider>
    </div>
  );
}

export default App;
