import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "..";
import { Mode } from "fs";

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

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    closeModal: (state: modalState) => {
      state.isModalOpen = false;
      state.post = null;
    },
    openModal: (state: modalState, action: action) => {
      state.isModalOpen = true;
      state.post = action.payload;
    },
  },
});

export const { closeModal, openModal } = modalSlice.actions;
export const selectIsModalOpen = (state: RootState) => state.modal.isModalOpen;
export const selectpost = (state: RootState) => state.modal.post;

export default modalSlice.reducer;
