import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { loginStart, loginSuccess, loginFail } from "../reducers/authReducer";
import { LoginCredentials, RegisterCredentials } from "../../types";

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (credentials: LoginCredentials, { dispatch }) => {
    dispatch(loginStart());
    try {
      const response = await axios.post(
        "https://reqres.in/api/login",
        credentials
      );
      dispatch(loginSuccess(response.data.token));
      localStorage.setItem("token", response.data.token);
    } catch (error) {
      dispatch(loginFail("Login failed"));
    }
  }
);

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (credentials: RegisterCredentials, { dispatch }) => {
    dispatch(loginStart());
    try {
      const response = await axios.post(
        "https://reqres.in/api/register",
        credentials
      );
      dispatch(loginSuccess(response.data.token));
      localStorage.setItem("token", response.data.token);
    } catch (error) {
      dispatch(loginFail("Registration failed"));
    }
  }
);
