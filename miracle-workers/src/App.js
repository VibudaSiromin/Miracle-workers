import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import ModalDialog from './Components/PopUpWindow';

const PropsForChainPopUp={
  enableChainPopUps:true,
  noFields:[3,7],
  titles:['Group','Instruction','Command','']
}

function App() {

  return (
    <div className="App">
      <ModalDialog  enableChainPopUps={true} title={['Group','Instruction','Command','Locator','Locator Parameter','Data','Swap Result','Branch Selection','Actions','Comments']} noFields={[3,7]}></ModalDialog>
      
    </div>
  );
}

export default App;
