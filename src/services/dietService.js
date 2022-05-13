import Request from "../Request";


export const getEmpPublicInfo = (empId) => {
    return Request.get(`/external/form/${empId}`);
}

export const getUserDetails = () => {
    return Request.get(`/api/user/`);
}

export const saveOrUpdateDietForm = (empId, data) => {
    return Request.post(`/external/form/${empId}`, data);
}

export const updateUserDetails = (data) => {
    return Request.put(`/api/user/`, data);
}

export const getUserById = (empId) => {
    return Request.get(`/api/user/${empId}`);
}