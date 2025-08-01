import { createSlice } from "@reduxjs/toolkit"
import { adminCategorydeleteById, adminCategoryGetById, createAdminCategories, editAdminCategories, fetchCategories } from "../actions/categoryAction";



const initialState = {
    loading: false,
    error: null,
    message: null,
    data:[]
}

const categoryReducer = createSlice({
    name: "category",
    initialState,
    reducers: {
        clearMessage: (state) => {
            state.message = null;
        },
        clearError: (state) => {
            state.error = null;
        }
    },

    extraReducers : (builder) => {
        builder
        // create seller product
        .addCase(fetchCategories.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchCategories.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload.category;
        })
        .addCase(fetchCategories.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error;
        })


        // for admin create the category
        
        .addCase(createAdminCategories.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(createAdminCategories.fulfilled, (state, action) => {
            state.loading = false;
            state.message = action.payload.message;
        })
        .addCase(createAdminCategories.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error;
        })

        // for admin edit the category
        .addCase(editAdminCategories.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(editAdminCategories.fulfilled, (state, action) => {
            state.loading = false;
            state.message = action.payload.message;
        })
        .addCase(editAdminCategories.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error;
        })

        // for admin category get by id
        .addCase(adminCategoryGetById.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(adminCategoryGetById.fulfilled, (state, action) => {
            state.loading = false;
            state.singleData = action.payload.singleData;
        })
        .addCase(adminCategoryGetById.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error;
        })

        // for admin category delete by id
        .addCase(adminCategorydeleteById.pending, (state) => {
            state.isDeleteloading = true;
            state.error = null;
        })
        .addCase(adminCategorydeleteById.fulfilled, (state, action) => {
            state.isDeleteloading = false;
            state.message = action.payload.message;
        })
        .addCase(adminCategorydeleteById.rejected, (state, action) => {
            state.isDeleteloading = false;
            state.error = action.error;
        })


    }
})

export const { clearError, clearMessage } = categoryReducer.actions;
export default categoryReducer.reducer;