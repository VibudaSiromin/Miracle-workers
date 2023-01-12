import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import ModalDialog from "./components/PopUpWindow";
import Table from "./components/Table";
import { Button } from "react-bootstrap";
import OutputJSON from './components/OutputJSON';

const PropsForChainPopUp = {
  enableChainPopUps: true,
  noFields: [3, 7],
  titles: ["Group", "Instruction", "Command", ""],
};

function App() {
  return (
    <div className="App">
      <Table></Table>
      <OutputJSON></OutputJSON>
    </div>
  );
}

export default App;
