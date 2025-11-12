
import type { RootState } from "../../store/store";

export const selectNotifications = (state: RootState) => state.notification.items;
export const selectNotificationsLoading = (state: RootState) => state.notification.status === "loading";
export const selectNotificationsError = (state: RootState) => state.notification.error;
export const selectNotificationsFilter = (state: RootState) => state.notification.filter;
export const selectUnreadCount = (state: RootState) => state.notification.items.filter(n => !n.isRead).length;
export const selectTotalCount = (state: RootState) => state.notification.items.length;
export const selectFilteredNotifications = (state: RootState) => {
  const { items, filter } = state.notification;
  if (filter === "all") return items;
  if (filter === "read") return items.filter(i => i.isRead);
  return items.filter(i => !i.isRead);
};
