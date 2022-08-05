import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import adminService from './adminService'

const initialState={
  users: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
}

//Get user 
export const getUser=createAsyncThunk(
    'users/getAll', async(_,thunkAPI)=>{
        try {
            const token=thunkAPI.getState().auth.user.token
            return await adminService.getUser(token)
        } catch (error) {
            const message =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString()
          return thunkAPI.rejectWithValue(message) 
        }
    }
)

export const getOneUser=createAsyncThunk(
    'users/getOne',async(id,thunkAPI)=>{
        try {
            
            const token = thunkAPI.getState().auth.user.token
            return await adminService.getOneUser(id,token)
    
        } catch (error) {
            const message =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString()
          return thunkAPI.rejectWithValue(message)
        }
    }
    )

//Delete user 
export const deleteUser=createAsyncThunk(
'users/delete',async(id,thunkAPI)=>{
    try {
        
        const token = thunkAPI.getState().auth.user.token
         return await adminService.deleteUser(id,token)
         
        //  getUser();

    } catch (error) {
        const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
}
)


export const adminSlice=createSlice({
    name:'users',
    initialState,
    reducers:{
        reset:(state)=>initialState,
    },
    extraReducers:(builder)=>{
        builder
        .addCase(getUser.pending,(state)=>{
            state.isLoading=true
        })
        .addCase(getUser.fulfilled,(state,action)=>{
            state.isLoading=false
            state.isSuccess=true
            state.users=action.payload

        })
        .addCase(getUser.rejected,(state,action)=>{
            state.isLoading=false
            state.isError=true
            state.message=action.payload
        })
        .addCase(deleteUser.pending,(state)=>{
            state.isLoading=true
        })
        .addCase(deleteUser.fulfilled,(state,action)=>{
            state.isLoading=false
            state.isSuccess=true
            state.users=state.users.filter((user)=>user._id !==action.payload.id)
            
            
        })
        .addCase(deleteUser.rejected,(state,action)=>{
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })
        
    },
})

export const {reset}=adminSlice.actions
export default adminSlice.reducer