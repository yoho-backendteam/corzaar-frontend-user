import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { Trash2 } from "lucide-react";
import ViewNotification from "./ViewNotification";
import bellicon from "../../assets/Notification/bellicon.png";
import { FONTS } from "../../Constants/uiconstants";

import { setFilter } from "../../features/notification/reducers/slice";
import {
  selectFilteredNotifications,
  selectUnreadCount,
  selectTotalCount,
} from "../../features/notification/reducers/selector";

import {
  markNotificationAsRead,
  deleteNotification,
  fetchAllNotifications,
  fetchNotificationById,
} from "../../features/notification/reducers/thunks";

const Notification: React.FC = () => {
  const dispatch = useDispatch();

  const notifications = useSelector(selectFilteredNotifications);
  const unreadCount = useSelector(selectUnreadCount);
  const totalCount = useSelector(selectTotalCount);
  const filterType = useSelector((state: any) => state.notifications.filter);

  const [selectedNotification, setSelectedNotification] = useState<any | null>(
    null
  );

  useEffect(() => {
    dispatch(fetchAllNotifications() as any);
  }, [dispatch]);

 
 const handleView = async (id: string) => {
  try {
    const resultAction: any = await dispatch(fetchNotificationById(id) as any);
    if (fetchNotificationById.fulfilled.match(resultAction)) {
      const notificationData = resultAction.payload;
      setSelectedNotification(notificationData);

      if (!notificationData.isRead) {
        dispatch(markNotificationAsRead(id) as any);
      }
    }
  } catch (err) {
    console.error("Failed to fetch notification", err);
  }
};



  const handleMarkAsRead = (id: string) => {
    dispatch(markNotificationAsRead(id) as any);
  };

  const handleDelete = (id: string) => {
    dispatch(deleteNotification(id) as any);
    if (selectedNotification?._id === id) {
      setSelectedNotification(null);
    }
  };




  return (
    <div className="bg-yellow-400 min-h-screen px-4 sm:px-6 md:px-10 py-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row justify-between items-start md:items-center mb-6 space-y-3 md:space-y-0">
        <div>
          <h1
            className="text-xl md:text-2xl font-semibold text-black"
            style={{ ...FONTS.boldHeading }}
          >
            Notifications
          </h1>
          <p className="text-sm text-gray-700" style={{ ...FONTS.regular }}>
            Stay updated with your courses and activities
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div className="flex justify-between items-center bg-white p-4 rounded-md shadow">
          <div className="flex items-center gap-2">
            <img src={bellicon} className="w-7 h-7" />
            <span className="text-sm md:text-base font-medium" style={{ ...FONTS.medium }}>
              Unread
            </span>
          </div>
          <span className="text-lg font-bold" style={{ ...FONTS.boldHeading }}>
            {unreadCount}
          </span>
        </div>

        <div className="flex justify-between items-center bg-white p-4 rounded-md shadow">
          <div className="flex items-center gap-2">
            <img src={bellicon} className="w-7 h-7" />
            <span className="text-sm md:text-base font-medium" style={{ ...FONTS.medium }}>
              Total
            </span>
          </div>
          <span className="text-lg font-bold" style={{ ...FONTS.boldHeading }}>
            {totalCount}
          </span>
        </div>
      </div>

      {/* Filter Buttons */}
      <div
        className="flex flex-wrap gap-2 justify-center sm:justify-start items-center sm:gap-3 mb-6 text-center"
        style={{ ...FONTS.medium }}
      >
        {["all", "unread", "read"].map((f) => (
          <button
            key={f}
            onClick={() => dispatch(setFilter(f as any))}
            className={`px-4 py-2 rounded-md text-sm font-medium capitalize transition-all ${
              filterType === f
                ? "bg-red-600 text-white shadow"
                : "bg-white text-black border border-gray-300 hover:bg-gray-100"
            }`}
          >
            {f === "all"
              ? `All (${totalCount})`
              : f === "unread"
              ? `Unread (${unreadCount})`
              : `Read (${totalCount - unreadCount})`}
          </button>
        ))}
      </div>

      {/* Notification List */}
      <div className="space-y-4">
        {notifications.map((n: any) => (
          <div
            key={n._id}
            className={`bg-white p-4 rounded-md shadow border-l-4 border-t border-b flex flex-col sm:flex-row justify-between sm:items-center gap-3 sm:gap-4 ${
              n.type === "student"
                ? "border-[#9810FA]"
                : n.type === "merchant"
                ? "border-[#00A63E]"
                : "border-[#155DFC]"
            }`}
          >
            <div className="flex items-start gap-3">
              <img src={bellicon} alt={n.title} className="w-8 h-8" />
              <div>
                <h2 className="font-semibold text-gray-800 text-sm sm:text-base" style={{ ...FONTS.medium }}>
                  {n.title}
                </h2>
                <p className="text-sm text-gray-600 leading-snug" style={{ ...FONTS.regular }}>
                  {n.message}
                </p>
                <p className="text-xs text-gray-400 mt-2" style={{ ...FONTS.medium }}>
                  {new Date(n.createdAt).toLocaleString()}
                </p>
              </div>
            </div>

            <div className="flex sm:flex-nowrap items-center gap-2 sm:gap-3 flex-wrap justify-end">
              {!n.isRead && (
                <button
                  onClick={() => handleMarkAsRead(n._id)}
                  className="text-sm text-gray-800 hover:underline whitespace-nowrap"
                  style={{ ...FONTS.medium }}
                >
                  Mark as read
                </button>
              )}

              <button
                onClick={() => handleView(n._id)}
                className="text-black px-3 py-1 rounded text-sm font-medium bg-[#FFDD00] whitespace-nowrap"
                style={{ ...FONTS.medium }}
              >
                View
              </button>

              <button
                onClick={() => handleDelete(n._id)}
                className="text-[#ED1C24] flex items-center p-1 justify-center"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>

 {selectedNotification && (
  <ViewNotification
    notification={{
      id: selectedNotification._id,
      title: selectedNotification.title || "No Title",
      message: selectedNotification.message || "No Message",
      time: selectedNotification.createdAt
        ? new Date(selectedNotification.createdAt).toLocaleString()
        : "No Date",
      type: selectedNotification.type || "general",
    }}
    onClose={() => setSelectedNotification(null)}
    onDelete={() => handleDelete(selectedNotification._id)}
  />
)}


    </div>
  );
};

export default Notification;
