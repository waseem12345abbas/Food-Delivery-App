// here I'll fetch users by making api call to the backend
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// fetch users from the backend
export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async (_, { rejectWithValue }) => {
    try {
        const response= await axios.get('http://localhost:5000/api/users')
        if(response.data.success){
            return response.data.data
        }else{
            return rejectWithValue("API returned unsuccessful response")
        }
    } catch (error) {
        return rejectWithValue(
            error.response ? error.response.data : 'Network error'
        );
    }
  }
)

// create a slice for users
const usersSlice = createSlice({
    name: 'users',
    initialState:{
        users: [],
        status: 'idle', // idle | loading | succeeded | failed
        error: null,
    },
    reducers:{

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.status = 'success';
                state.users = action.payload;
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
        }
})

export default usersSlice.reducer;