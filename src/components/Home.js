import React from "react";
import { connect } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import axios from "axios";
import { updateLoginResponse } from "./redux/reducer";
import { useNavigate } from "react-router-dom";
import Logout from "./Logout";

const mapStateToProps = (state) => {
  return {
    loginResponse: state.loginResponse,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateLoginResponse: (obj) => dispatch(updateLoginResponse(obj)),
  };
};

function Home(props) {
  const navigate = useNavigate();
  const navigateUser = (uri) => {
    if (!uri) return;
    navigate(uri);
  };

  return (
    <div className="container">
       <Logout/>
      <div className="card-header">
        <p className="fw-light fs-4">
          "The food you eat can be either the safest and most powerful form of
          medicine or the slowest form of poison."
        </p>
        <p className="fw-bold fs-5">
          So let’s talk about how food affects your mood and what you should
          include in your diet
        </p>
      </div>
      <div className="card-header">
        <div className="row flex-row pt-1">
          <div className="col-sm">
            <div
              className="card-header fw-bold"
              style={{ height: "200px", color: "white", cursor: "pointer" }}
              onClick={(e) => navigateUser("/user-dashboard")}
            >
              {/* <NavLink to="/user-dashboard">Generate Diet Plan For Me</NavLink> */}
              Generate Diet Plan For Me
            </div>
          </div>
          <div className="col-sm">
            <div
              className="card-header fw-bold"
              style={{ height: "200px", color: "white", cursor: "pointer" }}
              onClick={(e) =>
                navigateUser(`/view-plan/${props?.loginResponse?.responseObj?._id || ''}`)
              }
            >
              View My Diet Plan
              {/* <NavLink to="/view-plan/627ba574831d4a2d19e56f6f">View My Diet Plan</NavLink> */}
            </div>
          </div>
          {props?.loginResponse?.responseObj?.isHR && (
             <div className="col-sm">
             <div
               className="card-header fw-bold"
               style={{ height: "200px", color: "white", cursor: "pointer" }}
               onClick={(e) =>
                 navigateUser("/hr-page")
               }
             >
               HR Actions
               {/* <NavLink to="/view-plan/627ba574831d4a2d19e56f6f">View Submitted Fitness</NavLink> */}
             </div>
           </div>
          )}
        </div>
      </div>
    </div>
  );
}
export default connect(mapStateToProps, mapDispatchToProps)(Home);
