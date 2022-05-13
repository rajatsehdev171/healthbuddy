import React from "react";

import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";

const mapDispatchToProps = (dispatch) => {
  return {
  };
};

function PersonalDetails(props) {
  const navigate = useNavigate();
  const {data} = props;
  return (
    <div className="container">
      <div className="card-header">
        <p className="fw-bold fs-5 text-start">Personal Details</p>
        <div className="row flex-row pt-1">
          <div className="col-sm">
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text" id="inputGroup-sizing-default">
                  Current Weight
                </span>
              </div>
              <input
                type="text"
                className="form-control p-0 pb-0 px-2"
                aria-label="Default"
                disabled={props.isReadOnly}
                value={data?.currentWeight || ''}
                aria-describedby="inputGroup-sizing-default"
              />
            </div>
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text" id="inputGroup-sizing-default">
                  Current Body Fat
                </span>
              </div>
              <input
                type="text"
                className="form-control p-0 pb-0 px-2"
                aria-label="Default"
                disabled={props.isReadOnly}
                value={data?.bodyFat || ''}
                aria-describedby="inputGroup-sizing-default"
              />
            </div>
          </div>
          <div className="col-sm">
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text" id="inputGroup-sizing-default">
                  Age
                </span>
              </div>
              <input
                type="text"
                className="form-control p-0 pb-0 px-2"
                aria-label="Default"
                disabled={props.isReadOnly}
                value={data?.age || ''}
                aria-describedby="inputGroup-sizing-default"
              />
            </div>
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text" id="inputGroup-sizing-default">
                  Gender
                </span>
              </div>
              <input
                type="text"
                className="form-control p-0 pb-0 px-2"
                aria-label="Default"
                disabled={props.isReadOnly}
                value={data?.gender || data?.sex || ''}
                aria-describedby="inputGroup-sizing-default"
              />
            </div>
          </div>
          <div className="col-sm">
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text" id="inputGroup-sizing-default">
                  Maintenance calories
                </span>
              </div>
              <input
                type="text"
                className="form-control p-0 pb-0 px-2"
                aria-label="Default"
                disabled={props.isReadOnly}
                value={data?.maintenanceCalories || ''}
                aria-describedby="inputGroup-sizing-default"
              />
            </div>
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text" id="inputGroup-sizing-default">
                  Activity level
                </span>
              </div>
              <input
                type="text"
                className="form-control p-0 pb-0 px-2"
                aria-label="Default"
                disabled={props.isReadOnly}
                value={data?.activity || ''}
                aria-describedby="inputGroup-sizing-default"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default connect(null, mapDispatchToProps)(PersonalDetails);
