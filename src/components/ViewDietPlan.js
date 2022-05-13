import React, { useEffect, useState } from "react";

import { connect } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import DietRecommendation from "./dietPlan/dietRecommendation";
import Goal from "./dietPlan/goal";
import Exercise from "./dietPlan/exercise";
import PersonalDetails from "./dietPlan/personalDetails";
import FitnessProgressBar from "./dietPlan/progress";
import ImageUpload from "./ImageUpload";
import { Button, Modal } from "react-bootstrap";
import {
  getEmpPublicInfo,
  getUserDetails,
  updateUserDetails,
  getUserById
} from "../services/dietService";
import moment from "moment";
import Logout from "./Logout";

const mapDispatchToProps = (dispatch) => {
  return {
  };
};

function UploadImageModal(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button onClick={handleShow}>
         {props.text}
       </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Upload Proofs</Modal.Title>
        </Modal.Header>
        <Modal.Body><ImageUpload handleClose={handleClose}/></Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}


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
    waterIntake: 8,
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
      },
    ],
  });

  useEffect(() => {
    if (empId) {
      getEmpData(empId);
    }
  }, empId);

  const startChallenge = async () => {
    const startDate = moment().toISOString();
    const empPublicDetails = await updateUserDetails({ startDate });
    getEmpData(empId);
    alert('Challenge has been started!');
  };

  const getEmpData = async (pEmpId) => {
    if (!pEmpId) return;
    const empPublicDetails = await getEmpPublicInfo(pEmpId);
    const empDetails = await getUserById(pEmpId);
    if (empDetails?.employee?.recommendedPlan) {
      const data = { ...empDetails?.employee?.recommendedPlan };
      data.employee = empPublicDetails?.employee;
      setDietForm(data);
    }
  };

  return (
    <div className="container">
      <Logout />
      {dietForm?.targetWeight ? (
        <>
          <div>
            <FitnessProgressBar data={dietForm} />
          </div>
          {dietForm?.startDate && (
            <div className="my-3 text-end mx-3">
              <UploadImageModal text='Submit For Review'/>
            </div>
          )}
          {!dietForm?.startDate && (
            <div className="my-3 text-end mx-3">
              <Button onClick={startChallenge}>Start Challenge</Button>
            </div>
          )}
          <div>
            <PersonalDetails isReadOnly={true} data={dietForm?.employee} />
          </div>
          <div>
            <Goal isReadOnly={true} data={dietForm} />
          </div>
          <div>
            <DietRecommendation isReadOnly={true} data={dietForm} />
          </div>
          <div>
            <Exercise isReadOnly={true} data={dietForm} />
          </div>
        </>
      ) : (
        <div className="fw-bolder fs-2" style={{ color: "navajowhite" }}>
          Dietician has not filled diet plan. Please revisit here to check the
          plan. Thanks!
        </div>
      )}
    </div>
  );
}
export default connect(null, mapDispatchToProps)(DietPlan);
