import React from "react";
import Login from "./Login";
import { connect } from "react-redux";


const mapStateToProps = (state) => {
    return {
      loginResponse: state.loginResponse,
    };
  };
  

const LoginForm = (props) =>{
  console.log(props.loginResponse); 
    return(
      <div id="loginform">
       <div id="alternativeLogin">
            <label className="login-heading">Sign In To Health Buddy App</label>
            <div id="iconGroup">
            <Login />
            </div>
        </div>
      </div>
    )
}

export default connect(mapStateToProps)(LoginForm)



