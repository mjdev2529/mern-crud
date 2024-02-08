import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  loading: false,
  error: false,
  credsData: null,
  clientId: null
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signInStart: (state) => {
      state.loading = true;
    },
    signInSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = false;
    },
    signInFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateUserStart: (state) => {
      state.loading = true;
    },
    updateUserSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = false;
    },
    updateUserFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteUserStart: (state) => {
      state.loading = true;
    },
    deleteUserSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = false;
    },
    deleteUserFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    signOut: (state, action) => {
      state.currentUser = null;
      state.loading = false;
      state.error = false;
    },
    setCredsData: (state, action) => {
      state.credsData = action.payload;
    },
    setStart: (state, action) => {
      state.loading = true;
    },
    setSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = false;
    },
    setFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearStatus: (state) => {
      state.loading = false;
      state.error = false;
    },
    setClientId: (state, action) => {
      state.clientId = action.payload;
    },
  },
});

export const {
  signInStart,
  signInSuccess,
  signInFailure,
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  signOut,
  setCredsData,
  setStart,
  setSuccess,
  setFailure,
  clearStatus,
  setClientId
} = userSlice.actions;
export default userSlice.reducer;
