import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import React, { Component, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./scss/style.scss";
import { IndexContextProvider } from "./contexts/indexContext";

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
);

// import Launcher from "./components/Launcher";

// Containers
const DefaultLayout = React.lazy(() => import("./layout/DefaultLayout"));

// Pages
const Login = React.lazy(() => import("./views/pages/login/login_component"));
const Register = React.lazy(() =>
  import("./views/pages/login/signup_component")
);
const ForgotPassword = React.lazy(() => import("./views/pages/login/reset"));
const TwoFA = React.lazy(() => import("./views/pages/two-fa/index"));
const ResetPassword = React.lazy(() =>
  import("./views/pages/reset-password/index")
);

// const Page404 = React.lazy(() => import('./views/pages/page404/Page404'))
// const Page500 = React.lazy(() => import('./views/pages/page500/Page500'))
const DataJunction = React.lazy(() =>
  import("./views/dataJunction/DataJunction")
);

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
              <Route
                exact
                path="/login"
                name="Login Page"
                element={<Login />}
              />
              <Route
                exact
                path="/sign-up"
                name="Register Page"
                element={<Register />}
              />
              <Route
                exact
                path="/reset"
                name="Forgot Password"
                element={<ForgotPassword />}
              />
              <Route exact path="/two-fa" name="Two FA" element={<TwoFA />} />
              <Route
                exact
                path="/reset-password"
                name="Reset Password"
                element={<ResetPassword />}
              />

              {/* <Route exact path="/404" name="Page 404" element={<Page404 />} />
            <Route exact path="/500" name="Page 500" element={<Page500 />} /> */}
              <Route
                exact
                path="/dataJuction"
                name="Data section Path"
                element={<DataJunction />}
              />
              <Route path="*" name="Home" element={<DefaultLayout />} />
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
      </IndexContextProvider>
    </div>
  );
}

export default App;
