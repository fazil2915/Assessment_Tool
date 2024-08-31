import {createSlice} from "@reduxjs/toolkit"

const initialState={
    user:null,
    token:null,
    role:null,
    course:[],
    assessment:[]
}

const authSlice= createSlice({
    name:"auth",
    initialState,
    reducers:{
        setLogin:(state,action)=>{
            state.user=action.payload.user,
            state.token=action.payload.token
            state.assessment=action.payload.assessment
        },
        setLogout:(state)=>{
            state.user=null,
            state.token=null
            state.assessment=null
        },
        setMode: (state) => {
            state.mode = state.mode === "light" ? "dark" : "light";
          },
          setCourse:(state,action)=>{
            state.course=action.payload.course
          },
          setAsessment:(state,action)=>{
            state.assessment=action.payload.assessment
          }
    }
});

export const {setLogin,setLogout,setMode,setCourse,setAsessment}=authSlice.actions;
export default authSlice.reducer;