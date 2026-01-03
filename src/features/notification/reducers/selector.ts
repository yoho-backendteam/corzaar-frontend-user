import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "../../../store/store";

export const selectNotifications = (state: RootState) =>
  state.notifications.notifications || [];

export const selectNotificationLoading = (state: RootState) =>
  state.notifications.loading;

export const selectNotificationError = (state: RootState) =>
  state.notifications.error;

export const selectNotificationFilter = (state: RootState) =>
  state.notifications.filter;

export const selectFilteredNotifications = createSelector(
  [selectNotifications, selectNotificationFilter],
  (notifications, filter) => {
    if (!Array.isArray(notifications)) return [];
    if (filter === "read") return notifications.filter((n) => n.isRead);
    if (filter === "unread") return notifications.filter((n) => !n.isRead);
    return notifications;
  }
);

export const selectUnreadCount = createSelector([selectNotifications], (list) =>
  Array.isArray(list) ? list.filter((n) => !n.isRead).length : 0
);

export const selectTotalCount = createSelector([selectNotifications], (list) =>
  Array.isArray(list) ? list.length : 0
);
