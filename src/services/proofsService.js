import Request from "../Request";


export const getImageProofs = (id) => {
    return Request.get(`https://myhealthbuddyapp.herokuapp.com/api/image/${id}`);
}

export const approveRejectImages = (id,payload) => {
    return Request.post(`https://myhealthbuddyapp.herokuapp.com/api/notify/${id}`,{...payload});
}


export const uploadImages = (payload) => {
    return Request.post(`https://myhealthbuddyapp.herokuapp.com/api/upload`,payload,{
        headers: {
          'Content-Type': 'multipart/form-data'
        }
    });
}