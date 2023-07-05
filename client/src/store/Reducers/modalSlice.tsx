import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "..";

export interface modalState {
  isModalOpen: boolean;
  post: any;
}

const initialState: modalState = {
  isModalOpen: false,
  post: null,
};

interface action {
  type: string;
  payload: any;
}

// open modal displaying post
export const openModel = createAsyncThunk(
  "modal/openModal",
  async (postId: string) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/v1/post/${postId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        const result = await response.json();
        return result.data;
      }
    } catch (e) {
      console.error(e);
    }
  }
);

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    closeModal: (state: modalState) => {
      state.isModalOpen = false;
      state.post = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(openModel.fulfilled, (state: modalState, action: action) => {
        state.isModalOpen = true;
        state.post = action.payload;
      })
      .addCase(openModel.rejected, (state: modalState, action: action) => {
        console.log(action);
      });
  },
});

export const { closeModal } = modalSlice.actions;
export const selectIsModalOpen = (state: RootState) => state.modal.isModalOpen;
export const selectpost = (state: RootState) => state.modal.post;

export default modalSlice.reducer;
