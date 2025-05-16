import { createSlice } from '@reduxjs/toolkit'


let userData = JSON.parse(localStorage.getItem('jaduMedia'))
const initialState = {
  login: userData ? true : false,
  user:userData ? userData.user : '',
  token: userData ? userData.token : '',
  loading:false
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
    },
    logout:(state, action)=>{
      localStorage.removeItem('jaduMedia')
      state.login = false;
      state.user = '';
      state.token = ''
    },
    updateLoading:(state, action)=>{
      state.loading = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { setState , logout, updateLoading } = userSlice.actions

export default userSlice.reducer