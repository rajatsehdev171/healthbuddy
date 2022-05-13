import React, { useState, useEffect, Fragment } from 'react';
import { useNavigate } from "react-router-dom";
import Logout from './Logout';
import { NavLink } from 'react-router-dom';
import {
	saveBmiDetails,
} from "./redux/reducer";
import { connect } from 'react-redux';
import axios from 'axios';
const Mailto = ({ email, subject, body, children }) => {
	return (
		<a href={`mailto:${email}?subject=${encodeURIComponent(subject) || ''}&body=${encodeURIComponent(body) || ''}`} className="text-white">{children}</a>
	);
};
const tableData = {
	columns: ['Category', 'BMI Range - Kg/m2'],
	rows: [{
		'Category': 'Severe Thinness',
		'BMI Range - Kg/m2': '<16',
	}, {
		'Category': 'Moderate Thinness',
		'BMI Range - Kg/m2': '16-17',
	}, {
		'Category': 'Mild Thinness',
		'BMI Range - Kg/m2': '17-18.5',
	}, {
		'Category': 'Normal',
		'BMI Range - Kg/m2': '18.5-25',
	}, {
		'Category': 'Overweight',
		'BMI Range - Kg/m2': '25-30',
	}, {
		'Category': 'Obese Class I',
		'BMI Range - Kg/m2': '30-35',
	}, {
		'Category': 'Obese Class II',
		'BMI Range - Kg/m2': '35-40',
	}, {
		'Category': 'Obese Class III',
		'BMI Range - Kg/m2': '>40',
	}]
};
const tableDataBfp = {
	columns: ['Description', 'Women', 'Men'],
	rows: [{
		'Description': 'Essential Fat',
		'Women': '10-13%',
		'Men': '2-5%'
	}, {
		'Description': 'Athletes',
		'Women': '14-20%',
		'Men': '6-13%'
	}, {
		'Description': 'Fitness',
		'Women': '21-24%',
		'Men': '14-17%'
	}, {
		'Description': 'Average',
		'Women': '25-31%',
		'Men': '18-24%'
	}, {
		'Description': 'Obese',
		'Women': '32+%',
		'Men': '25+%'
	}]
};
const Table = (props) => {
	// Data
	const dataColumns = props.data.columns;
	const dataRows = props.data.rows;
	const bmiDetails = props.bmiDetails;
	const tableHeaders = (<thead>
		<tr>
			{dataColumns.map(function (column) {
				return <th key={column}>{column}</th>;
			})}
		</tr>
	</thead>);

	const tableBody = dataRows.map(function (row, index) {
		return (<tbody>
			<tr className={(row.Category === bmiDetails.bmiStatus || row.Description === bmiDetails.bodyFatRange) ? 'highlight-row' : ''}>
				{dataColumns.map(function (column, columnIndex) {
					return <td key={`${index}${columnIndex}`}>{row[column]}</td>;
				})}
			</tr>
		</tbody>);
	});

	return (<table className="table-bordered-bmi table-hover" width="100%">
		{tableHeaders}
		{tableBody}
	</table>)
};

const mapDispatchToProps = (dispatch) => {
	return {
		saveBmiDetails: (obj) => dispatch(saveBmiDetails(obj)),
	};
};

const mapStateToProps = (state) => {
	return {
		loginResponse: state.loginResponse,
		bmiDetails: state.bmiDetails
	};
};

let Step = ({
	indicator,
	label,
	navigateToStepHandler,
	index,
	isActive,
	isComplete,
	isWarning,
	isError,
	isRightToLeftLanguage,
}) => {
	const classes = [''];

	if (isActive) {
		classes.push('is-active');
	}
	if (isComplete) {
		classes.push('is-complete');
	}
	if (isWarning) {
		classes.push('is-warning');
	}
	if (isError) {
		classes.push('is-error');
	}
	if (isRightToLeftLanguage) {
		classes.push('rightToLeft');
	}

	return (
		<div className={`stepper-step ${classes.join(' ')}`}>
			<div className="stepper-indicator">
				<span
					className="stepper-indicator-info"
					onClick={isComplete || isError ? () => navigateToStepHandler(index) : null}
				>
					{isComplete ? (
						<svg className="stepper-tick" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 490 490">
							<path d="M452.253 28.326L197.831 394.674 29.044 256.875 0 292.469l207.253 169.205L490 54.528z" />
						</svg>
					) : (
						indicator
					)}
				</span>
			</div>
			<div className="stepper-label">{label}</div>
		</div>
	);
};


