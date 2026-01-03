import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import type { Notification } from "../../../features/notification/notificationtype";
import {
  fetchAllNotifications,
  createNotification,
  updateNotification,
  markNotificationAsRead,
  deleteNotification,
} from "../reducers/thunks";

interface NotificationState {
  notifications: Notification[];
  loading: boolean;
  error: string | null;
  filter: "all" | "unread" | "read";   
}

const initialState: NotificationState = {
  notifications: [],
  loading: false,
  error: null,
  filter: "all",                     
};

const notificationSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    setFilter: (state, action: PayloadAction<"all" | "unread" | "read">) => {
      state.filter = action.payload;   
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchAllNotifications.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllNotifications.fulfilled, (state, action: PayloadAction<Notification[]>) => {
        state.loading = false;
        state.notifications = action.payload;
      })
      .addCase(fetchAllNotifications.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(createNotification.fulfilled, (state, action: PayloadAction<Notification>) => {
        state.notifications.unshift(action.payload);
      })

      .addCase(markNotificationAsRead.fulfilled, (state, action: PayloadAction<Notification>) => {
        const index = state.notifications.findIndex((n) => n.id === action.payload.id);
        if (index !== -1) state.notifications[index].isRead = true;
      })

      .addCase(updateNotification.fulfilled, (state, action: PayloadAction<Notification>) => {
        const index = state.notifications.findIndex((n) => n.id === action.payload.id);
        if (index !== -1) state.notifications[index] = action.payload;
      })

      .addCase(deleteNotification.fulfilled, (state, action: PayloadAction<Notification>) => {
        state.notifications = state.notifications.filter((n) => n.id !== action.payload.id);
      });
  },
});

export const { setFilter } = notificationSlice.actions;
export default notificationSlice.reducer;
