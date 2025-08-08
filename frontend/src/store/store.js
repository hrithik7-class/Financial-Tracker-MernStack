import {configureStore} from "@reduxjs/toolkit"
import authReducer from "../feature/auth/authSlice"
import financeReducer from "../feature/finance/finance.Slice"

const store =configureStore({
    reducer:{
       auth: authReducer,
      finance: financeReducer,
    }
})

export default store