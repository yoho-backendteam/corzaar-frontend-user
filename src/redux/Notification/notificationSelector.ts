// import {type RootState } from "../../store/store";

// export const selectAllNotifications = (state: RootState) =>
//   state.notifications.list;

// export const selectFilteredNotifications = (state: RootState) => {
//   const { list, filter } = state.notifications;
//   if (filter === "read") return list.filter((n) => n.read);
//   if (filter === "unread") return list.filter((n) => !n.read);
//   return list;
// };

// export const selectUnreadCount = (state: RootState) =>
//   state.notifications.list.filter((n) => !n.read).length;

// export const selectTotalCount = (state: RootState) =>
//   state.notifications.list.length;
