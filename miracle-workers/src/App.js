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
import PrivateRoutes from "./PrivateRoute";

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// import Launcher from "./components/Launcher";

// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))

// Pages
const Login = React.lazy(() => import('./views/pages/login/login_component'))
const Register = React.lazy(() => import('./views/pages/login/signup_component'))
const ForgotPassword = React.lazy(() => import('./views/pages/login/reset'))
// const Page404 = React.lazy(() => import('./views/pages/page404/Page404'))
// const Page500 = React.lazy(() => import('./views/pages/page500/Page500'))
const DataJunction = React.lazy(() => import('./views/dataJunction/DataJunction'))

const PropsForChainPopUp = {
  enableChainPopUps: true,
  noFields: [3, 7],
  titles: ["Group", "Instruction", "Command", ""],
};

function App() {
 
  return (
    <div className="App">
       <BrowserRouter>
        <Suspense fallback={loading}>
          <Routes>
            <Route exact path="/login" name="Login Page" element={<Login />} />
            <Route exact path="/sign-up" name="Register Page" element={<Register />} />
            <Route exact path="/reset" name="Forgot Password" element={<ForgotPassword />} />
            {/* <Route exact path="/404" name="Page 404" element={<Page404 />} />
            <Route exact path="/500" name="Page 500" element={<Page500 />} /> */}
            <Route element={<PrivateRoutes/>}>
              <Route exact path="/dataJuction" name="Data section Path" element={<DataJunction />} />
              <Route path="*" name="Home" element={<DefaultLayout />} />              
            </Route>

          </Routes>
        </Suspense>
      </BrowserRouter>
      {/* <Table title={title} noFields={[3, 7]} generalPurpose={false} enableChainPopUps={true}></Table> */}
      {/* <Card cardTitle="Excel" backgroundColor="linear-gradient(180deg, rgba(78, 40, 140, 0.56) 0%, #030007 100%)"></Card>
      <Card cardTitle="Manually" backgroundColor="linear-gradient(180deg, rgba(119, 107, 139, 0.56) 0%, #010002 100%)"></Card> */}
      {/* <Data generalPurpose={true} initialHeading={[]}></Data> */}
      {/* <StickyHeadTable></StickyHeadTable> */}
      {/* <ExcelSection></ExcelSection> */}
      {/* <BasicTable></BasicTable> */}
    </div>
  );
}

export default App;
