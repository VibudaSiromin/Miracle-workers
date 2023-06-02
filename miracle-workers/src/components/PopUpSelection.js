import { propTypes } from "react-bootstrap/esm/Image";
import './PopUpSelection.css';
import { useState ,useEffect} from "react";
import axios from "axios";

const PopUpSelection = (props) => {
    const [instructions,setInstructions]=useState([]);
    const [commandSet,setCommandSet]=useState([]);
    const [swapResult,setSwapResult]=useState([]);
    const [actions,setActions]=useState([]);

    const url="http://localhost:5000/settings/instructions";
    const url2="http://localhost:5000/settings/commands";
    const url3="http://localhost:5000/settings/status";  
    const url4="http://localhost:5000/settings/conditions";

    const getInstruction = () => {
        axios
          .get(url)
          .then((res) => {
            setInstructions(res.data.settingItem); 
            console.log("gft");
          })
          .catch((err) => {
            console.log(err);
          });
      };
    
      const getCommands= () => {
        axios
          .get(url2)
          .then((res) => {
            setCommandSet(res.data.settingItem); 
            console.log("gft");
          })
          .catch((err) => {
            console.log(err);
          });
      };

      const getStatus= () => {
        axios
          .get(url3)
          .then((res) => {
            setSwapResult(res.data.settingItem); 
            console.log("gft");
          })
          .catch((err) => {
            console.log(err);
          });
      };

      const getActions= () => {
        axios
          .get(url4)
          .then((res) => {
            setActions(res.data.settingItem); 
            console.log("gft");
          })
          .catch((err) => {
            console.log(err);
          });
      };

      useEffect(() => {
        getInstruction();
        getCommands();
        getStatus();
        getActions();
      }, []);


    let options=[];
    const InsertDataToSelection = () => {
        if(props.title==='instruction'){
            for (let i = 0; i<instructions.length; i++) {
                options.push(
                    <option value={instructions[i].name}/>
                );
              }
              console.log(options);
        }else if(props.title==='command'){
            for (let i = 0; i<commandSet.length; i++) {
                options.push(
                    <option value={commandSet[i].name}/>
                );
              }
              console.log(options);
        }else if(props.title==='swapResult'){
            for (let i = 0; i<swapResult.length; i++) {
                options.push(
                    <option value={swapResult[i].name}/>
                );
              }
              console.log(options);
        }else if(props.title==='action'){
            for (let i = 0; i<actions.length; i++) {
                options.push(
                    <option value={actions[i].name}/>
                );
              }
              console.log(options);
        }
        
    }

    InsertDataToSelection();


    const inputHandler=(event) => {
        const fieldName = event.target.getAttribute("name");
        const fieldValue = event.target.value;
        const mandatoryFields="";
        console.log(fieldName);
        console.log(fieldValue);
        console.log('sam');
        // if(fieldName=="command"){
        //     switch(fieldValue){
        //         case "Branch.BasedOnData":
        //             mandatoryFields="100";
        //     }
        // }
        if(props.id<=2){
          props.onDataChange(fieldName,fieldValue);
        }else{
          props.onDataChange2(fieldName,fieldValue);
        }
      }

    return(
        <div className="form-group">
            <label for={props.id} className="form-label">{props.title}</label>
                <input type="text" list={props.title} className="form-control" name={props.title} onChange={inputHandler} />            
                <datalist id={props.title}>
                    {options}
                </datalist>
        </div>
    );
}

export default PopUpSelection;