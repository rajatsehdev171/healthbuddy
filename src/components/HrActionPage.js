import React, {useEffect, useState} from 'react';
import { connect } from 'react-redux';
import {NavLink} from 'react-router-dom';
import axios  from 'axios';
import {
  updateLoginResponse,
} from "./redux/reducer";
import { useNavigate } from "react-router-dom";
import { Button, Modal, Form } from "react-bootstrap";
import { getImageProofs, approveRejectImages } from "../services/proofsService";
import Logout from "./Logout";

function ModalPopup(props) {
   const {approvedObjects,rejectedObjects,handleIsApproveObjs, recommendedPlan} = props;
   const [textToReturn, setText] = useState('');
   const [isModalClickEnabled, setModalClickEnable] = useState(true);
   const [show, setShow] = useState(false);
   const [imageProofs, setImageProofs] = useState([]);
   const [remarkDesc, setRemarkDesc] = useState('');
   const handleClose = () => setShow(false);
   const handleShow = () => setShow(true);
   const handleRejectApprove = async (type) => {
    // https://myhealthbuddyapp.herokuapp.com/api/
    const response = await approveRejectImages(props.id,{status:type,remarks:remarkDesc});
    console.log('checker',response);
    if(response =='OK'){
        if(type=='approved'){
            alert('Approved Successfully!')
            handleIsApproveObjs('approved',{id:props.id})
        }
        else{
            alert('Rejected Successfully!')
            handleIsApproveObjs('rejected',{id:props.id})
        }
    }
    else{
        alert('Err Saving your Response!')
    }
   }
   useEffect(() => {
       async function fetchData(){
       if(props.id){
        const response = await getImageProofs(props.id);
        if(response && response.images)
        setImageProofs(response.images);
        else{
            setImageProofs([]);
        }
       }
    }
    fetchData()
   },[props.id]);

   useEffect(() => {
    function callSetterFunction(){
        if(recommendedPlan){
         if(recommendedPlan.approved){
             setText('Approved');
             setModalClickEnable(false);
         }
         else if(!('approved' in recommendedPlan)) {
            setText('Approve/Reject');
            setModalClickEnable(true);
         }
         else if(recommendedPlan.approved == false){
            setText('Rejected');
            setModalClickEnable(false);
        }
        }
        else{
            if(approvedObjects.findIndex((obj) => obj.id ==props.id)!==-1){
             setText('Approved');
             setModalClickEnable(false);
            }
            else if(rejectedObjects.findIndex((obj)=>obj.id)!==-1){
             setText('Rejected');
             setModalClickEnable(false);
            }
            else{
             setText('N/A (DietPlan not generated)');
             setModalClickEnable(false);
            }
        }
   
    }
    callSetterFunction()
   },[approvedObjects,rejectedObjects]);
   return (
     <>
       <a className={`text-white cursor-pointer employee-anchor ${isModalClickEnabled?'':'pe-none text-decoration-none'}`} onClick={handleShow}>  
       {textToReturn}
       </a>
 
       <Modal show={show} onHide={handleClose}>
         <Modal.Header closeButton>
           <Modal.Title>Before/After Proofs</Modal.Title>
         </Modal.Header>
         <Modal.Body>
        {imageProofs && imageProofs.length>0 ? (<><div className='d-flex p-3'>
        <div className="w-50">
            <h5 className='text-dark'>Before Image</h5>
         <img  src={imageProofs[0]} className="w-75"/>
         </div>
         <div  className="w-50">
         <h5 className='text-dark'>After Image</h5>
         <img  src={imageProofs[1]} className="w-75"/>
         </div>
         </div>
         <div  className="w-100">
            <Form.Group className="mb-3">
                <Form.Label>Please Enter Remarks Here</Form.Label>
                <Form.Control type="text" placeholder="Enter remarks..." value={remarkDesc} onChange={(e) => setRemarkDesc(e.target.value)}/>
            </Form.Group>
         </div></>):<>Employee dont have diet plan yet</>} 
         </Modal.Body>
         <Modal.Footer>
           <Button variant="secondary" size="sm" onClick={handleClose}>
             Cancel
           </Button>
           {imageProofs  && imageProofs.length>0 &&<><Button variant="primary" size="sm" onClick={() =>handleRejectApprove("approved")} className={!remarkDesc&&'disabled'}>
             Approve
           </Button>
           <Button variant="primary" size="sm" onClick={() =>handleRejectApprove("rejected")} className={!remarkDesc&&'disabled'}>
             Reject
           </Button></>}
         </Modal.Footer>
       </Modal>
     </>
   );
  }

const mapStateToProps = (state) => {
  return {
    loginResponse: state.loginResponse
  };
};

const mapDispatchToProps = (dispatch) => {
    return {
      updateLoginResponse: (obj) => dispatch(updateLoginResponse(obj)),
    };
  };

  const TableHr = (props) => {
	// Data
    const [approvedObjects, setApprovedObjects] = useState([]);
    const [rejectedObjects, setRejectedObjects ] = useState([]);
	const dataColumns = ['empId', 'name','email','sex','dob','_id','isHR'];
    const colToShow = ['Employee Id', 'Name', 'Email','Sex','Date Of Birth','Actions','View Plan Link'];
	const dataRows = props.data;
	const tableHeaders = (<thead>
		<tr>
			{dataColumns.map(function (column,index) {
				return <th key={column}>{colToShow[index]}</th>;
			})}
		</tr>
	</thead>);
    const handleIsApproveObjs = (type,payload) => {
       if(type =='approved'){
           setApprovedObjects((prevArray) => [...prevArray,payload])
       }
       else{
        setRejectedObjects((prevArray) => [...prevArray,payload])
       }
       
    }
    useEffect(() => {
        console.log('888',approvedObjects,rejectedObjects);
    })
	const tableBody = dataRows.map(function (row, index) {
		return (<tbody>
			<tr className={ ''} key={index}>
				{dataColumns.map(function (column, columnIndex) {
					return (<td key={`${index}${columnIndex}`}>{column=='_id'?<>
                      <ModalPopup recommendedPlan={row.recommendedPlan} textToShow={'Approve/Reject'} id={row['_id']} approvedObjects={approvedObjects} rejectedObjects={rejectedObjects} handleIsApproveObjs={handleIsApproveObjs}/></>:column=='isHR'?<NavLink to={`/view-plan/${row['_id']}`} className={`${row.recommendedPlan?'':'pe-none'} text-dark text-decoration-none`}>{row.recommendedPlan?'Link':'Link not generated '}</NavLink>:row[column]}</td>);
				})}
			</tr>
		</tbody>);
	});

	return (<table className="table table-striped mt-5" width="100%">
		{tableHeaders}
		{tableBody}
	</table>)
};


function HrActionPage(props) {
 const { loginResponse } = props;
 const employeeList = loginResponse.responseObj && loginResponse.responseObj.employeeList ?loginResponse.responseObj.employeeList: [];
 console.log("this is hr page",employeeList);
  return (
    <div>
      <Logout />
   <h1 className="text-warning">Employee List</h1>
    <TableHr data={employeeList} />
  </div>
  );
}
export default connect(mapStateToProps,null)(HrActionPage);

