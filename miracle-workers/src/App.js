import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import ModalDialog from "./components/PopUpWindow";
import Table from "./components/Table";
import { Button } from "react-bootstrap";

const PropsForChainPopUp = {
  enableChainPopUps: true,
  noFields: [3, 7],
  titles: ["Group", "Instruction", "Command", ""],
};
// const print=(event) => {
//   event.preventDefault();
//   console.log("Hellooooooooooooooo");
// }
function App() {
  return (
    <div className="App">
      <Table></Table>
      {/* <form onSubmit={print}>
      <Button type="submit">Submit</Button>
      </form> */}

      {/* <ModalDialog
        enableChainPopUps={true}
        title={[
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
        ]}
        noFields={[3, 7]}
      ></ModalDialog> */}
    </div>
  );
}

export default App;
