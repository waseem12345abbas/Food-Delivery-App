// this will request to delete a product from database permanently
import api from "../../../api";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const deleteProduct = createAsyncThunk(
    "products/deleteProduct",
    async(id, { rejectWithValue }) => {
       try {
        const response = await api.delete(`/api/deleteProduct/${id}`);
        if(response.data.success){
            return id
        }
        return rejectWithValue("API returned unsuccessful response");
       } catch (error) {
        return rejectWithValue(error.response ? error.response.data : 'Network error');
       }
    }
)