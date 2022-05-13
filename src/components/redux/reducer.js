import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loginResponse:{
    responseObj:null,
    isLoggedIn:false,
    token:null
  },
  bmiDetails:null,
  userCompleteDetails:null,
}

const healthBuddyReducer = createSlice({
  name: "health-actions",
  initialState,
  reducers: {
    //here we will write our reducer
    //Adding todos
    updateLoginResponse: (state, action) => {
      state.loginResponse = action.payload;
    },
    saveBmiDetails:(state, action)=> {
      debugger
      state.bmiDetails = action.payload;
      console.log("isState updated--",state);
    },
    saveUserCompleteDetails:(state,action) => {
      state.userCompleteDetails = action.payload;
    }
  },
});

export const {
  updateLoginResponse,
  saveBmiDetails,
} = healthBuddyReducer.actions;
export const reducer = healthBuddyReducer.reducer;