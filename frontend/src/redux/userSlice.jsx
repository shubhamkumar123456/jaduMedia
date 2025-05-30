import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'


let userData = JSON.parse(localStorage.getItem('jaduMedia'))  //null

const initialState = {
  login: userData ? true : false,
  user:userData ? userData.user : '',
  token: userData ? userData.token : '',
  loading:false
}


export const fetchUserByToken = createAsyncThunk(
  'users/fetchByIdStatus',
  async (token) => {
    console.log("i am running")
    console.log("token")
   try {
     const response = await axios.get('http://localhost:8090/users/loggedInUser',{
      headers:{
        'Authorization': token
      }
    });

    console.log(response.data)
    return response.data
   } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data || 'Fetch failed');
   }
  },
)

export const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setState:(state , action)=>{
        // console.log(action.payload)
        localStorage.setItem('jaduMedia',JSON.stringify({login:true,token:action.payload.token}))
        state.login = true;
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
    },

  },

    extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(fetchUserByToken.fulfilled, (state, action) => {
      // Add user to the state array
      // console.log(action.payload)
      state.user = action.payload.user
    })
  },
})

// Action creators are generated for each case reducer function
export const { setState , logout, updateLoading, updatePic } = userSlice.actions

export default userSlice.reducer