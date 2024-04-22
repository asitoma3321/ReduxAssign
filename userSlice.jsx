import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
 
export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const response = await axios.get(
    "https://jsonplaceholder.typicode.com/users"
  );
  return response.data;
});
 
export const userSlice = createSlice({
  name: "users",
  initialState: { entities: [], loading: "idle", selectedUser: null },
  reducers: {
    userRemoved(state, action) {
      state.entities = state.entities.filter(
        (user) => user.id !== action.payload
      );
    },
    userSelected(state, action) {
      state.selectedUser = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = "loading";
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = "idle";
        state.entities = action.payload;
      });
  },
});
 
export const { userRemoved, userSelected } = userSlice.actions;
 
export default userSlice.reducer;