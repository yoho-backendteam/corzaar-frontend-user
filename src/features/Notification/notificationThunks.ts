
import type { AppDispatch } from "../../store/store";
import {
  getAllNotifications,
  getNotificationsByType,
  markNotificationAsReadAPI,
  deleteNotificationAPI,
  createNotificationAPI,
  getNotificationByIdAPI,
  updateNotificationAPI,
  webshowAPI,
} from "../../features/Notification/Service";
import { setLoading, setNotifications, setError, markLocalRead, removeLocal } from "./notificationSlice";
import type { NotificationItem, RawNotification } from "./Types/Index";


export const fetchNotifications = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(setLoading());
    const resp = await getAllNotifications();
    const payload = resp?.data ?? resp;
    const arr: RawNotification[] = Array.isArray(payload) ? payload : Array.isArray(payload?.data) ? payload.data : [];

    const mapped: NotificationItem[] = arr.map((n: RawNotification) => ({
      id: (n._id ?? n.id ?? n.notificationId ?? String(Math.random())),
      title: n.title ?? "No title",
      message: n.message ?? "",
      type: n.type,
      receiverId: n.receiverId,
      isRead: !!n.isRead,
      createdAt: n.createdAt,
      readAt: n.readAt,
      raw: n,
    }));

    dispatch(setNotifications(mapped));
  } catch (err: any) {
    const msg = err?.response?.data?.message ?? err?.message ?? "Network error";
    dispatch(setError(msg));
  }
};


export const fetchNotificationsByType = (type?: string) => async (dispatch: AppDispatch) => {
  try {
    dispatch(setLoading());
    const resp = await getNotificationsByType(type);
    const payload = resp?.data ?? resp;
    const arr: RawNotification[] = Array.isArray(payload) ? payload : Array.isArray(payload?.data) ? payload.data : [];

    const mapped: NotificationItem[] = arr.map((n: RawNotification) => ({
      id: (n._id ?? n.id ?? n.notificationId ?? String(Math.random())),
      title: n.title ?? "No title",
      message: n.message ?? "",
      type: n.type,
      receiverId: n.receiverId,
      isRead: !!n.isRead,
      createdAt: n.createdAt,
      readAt: n.readAt,
      raw: n,
    }));

    dispatch(setNotifications(mapped));
  } catch (err: any) {
    const msg = err?.response?.data?.message ?? err?.message ?? "Network error";
    dispatch(setError(msg));
  }
};

 

export const markReadThunk = (id: string) => async (dispatch: AppDispatch) => {
  try {
    
    console.log(" Dispatching to API...");

    const response = await markNotificationAsReadAPI(id);
    
    console.log(" API Response:", response);


    dispatch(markLocalRead(id));
    
    

  } catch (err: any) {
    
  }
};


export const deleteNotificationThunk = (id: string) => async (dispatch: AppDispatch) => {
  try {
    await deleteNotificationAPI(id);
    dispatch(removeLocal(id));
  } catch (err: any) {
    console.error("deleteNotificationThunk error:", err);
  }
};


export const createNotificationThunk = (data: Partial<RawNotification>) => async (dispatch: AppDispatch) => {
  try {
    dispatch(setLoading());
    const resp = await createNotificationAPI(data);
    
    dispatch(fetchNotifications());
    return resp;
  } catch (err: any) {
    const msg = err?.response?.data?.message ?? err?.message ?? "Network error";
    dispatch(setError(msg));
  }
};


export const getNotificationByIdThunk = (id: string) => async (dispatch: AppDispatch) => {
  try {
    dispatch(setLoading());
    const resp = await getNotificationByIdAPI(id);
    const n: RawNotification = resp?.data ?? resp;
    const mapped: NotificationItem = {
      id: (n._id ?? n.id ?? n.notificationId ?? String(Math.random())),
      title: n.title ?? "No title",
      message: n.message ?? "",
      type: n.type,
      receiverId: n.receiverId,
      isRead: !!n.isRead,
      createdAt: n.createdAt,
      readAt: n.readAt,
      raw: n,
    };
    dispatch(setNotifications([mapped])); 
    return mapped;
  } catch (err: any) {
    const msg = err?.response?.data?.message ?? err?.message ?? "Network error";
    dispatch(setError(msg));
  }
};


export const updateNotificationThunk = (id: string, data: Partial<RawNotification>) => async (dispatch: AppDispatch) => {
  try {
    dispatch(setLoading());
    const resp = await updateNotificationAPI(id, data);
    
    dispatch(fetchNotifications());
    return resp;
  } catch (err: any) {
    const msg = err?.response?.data?.message ?? err?.message ?? "Network error";
    dispatch(setError(msg));
  }
};


export const webshowThunk = (data: any) => async (dispatch: AppDispatch) => {
  try {
    dispatch(setLoading());
    const resp = await webshowAPI(data);
    return resp;
  } catch (err: any) {
    const msg = err?.response?.data?.message ?? err?.message ?? "Network error";
    dispatch(setError(msg));
  }
};
