import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "..";
import { CardType } from "../../components/Card";

export interface postState {
  allPosts: CardType[];
  loading: boolean;
}

const initialState: postState = {
  allPosts: [],
  loading: false,
};

interface action {
  type: string;
  payload: any;
}

// Get all post
export const fetchPosts = createAsyncThunk("post/fetchPosts", async () => {
  try {
    const response = await fetch("http://localhost:5000/api/v1/post", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const result = await response.json();
      return result.data.reverse();
    }
  } catch (err) {
    console.error(err);
  }
});

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.allPosts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        console.log(action.error.message);
      });
  },
});

export const selectPost = (state: RootState) => state.post.allPosts;
export const selectLoading = (state: RootState) => state.post.loading;

export default postSlice.reducer;
