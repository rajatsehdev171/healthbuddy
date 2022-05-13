import React, { useEffect, useState } from "react";

import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";

const mapDispatchToProps = (dispatch) => {
  return {
  };
};

function Goal(props) {
  const navigate = useNavigate();
  const { data, handleDietFormChange } = props;

  const [goal, setGoal] = useState(data || {});

  useEffect(() => {
    setGoal(data);
  }, [data]);

  const updateDietPlan = (field, value) => {
    if (!field) return;
    handleDietFormChange(field, value);
  };

  return (
    <div className="container">
      <div className="card-header">
        <p className="fw-bold fs-5 text-start">Goal/conditions</p>
        <div className="row flex-row pt-1">
          <div className="col-sm">
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span
                  className="input-group-text"
                  id="inputGroup-sizing-default"
                >
                  Target Weight
                </span>
              </div>
              <input
                type="text"
                className="form-control p-0 pb-0 px-2"
                aria-label="Default"
                disabled={props.isReadOnly}
                name="targetWeight"
                value={goal?.targetWeight || ""}
                onChange={(e) => updateDietPlan(e.target.name, e.target.value)}
                aria-describedby="inputGroup-sizing-default"
              />
            </div>
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span
                  className="input-group-text"
                  id="inputGroup-sizing-default"
                >
                  target Body Fat
                </span>
              </div>
              <input
                type="text"
                className="form-control p-0 pb-0 px-2"
                aria-label="Default"
                disabled={props.isReadOnly}
                name="targetBodyFat"
                value={goal?.targetBodyFat || ""}
                onChange={(e) => updateDietPlan(e.target.name, e.target.value)}
                aria-describedby="inputGroup-sizing-default"
              />
            </div>
          </div>
          <div className="col-sm">
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span
                  className="input-group-text"
                  id="inputGroup-sizing-default"
                >
                  Weekly milestone
                </span>
              </div>
              <input
                type="text"
                className="form-control p-0 pb-0 px-2"
                aria-label="Default"
                disabled={true}
                value={goal?.weeklyMilestone || ""}
                name="weeklyMilestone"
                onChange={(e) => updateDietPlan(e.target.name, e.target.value)}
                aria-describedby="inputGroup-sizing-default"
              />
            </div>
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span
                  className="input-group-text"
                  id="inputGroup-sizing-default"
                >
                  Recommended calories intake
                </span>
              </div>
              <input
                type="text"
                className="form-control p-0 pb-0 px-2"
                aria-label="Default"
                disabled={props.isReadOnly}
                value={goal?.calorieIntake || ""}
                name="calorieIntake"
                onChange={(e) => updateDietPlan(e.target.name, e.target.value)}
                aria-describedby="inputGroup-sizing-default"
              />
            </div>
          </div>
          <div className="col-sm">
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span
                  className="input-group-text"
                  id="inputGroup-sizing-default"
                >
                  Medical conditions
                </span>
              </div>
              <input
                type="text"
                className="form-control p-0 pb-0 px-2"
                aria-label="Default"
                disabled={props.isReadOnly}
                value={goal?.medicalConditions || ""}
                name="medicalConditions"
                onChange={(e) => updateDietPlan(e.target.name, e.target.value)}
                aria-describedby="inputGroup-sizing-default"
              />
            </div>
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span
                  className="input-group-text"
                  id="inputGroup-sizing-default"
                >
                  Food allergies
                </span>
              </div>
              <input
                type="text"
                className="form-control p-0 pb-0 px-2"
                aria-label="Default"
                disabled={props.isReadOnly}
                value={goal?.allergens || ""}
                name="allergens"
                onChange={(e) => updateDietPlan(e.target.name, e.target.value)}
                aria-describedby="inputGroup-sizing-default"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default connect(null, mapDispatchToProps)(Goal);
