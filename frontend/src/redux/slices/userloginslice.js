import { createSlice,createAsyncThunk} from "@reduxjs/toolkit";
import axios from 'axios'

export const userLoginThunk=createAsyncThunk('userlogin',async(creduser,thunkapi)=>{
        let res;
        if(creduser.userType==='user'){
           res=await axios.post('http://localhost:7000/user-api/login',creduser)
        }
        if(creduser.userType==='author'){
            res=await axios.post('http://localhost:7000/author-api/login',creduser)
        }
        if(res.data.message==='login success'){
            sessionStorage.setItem('token',res.data.token)
            return res.data;
        }
        else{
            return thunkapi.rejectWithValue(res.data.message)
        }
})




export const userloginslice=createSlice({
    name:'user-login',
    initialState:{isPending:false,currentUser:{},errorStatus:false,errorMessage:"",loginStatus:false},
    reducers:{
        resetState:(state,payload)=>{
            state.isPending=false
            state.currentUser={}
            state.errorStatus=false
            state.errorMessage=""
            state.loginStatus=false
        }
    },
    extraReducers:builder=>builder
    .addCase(userLoginThunk.pending,(state,action)=>{
        state.isPending=true

    })
    .addCase(userLoginThunk.fulfilled,(state,action)=>{
        state.isPending=false
        state.currentUser=action.payload.user
        state.errorStatus=false
        state.errorMessage=""
        state.loginStatus=true
    })
    .addCase(userLoginThunk.rejected,(state,action)=>{
        state.isPending=false
        state.currentUser={}
        state.errorStatus=true
        state.errorMessage=action.payload
        state.loginStatus=false
    })
})


//export root reducer of userloginslice
export default userloginslice.reducer
//export action creater functors
export const {resetState}=userloginslice.actions