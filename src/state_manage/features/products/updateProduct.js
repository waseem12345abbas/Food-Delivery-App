import api from "../../../api";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const updateProduct = createAsyncThunk(
    "products/updateProduct",
    async ({ id, updateData }, { rejectWithValue }) => {
        try {
            const response = await api.put(`/api/updateProduct/${id}`, updateData);
            if (response.data.success) {
                return response.data.data;
            }
            return rejectWithValue("API returned unsuccessful response");
        } catch (error) {
            return rejectWithValue(error.response ? error.response.data : 'Network error');
        }
    }
)
