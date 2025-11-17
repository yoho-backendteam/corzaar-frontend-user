// src/redux/Queries/querythunks.ts
import { createAsyncThunk } from "@reduxjs/toolkit";
import type { QueryFormData } from "./querytypes";

export const sendQueryThunk = createAsyncThunk(
  "query/sendQuery",
  async (form: QueryFormData, { rejectWithValue }) => {
    try {
      const senderid = localStorage.getItem("userId");
      const senderrole = localStorage.getItem("userRole");

      if (!senderid || !senderrole) {
        return rejectWithValue("Missing sender ID or sender role. Please log in again.");
      }

      const payload = {
        ...form,
        senderid,
        senderrole,
      };

      console.log(" Sending query payload:", payload);

      const response = await QueryService.sendQuery(payload);
      console.log(" Response:", response.data);

      return response.data;
    } catch (error: any) {
      console.error(" API Error:", error.response?.data || error.message);
      return rejectWithValue(error.response?.data?.Message || "Something went wrong");
    }
  }
);

export const fetchQueriesThunk = createAsyncThunk(
  "query/fetchQueries",
  async (_, { rejectWithValue }) => {
    try {

      const senderId = "6911e5ff6d24e24cd43b4f0a";
      const senderRole = "User";


      if (!senderId || !senderRole) {
        return rejectWithValue("Missing sender ID or sender role. Please log in again.");
      }

      const response = await QueryService.getQueries(senderId, senderRole);
      console.log("Fetched queries:", response.data);

      return response.data;
    } catch (error: any) {
      console.error("API Error:", error.response?.data || error.message);
      return rejectWithValue(error.response?.data?.Message || "Something went wrong");
    }
  }
);


