import { createAsyncThunk } from "@reduxjs/toolkit";
import { QueryService } from "../../apis";
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


// get
export const fetchQueriesThunk = createAsyncThunk(
  "queries/fetchAll",
  async (
    { senderId, senderRole }: { senderId: string; senderRole: string },
    { rejectWithValue }
  ) => {
    try {
      // ✅ Pass as two arguments now
      const response = await QueryService.getQueries(senderId, senderRole);
      console.log("Fetched Queries:", response.data);
      return response.data;
    } catch (error: any) {
      console.error("Error fetching queries:", error);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);




