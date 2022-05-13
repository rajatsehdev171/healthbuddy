import React, { useEffect, useState } from "react";

import { connect } from "react-redux";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import DietRecommendation from "./dietPlan/dietRecommendation";
import Goal from "./dietPlan/goal";
import Exercise from "./dietPlan/exercise";
import PersonalDetails from "./dietPlan/personalDetails";
import { Button } from "react-bootstrap";
import {
  getEmpPublicInfo,
  saveOrUpdateDietForm,
} from "../services/dietService";

const mapDispatchToProps = (dispatch) => {
  return {
  };
};

function DietPlan(props) {
  const navigate = useNavigate();
  const { empId } = useParams();

  const [dietForm, setDietForm] = useState({
    employee: {},
    targetWeight: 0,
    targetBodyFat: 0,
    weeklyMilestone: 0,
    calorieIntake: 0,
    medicalConditions: "",
    allergens: "",
    walk: 0,
    waterIntake: 0,
    dietPlan: {
      breakfast: "",
      morningSnack: "",
      lunch: "",
      eveningSnack: "",
      dinner: "",
    },
    exercisePlan: [
      {
        type: "",
        duration: "",
      }
    ],
  });

  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    if (empId) {
      getEmpPublicData(empId);
    }
  }, empId);

  const getEmpPublicData = async (pEmpId) => {
    if (!pEmpId) return;
    const empPublicDetails = await getEmpPublicInfo(empId);
    const data = { ...dietForm };
    data.employee = empPublicDetails.employee;
    setDietForm(data);
  };

  const handleDietFormChange = (key, value) => {
    const newDietFormData = { ...dietForm };
    newDietFormData[key] = value;
    if (
      newDietFormData?.targetWeight &&
      newDietFormData?.numberOfMonths &&
      newDietFormData?.employee?.currentWeight
    ) {
      const weeklyTargetInGram =
        (newDietFormData?.employee?.currentWeight - newDietFormData?.targetWeight) /
        (parseFloat(newDietFormData?.numberOfMonths) * 4);
      newDietFormData["weeklyMilestone"] = weeklyTargetInGram.toFixed(2);
    }
    setDietForm(newDietFormData);
  };

  const handleSubmit = async () => {
    alert('Thank you for submitting diet!');
    let data = {...dietForm};
    delete data.employee;
    const empPublicDetails = await saveOrUpdateDietForm(empId, dietForm);
  };

  return (
    <div class="container">
      <div class="container">
        <div class="card-header text-start inline-block">
          <img src="/images/company.png" width={120} height={120} />
          <span class="fw-bold px-3">
            {dietForm?.employee?.name} ({dietForm?.employee?.email})
          </span>
        </div>
      </div>
      <div>
        <PersonalDetails
          data={dietForm?.employee}
          isReadOnly={true}
          handleDietFormChange={handleDietFormChange}
        />
      </div>
      <div>
        <Goal data={dietForm} handleDietFormChange={handleDietFormChange} />
      </div>
      <div>
        <DietRecommendation
          data={dietForm}
          handleDietFormChange={handleDietFormChange}
        />
      </div>
      <div>
        <Exercise data={dietForm} handleDietFormChange={handleDietFormChange} />
      </div>
      <div class="container">
        <div class="card-header text-end">
          <Button onClick={handleSubmit}>Submit</Button>
        </div>
      </div>
    </div>
  );
}
export default connect(null, mapDispatchToProps)(DietPlan);
