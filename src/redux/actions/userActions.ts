import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { User } from "../../types";

export const fetchUsers = createAsyncThunk<User[], number>(
  "users/fetchUsers",
  async (page = 1) => {
    const response = await axios.get(
      `https://reqres.in/api/users?page=${page}&per_page=8`
    );
    console.log(response.data.data);
    return response.data.data;
  }
);

export const fetchUser = createAsyncThunk<User, number>(
  "users/fetchUser",
  async (id: number) => {
    const response = await axios.get(`https://reqres.in/api/users/${id}`);
    return response.data.data;
  }
);
