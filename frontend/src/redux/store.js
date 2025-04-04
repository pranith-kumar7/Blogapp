import {configureStore} from '@reduxjs/toolkit'
import userloginslice from './slices/userloginslice'
export let reduxstore=configureStore({
    reducer:{
        userlogin:userloginslice
    }
})