// here it will fetch feture products and store it in a state 
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from '../../../api';

// async thunk to fetch products
export const fetchFeatureProducts = createAsyncThunk(
    'featureProducts/fetchFeatureProducts',
    async (_, { rejectWithValue})=>{
        try {
            const res = await api.get('/api/bestSellingProducts');
            if(res.data.success){
                return res.data.data;
            }else{
                return rejectWithValue("APi returned unsuccessful response");
            }
        } catch (error) {
            console.error("fetchFeatureProducts error:", error);
            return rejectWithValue(
                error.response ? error.response.data : 'Network error'
            );
        }
    }
)

// create a slice for feature products
const featureProductsSlice = createSlice({
    name: "featureProducts",
    initialState: {
        featureProducts: [],
        status: 'idle', // idle | loading | succeeded | failed
        error: null,
    },
    reducers: {
        // You can add synchronous reducers here if needed
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchFeatureProducts.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchFeatureProducts.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.featureProducts = action.payload;
            })
            .addCase(fetchFeatureProducts.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    },
})
export default featureProductsSlice.reducer;