
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { deleteProduct } from "./deleteProduct";
import { updateProduct } from "./updateProduct";


// async thunk to fetch products
export const fetchProducts= createAsyncThunk(
    'products/fetchProducts',
    async ( _, { rejectWithValue })=>{
        try {
            const res = axios.get('http://localhost:5000/api/allProducts');
            if((await res).data.success){
                return (await res).data.data
            }else{
                return rejectWithValue('Api returned unsuccessful response')
            }
        } catch (error) {
            return rejectWithValue(
                error.response ? error.response.data : 'Network error'
            );
        }
    }
)

const productsSlice = createSlice({
    name: "products",
    initialState: {
        products: [],
        status: 'idle', // idle | loading | succeeded | failed
        error: null,
    },
    reducers: {
        // You can add synchronous reducers here if needed
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.products = action.payload;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(deleteProduct.fulfilled, (state, action)=>{
                state.products = state.products.filter(item=>item._id !== action.payload);
            })
            .addCase(updateProduct.fulfilled, (state, action) => {
                const updatedProduct = action.payload;
                const index = state.products.findIndex(item => item._id === updatedProduct._id);
                if (index !== -1) {
                    state.products[index] = updatedProduct;
                }
            });
    },
})

export default productsSlice.reducer;