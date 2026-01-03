import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getAllNotificationsService,
  getNotificationsByTypeService,
  getNotificationByIdService,
  createNotificationService,
  updateNotificationService,
  markNotificationAsReadService,
  deleteNotificationService,
} from "../../../features/notification/services/notificationservice";
import type { CreateNotificationPayload, UpdateNotificationPayload } from "../../../features/notification/notificationtype";

// Fetch all notifications
export const fetchAllNotifications = createAsyncThunk(
  "notifications/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getAllNotificationsService(); // { success: true, data: [...] }
      return response.data; // ⚡ only the notifications array
    } catch (err: any) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);


// Fetch notifications by type
export const fetchNotificationsByType = createAsyncThunk(
  "notifications/fetchByType",
  async (type: string, { rejectWithValue }) => {
    try {
      return await getNotificationsByTypeService(type);
    } catch (err: any) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Fetch by ID


export const fetchNotificationById = createAsyncThunk(
  "notifications/fetchById",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await getNotificationByIdService(id);
      return response.data; 
    } catch (err: any) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);


// Create notification
export const createNotification = createAsyncThunk(
  "notifications/create",
  async (data: CreateNotificationPayload, { rejectWithValue }) => {
    try {
      return await createNotificationService(data);
    } catch (err: any) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Update notification
export const updateNotification = createAsyncThunk(
  "notifications/update",
  async ({ id, data }: { id: string; data: UpdateNotificationPayload }, { rejectWithValue }) => {
    try {
      return await updateNotificationService(id, data);
    } catch (err: any) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Mark as read
export const markNotificationAsRead = createAsyncThunk(
  "notifications/markAsRead",
  async (id: string, { rejectWithValue }) => {
    try {
      return await markNotificationAsReadService(id);
    } catch (err: any) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Delete notification
export const deleteNotification = createAsyncThunk(
  "notifications/delete",
  async (id: string, { rejectWithValue }) => {
    try {
      return await deleteNotificationService(id);
    } catch (err: any) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);
