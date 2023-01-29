import './Card.css'

const Card = () => {

    const listItemStyle={
        //width:"18rem",
        height:"5rem",
        padding:"10px",
        fontSize:"20px",
        color:"white"
    }
    const cardStyle={
        borderRadius:"20px",
        backgroundColor:"#E74C3C",
    }

    return(
        <div className="card" style={cardStyle}>
            <ul className="list-group list-group-flush" >
                <li className="" style={listItemStyle}>JSON</li>
                <li className="" style={listItemStyle}>Dapibus ac facilisis in</li>
                <li className="" style={listItemStyle}>Vestibulum at eros</li>
            </ul>
        </div>
    );
}

export default Card;