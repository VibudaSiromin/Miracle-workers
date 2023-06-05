import { type } from "@testing-library/user-event/dist/type";
import React, {Component} from "react";

export default class Reset extends Component {
constructor(props){
    super(props);
    this.state = {
        email: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
}
handleSubmit(e){
    e.preventDefault();
    const {email} = this.state;
    console.log(email);
    fetch("http://localhost:5000/forgot-password ",{
        method: "POST",
        crossDomain: true,
        headers: {
           "content-Type":"application/json",
            Accept :"application/json",
           "Access-Control-Allow-Origin":"*",
        },
        body:JSON.stringify({
            email,
        }),
    })
    .then((res)=>res.json())
    .then((data)=>{
        console.log(data,"userRegister");
        alert(data.status);
    });
}
render(){
    return(
        <div className="forgot-wrapper">
         <div className="forgot-inner">
            <form onSubmit={this.handleSubmit}>
              <h3>Forgot Password</h3>
                  <div className="mb-3">
                      <label>Email address</label>
                            <input
                                type="email"
                                className="form-control"
                                 placeholder="Enter Email"
            onChange={(e)=>this.setState({email:e.target.value})}/>
        </div>
        <div className="d-grid">
            <button type="submit" className="btn btn-primary">
                submit
            </button>
        </div>
        <p className="forgot-password text-right">
            <a href="/sign-up">sign up</a>
        </p>
        </form>
        </div>
        </div>
    );
}

}