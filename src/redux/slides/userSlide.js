import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  avatar: "",
  access_token: "",
  refreshToken: "",
  id: "",
  isAdmin: false,
};

export const userSlide = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUser: (state, action) => {
      const {
        name = "",
        email = "",
        phone = "",
        address = "",
        city = "",
        avatar = "",
        access_token = "",
        refreshToken = "",
        _id = "",
        isAdmin,
      } = action.payload;

      state.name = name;
      state.email = email;
      state.phone = phone;
      state.address = address;
      state.city = city;
      state.avatar = avatar;
      state.access_token = access_token;
      state.refreshToken = refreshToken;
      state.id = _id;
      state.isAdmin = isAdmin;
    },
    resetUser: (state) => {
      state.name = "";
      state.email = "";
      state.phone = "";
      state.address = "";
      state.city = "";
      state.avatar = "";
      state.access_token = "";
      state.refreshToken = "";
      state.id = "";
      state.isAdmin = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateUser, resetUser } = userSlide.actions;

export default userSlide.reducer;
