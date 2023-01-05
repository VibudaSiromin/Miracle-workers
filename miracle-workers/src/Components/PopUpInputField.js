const PopUpInputField = (props) => {
    return(
        <div className="form-group">
            <label>{props.title}</label>
            <input type={props.inputType} className="form-control"></input>
        </div>
    );
}

export default PopUpInputField