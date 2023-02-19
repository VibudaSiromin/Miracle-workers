import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import ModalDialog from "./components/PopUpWindow";
import Table from "./components/Table";
import { Button } from "react-bootstrap";
import OutputJSON from "./components/OutputJSON";
import Card from "./components/Card";
// import Launcher from "./components/Launcher";
import Setting from "./components/setting section/Settings";
import SettingsItemPage from "./components/setting section/SettingItemPage";
import { BrowserRouter as Router, Route,Switch,Redirect } from "react-router-dom";

const PropsForChainPopUp = {
  enableChainPopUps: true,
  noFields: [3, 7],
  titles: ["Group", "Instruction", "Command", ""],
};

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
        <Route path="/" exact>
          <Table></Table>
        </Route>
        <Route path="/settings" exact>
          <Setting/>
        </Route>
        <Route path="/settings/commands" exact>
          <SettingsItemPage settingType="commands"/>
        </Route>
        <Route path="/settings/browsers" exact>
          <SettingsItemPage settingType="browsers"/>
        </Route>
        <Redirect to="/"/>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
