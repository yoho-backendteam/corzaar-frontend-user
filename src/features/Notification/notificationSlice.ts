
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { NotificationItem } from "../../features/Notification/Types/Index";

type State = {
  items: NotificationItem[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  filter: "all" | "read" | "unread";
};

const initialState: State = {
  items: [],
  status: "idle",
  error: null,
  filter: "all",
};

const notificationsSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setNotifications(state, action: PayloadAction<NotificationItem[]>) {
      state.items = action.payload;
      state.status = "succeeded";
      state.error = null;
    },
    setLoading(state) {
      state.status = "loading";
      state.error = null;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.status = "failed";
      state.error = action.payload;
    },
    markLocalRead(state, action: PayloadAction<string>) {
      const id = action.payload;
      const it = state.items.find((x) => x.id === id);
      if (it) it.isRead = true;
    },
    removeLocal(state, action: PayloadAction<string>) {
      state.items = state.items.filter((x) => x.id !== action.payload);
    },
    setFilter(state, action: PayloadAction<State["filter"]>) {
      state.filter = action.payload;
    },
  },
});

export const { setNotifications, setLoading, setError, markLocalRead, removeLocal, setFilter } =
  notificationsSlice.actions;

export default notificationsSlice.reducer;
