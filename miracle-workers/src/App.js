import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import ModalDialog from "./components/PopUpWindow";
import Table from "./components/Table";
import { Button } from "react-bootstrap";
import OutputJSON from './components/OutputJSON';
import Card from './components/Card';
import Data from './pages/Data'
import ExcelSection from './pages/Data(Excel)'
import { BrowserRouter as Router, Navigate, Route,Routes } from "react-router-dom";
import Locator from "./components/Locator-section/Locator";

// import Launcher from "./components/Launcher";

const PropsForChainPopUp = {
  enableChainPopUps: true,
  noFields: [3, 7],
  titles: ["Group", "Instruction", "Command", ""],
};

function App() {
 const title=[
    "group",
    "instruction",
    "command",
    "locator",
    "locatorParameter",
    "data",
    "swapResult",
    "branchSelection",
    "action",
    "comment",
  ]
  return (
    <div className="App">
      {/* <Table title={title} noFields={[3, 7]} generalPurpose={false} enableChainPopUps={true}></Table> */}
      {/* <Card></Card>*/}
      {/* <Data generalPurpose={true} initialHeading={[]}></Data> */}
      {/* <StickyHeadTable></StickyHeadTable> */}
     
      {/* <BasicTable></BasicTable> */}
      <Router>
        <Routes>
          <Route path="/" element={ <ExcelSection/>} exact>
          </Route>
          <Route path="/locators"  element={<Locator/>} exact>
          </Route>
        </Routes>
    </Router>
    </div>
  );
}

export default App;
