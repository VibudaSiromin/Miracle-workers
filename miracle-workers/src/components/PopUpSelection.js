import { propTypes } from "react-bootstrap/esm/Image";


const PopUpSelection = (props) => {
    const instructionSet=['#recovery','#skip','#screen'];
    const commandSet=['Branch.BasedOnData','Branch.BasedOnData','Branch.OnElementAttribute','Branch.OnElementText','Branch.OnElementValue'];
    let options=[];

    const InsertDataToSelection = () => {
        if(props.title==='instruction'){
            for (let i = 0; i<instructionSet.length; i++) {
                options.push(
                    <option value={instructionSet[i]}></option>
                );
                console.log("Bye");
              }
        }else if(props.title==='command'){
            for (let i = 0; i<commandSet.length; i++) {
                options.push(
                    <option value={commandSet[i]}></option>
                );
                console.log("brook");
              }
        }
        
    }

    InsertDataToSelection();

    return(
        <div className="form-group">
            <label className="form-label">{props.title}</label>
            <input list="browsers" className="form-control" name="browser" id="browser"></input>
                <datalist id="browsers">
                    {options}
                </datalist>
        </div>
    );
}

export default PopUpSelection;