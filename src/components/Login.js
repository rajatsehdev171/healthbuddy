import React from 'react';

import { GoogleLogin } from 'react-google-login';
// refresh token
import { refreshTokenSetup } from '../utils/refreshToken';
import { connect } from 'react-redux';
import axios  from 'axios';
import {
  updateLoginResponse,
} from "./redux/reducer";
import { useNavigate } from "react-router-dom";
const clientId =
  '971615762538-n2knhdr6vhijhgm6oleolth4k94njhoi.apps.googleusercontent.com';

const mapDispatchToProps = (dispatch) => {
    return {
      updateLoginResponse: (obj) => dispatch(updateLoginResponse(obj)),
    };
  };

function Login(props) {
  const navigate = useNavigate();
  const loginAsynFunction = async (profileObj) => {
   return await axios.post('https://myhealthbuddyapp.herokuapp.com/auth/login',{'email':profileObj.email})
		.then(response => {
      if(response.data){
        return response.data;
      }
		 
		})
		.catch(error => {
		  console.log(error);
      return error;
		});
  }
  const onSuccess = (res) => {
    refreshTokenSetup(res);
    loginAsynFunction(res.profileObj).then((resolveResponse) => {
      axios.get('https://myhealthbuddyapp.herokuapp.com/api/user', {
        headers: {
          'Authorization': `Bearer ${resolveResponse.token}`
        }
      })
		.then(response => {
      // if(!localStorage.getItem('token')){
        localStorage.setItem('token', resolveResponse.token);
        localStorage.setItem('userDetails', JSON.stringify({...resolveResponse.user,...res.profileObj,...response.data.user}));
        props.updateLoginResponse({isLoggedIn:true, responseObj:{...response.data.user,...resolveResponse.user,...res.profileObj, employeeList:response.data.employeeList,recommendedPlan:response.data.recommendedPlan,dietLink:response.data.link}, token:resolveResponse.token});
      // }
      navigate('/home');
		})
		.catch(error => {
		  console.log(error);
      return error;
		});
   })
   .catch((err) => {
     console.log(err);
     alert('Error Logging In!')
   });
  };

  const onFailure = (res) => {
    console.log('Login failed: res:', res);
    props.updateLoginResponse({isLoggedIn:false, responseObj:null,token:null});
    alert(
      `Failed to login.`
    );
  };

  return (
    <div>
      <GoogleLogin
        clientId={clientId}
        buttonText="Login With Google"
        className='login-btn'
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy={'single_host_origin'}
        style={{ marginTop: '100px' }}
        // isSignedIn={true}
      />
    </div>
  );
}
export default connect(null,mapDispatchToProps)(Login)

