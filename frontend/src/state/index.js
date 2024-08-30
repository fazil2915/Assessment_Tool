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
          }
    }
});

export const {setLogin,setLogout,setMode,setCourse}=authSlice.actions;
export default authSlice.reducer;