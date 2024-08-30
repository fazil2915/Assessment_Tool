import {createSlice} from "@reduxjs/toolkit"

const initialState={
    user:null,
    token:null,
    role:null,
    assessment:[]
}

const authSlice= createSlice({
    name:"auth",
    initialState,
    reducers:{
        setLogin:(state,action)=>{
            state.user=action.payload.user,
            state.token=action.payload.token
            state.assessment=action.payload.token
        },
        setLogout:(state)=>{
            state.user=null,
            state.token=null
            state.assessment=null
        },
        setMode: (state) => {
            state.mode = state.mode === "light" ? "dark" : "light";
          },
    }
});

export const {setLogin,setLogout,setMode}=authSlice.actions;
export default authSlice.reducer;