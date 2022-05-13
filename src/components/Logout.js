import React from 'react';
import { GoogleLogout } from 'react-google-login';
import {
  updateLoginResponse,
} from "./redux/reducer";
import { useNavigate } from "react-router-dom";
import { connect, useSelector } from 'react-redux';
const clientId =
'971615762538-n2knhdr6vhijhgm6oleolth4k94njhoi.apps.googleusercontent.com';

const mapDispatchToProps = (dispatch) => {
  return {
    updateLoginResponse: (obj) => dispatch(updateLoginResponse(obj)),
  };
};
function Logout(props) {
  const navigate = useNavigate();
  const loginResponse = useSelector(({ loginResponse }) => loginResponse);
  const onSuccess = () => {
    console.log('Logout made successfully');
    // alert('Logout made successfully ✌');
    navigate("/");
    localStorage.removeItem('token');
    localStorage.removeItem('userDetails');
    props.updateLoginResponse({isLoggedIn:false, responseObj:null});
  };

  return (
    <div className="my-3 text-end mx-3">
      {loginResponse?.responseObj?.imageUrl && <><img className="profile-image" src={loginResponse?.responseObj?.imageUrl} /><span className="heading-title">Health Buddy</span></>}
      <GoogleLogout
        clientId={clientId}
        className="logout-btn"
        buttonText="Logout"
        onLogoutSuccess={onSuccess}
      ></GoogleLogout>
    </div>
  );
}

export default connect(null,mapDispatchToProps)(Logout);
