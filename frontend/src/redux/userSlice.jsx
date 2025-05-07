import { createSlice } from '@reduxjs/toolkit'


let userData = JSON.parse(localStorage.getItem('jaduMedia'))
const initialState = {
  login: userData ? true : false,
  user:userData ? userData.user : '',
  token: userData ? userData.token : ''
}

export const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setState:(state , action)=>{
        // console.log(action.payload)
        localStorage.setItem('jaduMedia',JSON.stringify(action.payload))
        state.login = true;
        state.user = action.payload.user;
        state.token = action.payload.token
    }
  },
})

// Action creators are generated for each case reducer function
export const { setState } = userSlice.actions

export default userSlice.reducer