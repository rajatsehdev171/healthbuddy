import React, { useEffect, useState } from "react";

import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";

const mapDispatchToProps = (dispatch) => {
  return {
  };
};

function DietRecommendation(props) {
  const navigate = useNavigate();

  const { data, handleDietFormChange } = props;

  const [dietPlan, setDietPlan] = useState({});

  useEffect(() => {
    setDietPlan(data?.dietPlan);
  }, [data?.dietPlan]);

  const updateDietPlan = (field, value, isFirstLevel) => {
    if(isFirstLevel){
      handleDietFormChange(field, value)
      return;
    }
    const newDietPlanData = {...dietPlan};
    newDietPlanData[field] = value;
    // setDietPlan(newDietPlanData);
    handleDietFormChange('dietPlan', newDietPlanData)
  }

  return (
    <div className="container">
    <div className="card-header">
          <p className="fw-bold fs-5 text-start">Diet Plan/Recommendations</p>
      <div className="row flex-row pt-1">
        <div className="col-sm">
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text" id="inputGroup-sizing-default">
                Breakfast
              </span>
            </div>
            <input
              type="text"
              className="form-control p-0 pb-0 px-2"
              aria-label="Default"
              disabled={props.isReadOnly}
              name="breakfast"
              value={data?.dietPlan?.breakfast || ''}
              onChange={e=>updateDietPlan(e.target.name, e.target.value)}
              aria-describedby="inputGroup-sizing-default"
            />
          </div>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text" id="inputGroup-sizing-default">
                Morning snack
              </span>
            </div>
            <input
              type="text"
              className="form-control p-0 pb-0 px-2"
              aria-label="Default"
              disabled={props.isReadOnly}
              name="morningSnack"
              value={data?.dietPlan?.morningSnack || ''}
              onChange={e=>updateDietPlan(e.target.name, e.target.value)}
              aria-describedby="inputGroup-sizing-default"
            />
          </div>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text" id="inputGroup-sizing-default">
                Lunch
              </span>
            </div>
            <input
              type="text"
              className="form-control p-0 pb-0 px-2"
              aria-label="Default"
              disabled={props.isReadOnly}
              name="lunch"
              value={data?.dietPlan?.lunch || ''}
              onChange={e=>updateDietPlan(e.target.name, e.target.value)}
              aria-describedby="inputGroup-sizing-default"
            />
          </div>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text" id="inputGroup-sizing-default">
                Evening snack
              </span>
            </div>
            <input
              type="text"
              className="form-control p-0 pb-0 px-2"
              aria-label="Default"
              disabled={props.isReadOnly}
              name="eveningSnack"
              value={data?.dietPlan?.eveningSnack || ''}
              onChange={e=>updateDietPlan(e.target.name, e.target.value)}
              aria-describedby="inputGroup-sizing-default"
            />
          </div>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text" id="inputGroup-sizing-default">
                Dinner
              </span>
            </div>
            <input
              type="text"
              className="form-control p-0 pb-0 px-2"
              aria-label="Default"
              disabled={props.isReadOnly}
              name="dinner"
              value={data?.dietPlan?.dinner || ''}
              onChange={e=>updateDietPlan(e.target.name, e.target.value)}
              aria-describedby="inputGroup-sizing-default"
            />
          </div>
        </div>
        <div className="col-sm">
        <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text" id="inputGroup-sizing-default">
                Number of months
              </span>
            </div>
            <input
              type="number"
              className="form-control p-0 pb-0 px-2"
              aria-label="Default"
              disabled={props.isReadOnly}
              name="numberOfMonths"
              value={data?.numberOfMonths || ''}
              onChange={e=>updateDietPlan(e.target.name, e.target.value, true)}
              aria-describedby="inputGroup-sizing-default"
            />
          </div>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text" id="inputGroup-sizing-default">
                Walk (Steps)
              </span>
            </div>
            <input
              type="number"
              className="form-control p-0 pb-0 px-2"
              aria-label="Default"
              disabled={props.isReadOnly}
              name="walk"
              value={data?.walk || ''}
              onChange={e=>updateDietPlan(e.target.name, e.target.value, true)}
              aria-describedby="inputGroup-sizing-default"
            />
          </div>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text" id="inputGroup-sizing-default">
                Drinks (Glasses of water)
              </span>
            </div>
            <input
              type="number"
              className="form-control p-0 pb-0 px-2"
              aria-label="Default"
              disabled={props.isReadOnly}
              name="waterIntake"
              value={data?.waterIntake || ''}
              onChange={e=>updateDietPlan(e.target.name, e.target.value, true)}
              aria-describedby="inputGroup-sizing-default"
            />
          </div>
        </div>
        </div>
      </div>
    </div>
  );
}
export default connect(null, mapDispatchToProps)(DietRecommendation);
