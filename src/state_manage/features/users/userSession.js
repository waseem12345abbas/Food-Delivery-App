import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    serviceType: null, // dive in or delivery
    userType: null, // login or guest
}

const userSession = createSlice({
    name: 'userSession',
    initialState,
    reducers:{
        setServiceType: (state , action) =>{
            state.serviceType = action.payload // 'dive-in' or 'delivery'
        },
        setUserType: (state, action) =>{
            state.userType = action.payload // guest or login 
        },
        resetSession: ()=> initialState // clear the current user data after is confirmed,
    },
});

export const { setServiceType, setUserType, resetSession} = userSession.actions
export default userSession.reducer