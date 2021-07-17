import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { IPost, defaultValue } from "../../app/shared/model/post.model";
import { client } from "../../api/client";

export interface IPostsState {
  status: "idle" | "loading" | "failed";
  errorMessage: string | null;
  entities: ReadonlyArray<IPost>;
  entity: IPost;
  updating: false;
  totalItems: number;
}

const initialState: IPostsState = {
  status: "idle",
  errorMessage: null,
  entities: [],
  entity: defaultValue,
  updating: false,
  totalItems: 0
};

export const addPostAsync = createAsyncThunk(
  "posts/addPost",
  async (post: IPost) => {
    const response = await client.post<{post: IPost}>("/fakeApi/post", post);
    return response.post;
  }
);

export const fetchAllPostsAsync = createAsyncThunk(
  "posts/fetchAllPosts",
  async () => {
    const response = await client.get<{posts: IPost[]}>("/fakeApi/posts");
    return response.posts;
  }
);

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    postAdded(state, action) {
      state.entities.push(action.payload);
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllPostsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllPostsAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.entities = action.payload;
      })
      .addCase(addPostAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addPostAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.entities.push(action.payload);
      });
  }
});

export const { postAdded } = postsSlice.actions;

export default postsSlice.reducer;