let StepperHead = ({
	stepperContent,
	navigateToStepHandler,
	isVertical,
	isInline,
	isRightToLeftLanguage,
	currentTabIndex,
}) => (
	<div
		className={`stepper-head ${isVertical ? 'vertical-stepper-head' : ''} ${isInline ? 'inline-stepper-head' : ''
			}`}
	>
		{stepperContent.map((el, i) => (
			<Step
				key={i}
				index={i}
				navigateToStepHandler={navigateToStepHandler}
				isActive={i === currentTabIndex}
				isComplete={el.isComplete}
				isWarning={el.isWarning}
				isError={el.isError}
				isRightToLeftLanguage={isRightToLeftLanguage}
				indicator={i + 1}
				label={el.label}
			/>
		))}
	</div>
);


let StepperFooter = ({
	isPrevBtn,
	previousStepHandler,
	isLastStep,
	nextStepHandler,
	submitHandler,
	stepperContent,
	currentTabIndex,
}) => {
	const submitCurrentStep = async () => {
		await stepperContent[currentTabIndex].clicked();
		nextStepHandler();
	};

	return (
		<div
			className="stepper-footer"
			style={{ justifyContent: isPrevBtn ? 'space-between' : 'flex-end' }}
		>
			{isPrevBtn && (
				<button className="stepper-footer-btn" onClick={previousStepHandler}>
					Back to {stepperContent[currentTabIndex - 1].label}
				</button>
			)}
			<button
				className={`stepper-footer-btn ${isLastStep ? 'success' : 'primary'}`}
				onClick={
					isLastStep
						? submitHandler
						: stepperContent[currentTabIndex].clicked
							? submitCurrentStep
							: nextStepHandler
				}
				disabled={
					(isLastStep
						? stepperContent.some((el) => !el.isComplete)
						: !stepperContent[currentTabIndex].isComplete) ||
					stepperContent[currentTabIndex].isLoading
				}
			>
				{isLastStep ? 'Go Back To Home' : `Continue to ${stepperContent[currentTabIndex + 1].label}`}
			</button>
		</div>
	);
};


let Stepper = ({ isRightToLeftLanguage, isVertical, isInline, stepperContent, submitStepper }) => {
	const [currentTabIndex, setCurrentTabIndex] = useState(0),
		isLastStep = currentTabIndex === stepperContent.length - 1,
		isPrevBtn = currentTabIndex !== 0;

	const navigateToStepHandler = (index) => {
		if (index !== currentTabIndex) {
			setCurrentTabIndex(index);
		}
	};

	const nextStepHandler = () => {
		setCurrentTabIndex((prev) => {
			if (prev !== stepperContent.length - 1) {
				return prev + 1;
			}
		});
	};

	const previousStepHandler = () => {
		setCurrentTabIndex((prev) => prev - 1);
	};

	const submitHandler = () => {
		submitStepper();
	};

	return (
		<div className="stepper-wrapper">
			<div style={{ display: isVertical ? 'flex' : 'block' }}>
				<StepperHead
					stepperContent={stepperContent}
					navigateToStepHandler={navigateToStepHandler}
					isVertical={isVertical}
					isInline={isInline}
					currentTabIndex={currentTabIndex}
					isRightToLeftLanguage={isRightToLeftLanguage}
				/>
				<div className="stepper-body">
					{stepperContent.map((el, i) => (
						<Fragment key={i}>{i === currentTabIndex && el.content}</Fragment>
					))}
				</div>
			</div>
			<StepperFooter
				isPrevBtn={isPrevBtn}
				previousStepHandler={previousStepHandler}
				isLastStep={isLastStep}
				nextStepHandler={nextStepHandler}
				submitHandler={submitHandler}
				stepperContent={stepperContent}
				currentTabIndex={currentTabIndex}
			/>
		</div>
	);
};

