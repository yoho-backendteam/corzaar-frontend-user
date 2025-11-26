// import { createSlice,type PayloadAction } from "@reduxjs/toolkit";
// import { notificationsData, type Notification } from "../../redux/Notification/data";

// interface NotificationState {
//   error: any;
//   loading: any;
//   notifications: any;
//   list: Notification[];
//   filter: "all" | "read" | "unread";
// }

// const initialState: NotificationState = {
//   list: notificationsData,
//   filter: "all",
// };

// const notificationSlice = createSlice({
//   name: "notifications",
//   initialState,
//   reducers: {
//     markAsRead: (state, action: PayloadAction<number>) => {
//       const notif = state.list.find((n) => n.id === action.payload);
//       if (notif) notif.read = true;
//     },
//     markAllAsRead: (state) => {
//       state.list.forEach((n) => (n.read = true));
//     },
//     deleteNotification: (state, action: PayloadAction<number>) => {
//       state.list = state.list.filter((n) => n.id !== action.payload);
//     },
//     setFilter: (state, action: PayloadAction<"all" | "read" | "unread">) => {
//       state.filter = action.payload;
//     },
//   },
// });

// export const {
//   markAsRead,
//   markAllAsRead,
//   deleteNotification,
//   setFilter,
// } = notificationSlice.actions;

// export default notificationSlice.reducer;
