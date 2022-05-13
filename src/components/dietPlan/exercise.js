import React, { useEffect, useState } from "react";

import { connect } from "react-redux";
import { getLoginResponse } from "../redux/reducer";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

const mapDispatchToProps = (dispatch) => {
  return {
  };
};

function Exercise(props) {
  const navigate = useNavigate();
  const [exercises, setExercise] = useState([]);

  useEffect(() => {
    setExercise(props?.data?.exercisePlan);
  }, [props?.data?.exercisePlan]);

  const addOrRemoveExercise = (index) => {
    if(index) {
      const newExerciseData = [...exercises];
      newExerciseData.splice(index, 1);
      setExercise(newExerciseData);
      return;
    }
    const exercise = {
      name: "",
      duration: "",
      url: "",
    }
    const newExercises = [...exercises, exercise];
    setExercise(newExercises);
    window.scrollTo(0, 99999);
  }

  const updateExercise = (field, value, index) => {
    const newExerciseData = [...exercises];
    newExerciseData[index][field] = value;
    // setExercise(newExerciseData);
    props.handleDietFormChange('exercisePlan', newExerciseData)
  }

  return (
    <div className="container">
      <div className="card-header">
        <p className="fw-bold fs-5 text-start">Exercise</p>
        {exercises.length>0 && exercises.map((exercise, index) => <div className="row flex-row pt-1">
          <div className="col-sm">
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text" id="inputGroup-sizing-default">
                  Exercise Name
                </span>
              </div>
              <input
                type="text"
                className="form-control p-0 pb-0 px-2"
                name={'type'}
                value={exercise.type}
                onChange={e=>updateExercise(e.target.name, e.target.value, index)}
                aria-label="Default"
                disabled={props.isReadOnly}
                aria-describedby="inputGroup-sizing-default"
              />
            </div>
          </div>
          <div className="col-sm">
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text" id="inputGroup-sizing-default">
                  Duration/Any other info
                </span>
              </div>
              <input
                type="text"
                className="form-control p-0 pb-0 px-2"
                aria-label="Default"
                disabled={props.isReadOnly}
                name={'duration'}
                value={exercise.duration}
                onChange={e=>updateExercise(e.target.name, e.target.value, index)}
                aria-describedby="inputGroup-sizing-default"
              />
            </div>
          </div>
          <div className="col-sm">
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text" id="inputGroup-sizing-default">
                  Reference link
                </span>
              </div>
              <input
                type="text"
                className="form-control p-0 pb-0 px-2"
                aria-label="Default"
                disabled={props.isReadOnly}
                name={'url'}
                value={exercise.url}
                onChange={e=>updateExercise(e.target.name, e.target.value, index)}
                aria-describedby="inputGroup-sizing-default"
              />
               { !props.isReadOnly && index < exercises.length - 1 && index > 0 && <Button style={{width: '30px'}} onClick={e=>addOrRemoveExercise(index)}>-</Button>}
               { !props.isReadOnly && index == exercises.length - 1 && <Button style={{width: '30px'}} onClick={e=>addOrRemoveExercise()}>+</Button>}
            </div>
          </div>
        </div>)}
      </div>
    </div>
  );
}
export default connect(null, mapDispatchToProps)(Exercise);
