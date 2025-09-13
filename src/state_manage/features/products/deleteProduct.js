// this will request to delete a product from database permanently
import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const deleteProduct = createAsyncThunk(
    "products/deleteProduct",
    async(id, { rejectWithValue }) => {
       try {
        const response = await axios.delete(`http://localhost:5000/api/deleteProduct/${id}`);
        if(response.data.success){
            return id
        }
        return rejectWithValue("API returned unsuccessful response");
       } catch (error) {
        return rejectWithValue(error.response ? error.response.data : 'Network error');
       }
    }
)