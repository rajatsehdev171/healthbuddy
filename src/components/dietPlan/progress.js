import moment from "moment";
import React, { useEffect, useState } from "react";

import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";

const mapDispatchToProps = (dispatch) => {
  return {};
};

function FitnessProgressBar(props) {
  const navigate = useNavigate();
  const { data } = props;
  const [weeksGoals, setWeekGoals] = useState([]);

  useEffect(() => {
    if(data?.startDate)
    prepareProgress(data?.startDate);
  },[data?.startDate]);

  const prepareProgress = (startDate) => {
    let repeat = data?.numberOfMonths * 4;
    let currentDate = moment(startDate).format("YYYY-MM-DD").toString();
    let weekGoalData = [];
    let adsfsd= getWeeklyTarget();
    for (let index = 1; index <= repeat; index++) {
      let goal = data?.employee?.currentWeight + (getWeeklyTarget() * index);
      let weekData = {
        week: index,
        startDate: currentDate,
        endDate : moment(currentDate).add(1, 'weeks').format("YYYY-MM-DD").toString(),
        status: moment().isSame(moment(currentDate).add(1, 'weeks'), 'week'),
        goal
      }
      currentDate = moment(currentDate).add(1, 'weeks').format("YYYY-MM-DD").toString();
      weekGoalData.push(weekData);
    }
    debugger;
    setWeekGoals(weekGoalData)
  };

  const getWeeklyTarget = () => {
    const newDietFormData = { ...data };
    if (
      newDietFormData?.targetWeight &&
      newDietFormData?.numberOfMonths &&
      newDietFormData?.employee?.currentWeight
    ) {
      const weeklyTargetInGram =
        (newDietFormData?.employee?.currentWeight - newDietFormData?.targetWeight) /
        (parseFloat(newDietFormData?.numberOfMonths) * 4);
      return weeklyTargetInGram.toFixed(2) - (weeklyTargetInGram.toFixed(2) * 2);
    }
    return 0
  };

  return (
    <div className="container">
      <div className="row flex-row pt-1">
        {weeksGoals.length > 1 ?
          weeksGoals.map((weeksGoal, index) => (
            <div className={`col p-0 ${weeksGoal.status}`}>
              <div className="card-header p-0 border border-light">
                <p style={{ fontSize: 12 }} className="m-0">
                  <span> Week : </span>
                  <span className="fw-bold">{weeksGoal.week}</span>
                </p>
                <p style={{ fontSize: 12 }} className="m-0">
                  <span> Start Date : </span>
                  <span className="fw-bold">{weeksGoal.startDate}</span>
                </p>
                <p style={{ fontSize: 12 }} className="m-0">
                  <span> End Date : </span>
                  <span className="fw-bold">{weeksGoal.endDate}</span>
                </p>
                <p style={{ fontSize: 12 }} className="m-0">
                  {index < weeksGoals.length - 1 && <span>Week Goal: </span>}
                  {index == weeksGoals.length - 1 && (
                    <span>Target Weight: </span>
                  )}
                  <span className="fw-bold">{weeksGoal.goal}</span>
                </p>
              </div>
            </div>
          )):<div className="card-header fw-bolder fs-2 border border-light" style={{ color: "navajowhite" }}>Please start the challenge to show the progress</div>}
      </div>
    </div>
  );
}
export default connect(null, mapDispatchToProps)(FitnessProgressBar);