const StepperC = (props) => {
	const { responseObj, token } = props.loginResponse;
	const { bmiDetails } = props;
	const navigate = useNavigate();
	const [editableParams, setEditableParams] = useState({ weight: '', height: '', hip: '', activity: 'light' });
	const [isSaveEnabled, setSaveStatus] = useState(false);
	const [acceptFirstTerms, setAcceptFirstTerms] = useState({
		checked: false,
	});
	const [acceptSecondTerms, setAcceptSecondTerms] = useState({
		checked: false,
	});
	const [acceptThirdTerms, setAcceptThirdTerms] = useState({
		checked: false,
	});
	const [acceptFourthTerms, setAcceptFourthTerms] = useState({
		checked: false,
	});
	const [isSecondStepLoading, setIsSecondStepLoading] = useState(false);

	const changeHandler = (e, type) => {
		switch (type) {
			case 'weight':
				setEditableParams({ ...editableParams, weight: e.target.value });
				break;
			case 'height':
				setEditableParams({ ...editableParams, height: e.target.value });
				break;
			case 'hip':
				setEditableParams({ ...editableParams, hip: e.target.value });
				break;
			case 'activity':
				setEditableParams({ ...editableParams, activity: e.target.value });
				break;
		}
	}
	const firstTermsHandler = () => {
		setAcceptFirstTerms({ checked: true });
	};

	//for demo purposes only
	const timeout = (ms) => {
		return new Promise((resolve) => setTimeout(resolve, ms));
	};

	const secondStepAsyncFunc = () => {
		setIsSecondStepLoading(true);
		let {
			height,
			weight,
			waist,
			hip,
			activity
		} = editableParams;
		const requestPayload = {
			height,
			weight,
			waist,
			activity
		}
		if (responseObj.sex == 'F') {
			requestPayload['hip'] = hip;
		}
		axios.post('https://myhealthbuddyapp.herokuapp.com/api/user/', { ...requestPayload }, {
			headers: {
				'Authorization': `Bearer ${token}`
			}
		}).then(async (response) => {
			props.saveBmiDetails({ ...response.data });
			setIsSecondStepLoading(false);
			setAcceptSecondTerms({ checked: true })
			alert('Details Saved Successfully!')
		})
			.catch(error => {
				setIsSecondStepLoading(false);
				setAcceptSecondTerms({ checked: false })
				alert('Error saving details!')
				console.log(error);
			});
		console.log('second step clicked');
	};
	const sentMailClicked = () => {
		setAcceptThirdTerms({ checked: true });
	}

	const reformatDateString = (s) => {
		var b = s.split(/\D/);
		return b.reverse().join('-');
	}

	const calculateAge = (birthday) => {
		const ageDifMs = Date.now() - new Date(birthday).getTime();
		const ageDate = new Date(ageDifMs);
		return Math.abs(ageDate.getUTCFullYear() - 1970);
	}
	useEffect(() => {
		const { weight, height, hip, activity } = editableParams;
		if (responseObj.sex == 'F') {
			if (weight && height && hip && activity) {
				setSaveStatus(true);
			}
			else {
				setSaveStatus(false);
			}
		}
		else {
			if (weight && height && activity) {
				setSaveStatus(true)
			}
			else {
				setSaveStatus(false);
			}
		}
	}, [editableParams]);

	useEffect(() => {
		const { name, sex, email, dob, hr_manager } = responseObj;
		if (name && sex && email && dob && hr_manager) {
			firstTermsHandler();
		}
	}, [responseObj]);


	const stepperContent = [
		{
			label: 'View Basic Details',
			content: (
				<div>
					<form>
						<div className="field-wrapper">
							<label>User Name  </label><br />
							<input type="text" disabled defaultValue={`${responseObj.name}`} />
						</div>
						<div className="field-wrapper">
							<label>Gender  </label><br />
							<input type="text" disabled defaultValue={`${responseObj.sex == 'F' ? 'Female' : 'Male'}`} />
						</div>
						<div className="field-wrapper">
							<label>Email Id  </label><br />
							<input type="text" disabled defaultValue={`${responseObj.email}`} />
						</div>
						<div className="field-wrapper">
							<label>Date Of Birth </label><br />
							<input type="text" disabled defaultValue={responseObj.dob} />
						</div>
						<div className="field-wrapper">
							<label>HR Manager</label><br />
							<input type="text" disabled defaultValue={responseObj.hr_manager} />
						</div>
					</form>
				</div>
			),
			isComplete: acceptFirstTerms.checked,
		},
		{
			label: 'Update User Details',
			content: (
				<div>
					<div className="field-wrapper">
						<label>Age </label><br />
						<input type="number" placeholder="in yrs" disabled defaultValue={calculateAge(reformatDateString(responseObj.dob))} />
					</div>
					<div className="field-wrapper">
						<label>Gender </label><br />
						<input type="text" disabled defaultValue={responseObj.sex == 'F' ? 'Female' : 'Male'} />
					</div>
					<div className="field-wrapper">
						<label>Weight  </label><br />
						<input type="number" placeholder="in kgs" value={editableParams.weight} onChange={(e) => changeHandler(e, 'weight')} />
					</div>
					<div className="field-wrapper">
						<label>Height </label><br />
						<input type="number" placeholder="in cms" value={editableParams.height} onChange={(e) => changeHandler(e, 'height')} />
					</div>
					{responseObj.sex == 'F' && <div className="field-wrapper">
						<label>Hip </label><br />
						<input type="number" placeholder="in cms" value={editableParams.hip} onChange={(e) => changeHandler(e, 'hip')} />
					</div>}
					<div className="field-wrapper">
						<label htmlFor="activity">Activity Measurement</label><br />
						<select name="activity" id="dropdown-activity" onChange={(e) => changeHandler(e, 'activity')}>
							<option value="light">Exercise 1-3 times/week</option>
							<option value="moderate">Exercise 4-5 times/week</option>
							<option value="active daily">Exercise or intense exercise 3-4 times/week</option>
							<option value="very active"> Intense exercise 6-7 times/week</option>
							<option value="extra active">Very intense exercise delay or physical job</option>
						</select>
					</div>
					<div className="edit-save-container">
						<button className={`primary save-btn stepper-footer-btn ${!isSaveEnabled ? 'disabled-save' : ''}`} onClick={() => secondStepAsyncFunc()}>
							Save
						</button>
					</div>
				</div>
			),
			isComplete: acceptSecondTerms.checked,
		},
		{
			label: 'Check Employee Fitness',
			content: (bmiDetails && (<div>
				{!bmiDetails.isEmployeeFit ? <h5 style={{ color: "navajowhite" }}>You are not a fit person, please follow the diet plan that would be soon shared to you by your dietician over your <NavLink
					to={`/view-plan/${responseObj._id}`}
				> view diet plan </NavLink>page </h5> : <h5 className='text-white'>Hey! You are a fit person.</h5>}
				<div className="field-wrapper">
					<label>Body Mass Index </label><br />
					<input type="number" disabled defaultValue={bmiDetails.bmi} />
				</div>
				<div className="field-wrapper">
					<label>Ideal Weight (Kg) </label><br />
					<input type="number" disabled defaultValue={bmiDetails.idealWeight} />
				</div>
				<div className="field-wrapper">
					<label>Body Fat </label><br />
					<input type="number" disabled defaultValue={bmiDetails.bodyFat} />
				</div>
				<h2 className='mt-5'>Body Mass Index  Reference</h2>
				<Table data={tableData} bmiDetails={bmiDetails} />
				<h2 className='mt-3'>Body Fat Reference</h2>
				<Table data={tableDataBfp} bmiDetails={bmiDetails} />
                <div className="field-wrapper">
					<label>Maintainance calories </label><br />
					<input type="text" disabled defaultValue={`${bmiDetails.maintenanceCalories}`} />
				</div>
				<div className="field-wrapper">
					<label>Dietician Email Id </label><br />
					<input type="text" disabled defaultValue={`priyanshu.srivastava@tothenew.com`} />
				</div>
				<div className="edit-save-container">
					<button className={`primary save-btn stepper-footer-btn`} onClick={() => sentMailClicked()}>
						<Mailto email="`priyanshu.srivastava@tothenew.com" subject="Please follow the link given below to view diet plan" body={`Please visit this link to get your diet plan "${bmiDetails.link}"`} >
							Save 
						</Mailto>
					</button>
				</div>
			</div>)
			), 
			isComplete: acceptThirdTerms.checked,
		},
	];

	const submitStepper = () => {
		console.log('submitted');
		setAcceptFirstTerms({checked:false});
		setAcceptSecondTerms({checked:false});
		setAcceptThirdTerms({checked:false})
		setTimeout(() => {
			navigate('/home');
		},500)
	};

	return (
		<div className="container">
            <Logout />
			<div className='mt-5'>
			<Stepper stepperContent={stepperContent} submitStepper={submitStepper} />
			</div>
		</div>
	);
};




export default connect(mapStateToProps, mapDispatchToProps)(StepperC);