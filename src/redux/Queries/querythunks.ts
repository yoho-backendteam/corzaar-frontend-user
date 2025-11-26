// src/redux/Queries/querythunks.ts
import { createAsyncThunk } from "@reduxjs/toolkit";
import type { QueryFormData } from "./querytypes";
import { getAllQueries, sendQuery } from "./Services";

export const sendQueryThunk = createAsyncThunk(
  "query/sendQuery",
  async (form: QueryFormData, { rejectWithValue }) => {
    try {
    

      const payload = {
        ...form,
      
      };

      console.log("Sending query payload:", payload);

      const response = await sendQuery(payload);
      if (!response) {
        console.error("No response from sendQuery");
        return rejectWithValue("No response from server");
      }

      console.log("Response:", response.data);
      return response.data;

    } catch (error: any) {
      console.error("API Error:", error.response?.data || error.message);
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

      const response = await getAllQueries(senderId, senderRole);
      if (!response) {
        console.error("No response from getAllQueries");
        return rejectWithValue("No response from server");
      }

      console.log("Fetched queries:", response.data);
      return response.data;

    } catch (error: any) {
      console.error("API Error:", error.response?.data || error.message);
      return rejectWithValue(error.response?.data?.Message || "Something went wrong");
    }
  }
);



