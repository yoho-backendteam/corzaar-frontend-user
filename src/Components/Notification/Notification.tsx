
// import React, { useEffect, useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import type { AppDispatch } from "../../store/store";

// import {
//   selectFilteredNotifications,
//   selectUnreadCount,
//   selectTotalCount,
//   selectNotificationsLoading,
//   selectNotificationsError,
// } from "../../features/Notification/notificationSelector";

// import {
//   fetchNotifications,
//   fetchNotificationsByType,
//   markReadThunk,
//   deleteNotificationThunk,
// } from "../../features/Notification/notificationThunks";

// import { markLocalRead } from "../../features/Notification/notificationSlice";

// import { Trash2, CheckCheck } from "lucide-react";
// import ViewNotification from "./ViewNotification";
// import bellicon from "../../assets/Notification/bellicon.png";
// import { FONTS } from "../../Constants/uiconstants";

// type FilterType = "all" | "read" | "unread";

// const Notification: React.FC = () => {
//   const dispatch = useDispatch<AppDispatch>();
//   const notifications = useSelector(selectFilteredNotifications) ?? [];
//   const unreadCount = useSelector(selectUnreadCount) ?? 0;
//   const totalCount = useSelector(selectTotalCount) ?? 0;
//   const loading = useSelector(selectNotificationsLoading);
//   const error = useSelector(selectNotificationsError);

  
//   const filterType = useSelector((state: any) => {
//     if (!state) return "all";
//     if (!state.notifications) return "all";
//     return state.notifications.filter || "all";
//   }) as FilterType;

//   const [selectedNotification, setSelectedNotification] = useState<any | null>(null);

  
//   const fonts = {
//     boldHeading: FONTS?.boldHeading ?? {},
//     regular: FONTS?.regular ?? {},
//     medium: FONTS?.medium ?? {},
//   };

//   const filters: FilterType[] = ["all", "unread", "read"];

//   useEffect(() => {
//     dispatch(fetchNotifications());
//   }, [dispatch]);

//   const handleFilter = (type?: string) => {
//     if (!type || type === "all") {
//       dispatch(fetchNotifications());
//     } else {
//       dispatch(fetchNotificationsByType(type));
//     }
   
//     dispatch({ type: "notification/setFilter", payload: type || "all" });
//   };

//   const handleMarkAsRead = (id: string | number) => {
//     const strId = String(id);
//     dispatch(markLocalRead(strId)); 
    
//     dispatch(markReadThunk(strId) as any);
//   };

//   const handleDelete = (id: string | number) => {
//     if (!confirm("Delete this notification?")) return;
//     const strId = String(id);
//     dispatch(deleteNotificationThunk(strId));
//   };

//   const handleMarkAllAsRead = () => {
//     const unread = notifications.filter((n: any) => !(n.isRead ?? n.read));
//     unread.forEach((u: any) => {
//       const strId = String(u.id);
//       dispatch(markLocalRead(strId));
//       dispatch(markReadThunk(strId) as any);
//     });
//   };

//   return (
//     <div className="bg-yellow-400 min-h-screen px-4 sm:px-6 md:px-10 py-6">
//       {/* Header */}
//       <div className="flex flex-col gap-4 md:flex-row justify-between items-start md:items-center mb-6 space-y-3 md:space-y-0">
//         <div>
//           <h1
//             className="text-xl md:text-2xl font-semibold text-black"
//             style={{ ...fonts.boldHeading }}
//           >
//             Notifications
//           </h1>
//           <p className="text-sm text-gray-700" style={{...FONTS.regular}}>
//             Stay updated with your courses and activities
//           </p>
//         </div>

//         <button
//           onClick={handleMarkAllAsRead}
//           className="flex items-center gap-2 bg-white text-black font-medium px-4 py-2 rounded-md shadow hover:bg-gray-100 w-full sm:w-auto justify-center"
//         >
//           <CheckCheck className="w-4 h-4" style={{ ...fonts.medium }} />
//           <span style={{ ...fonts.medium }}>Mark all as read</span>
//         </button>
//       </div>

//       {/* Stats */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
//         <div className="flex justify-between items-center bg-white p-4 rounded-md shadow">
//           <div className="flex items-center gap-2">
//             <img src={bellicon} className="w-7 h-7" alt="bell" />
//             <span className="text-sm md:text-base font-medium" style={{ ...fonts.medium }}>
//               Unread
//             </span>
//           </div>
//           <span className="text-lg font-bold" style={{ ...fonts.boldHeading }}>
//             {unreadCount}
//           </span>
//         </div>

//         <div className="flex justify-between items-center bg-white p-4 rounded-md shadow">
//           <div className="flex items-center gap-2">
//             <img src={bellicon} className="w-7 h-7" alt="bell" />
//             <span className="text-sm md:text-base font-medium" style={{ ...fonts.medium }}>
//               Total
//             </span>
//           </div>
//           <span className="text-lg font-bold" style={{ ...fonts.boldHeading }}>
//             {totalCount}
//           </span>
//         </div>
//       </div>

      
//       <div
//         className="flex flex-wrap gap-2 justify-center sm:justify-start items-center sm:gap-3 mb-6 text-center"
//         style={{ ...fonts.medium }}
//       >
//         {filters.map((f) => (
//           <button
//             key={f}
//             onClick={() => {
//               handleFilter(f);
//             }}
//             className={`px-4 py-2 rounded-md text-sm font-medium capitalize transition-all
//               ${
//                 filterType === f
//                   ? "bg-red-600 text-white shadow"
//                   : "bg-white text-black border border-gray-300 hover:bg-gray-100"
//               }`}
//           >
//             {f === "all"
//               ? `All (${totalCount})`
//               : f === "unread"
//               ? `Unread (${unreadCount})`
//               : `Read (${Number(totalCount) - Number(unreadCount)})`}
//           </button>
//         ))}
//       </div>

      
//       <div className="space-y-4">
        
//         {loading && (
//           <div className="text-center py-8">
//             <div className="bg-white p-4 rounded-md shadow inline-block">Loading notifications...</div>
//           </div>
//         )}

//         {!loading && error && (
//           <div className="text-center py-8">
//             <div className="bg-red-50 p-4 rounded-md shadow inline-block text-red-700">{error}</div>
//           </div>
//         )}

//         {!loading && !error && notifications && notifications.length > 0 ? (
//           notifications.map((n: any) => {
//             const isRead = n.isRead ?? n.read ?? false;
//             return (
//               <div
//                 key={n.id}
//                 className={`bg-white p-4 rounded-md shadow border-l-4 border-t-[1px] border-b-[1px] flex flex-col sm:flex-row justify-between sm:items-center gap-3 sm:gap-4
//                 ${
//                   n.type === "offer"
//                     ? "border-[#9810FA]"
//                     : n.type === "payment" || n.type === "completed"
//                     ? "border-[#00A63E]"
//                     : "border-[#155DFC]"
//                 } ${!isRead ? "bg-blue-50" : ""}`}
//               >
//                 <div className="flex items-start gap-3">
//                   <img
//                     src={n.raw?.img ?? n.img ?? bellicon}
//                     alt={n.title ?? "notification"}
//                     className="w-8 h-8 rounded object-cover"
//                     onError={(e) => {
//                       (e.target as HTMLImageElement).src = bellicon;
//                     }}
//                   />
//                   <div>
//                     <h2 className="font-semibold text-gray-800 text-sm sm:text-base" style={{ ...fonts.medium }}>
//                       {n.title ?? "Untitled"}
//                     </h2>
//                     <p className="text-sm text-gray-600 leading-snug" style={{ ...fonts.regular }}>
//                       {n.message ?? ""}
//                     </p>
//                     <p className="text-xs text-gray-400 mt-2" style={{ ...fonts.medium }}>
//                       {n.createdAt ? new Date(n.createdAt).toLocaleString() : n.time ?? ""}
//                     </p>
//                   </div>
//                 </div>

//                 <div className="flex sm:flex-nowrap items-center gap-2 sm:gap-3 flex-wrap justify-end">
//                   {!isRead && (
//                     <button
//                       onClick={() => handleMarkAsRead(n.id)}
//                       className="text-sm text-gray-800 hover:underline whitespace-nowrap"
//                       style={{ ...fonts.medium }}
//                     >
//                       Mark as read
//                     </button>
//                   )}

//                   <button
//                     onClick={() => setSelectedNotification(n)}
//                     className="text-black px-3 py-1 rounded text-sm font-medium bg-[#FFDD00] whitespace-nowrap"
//                     style={{ ...fonts.medium }}
//                   >
//                     View
//                   </button>

//                   <button
//                     onClick={() => handleDelete(n.id)}
//                     className="text-[#ED1C24] flex items-center p-1 justify-center"
//                     title="Delete"
//                   >
//                     <Trash2 className="w-5 h-5" />
//                   </button>
//                 </div>
//               </div>
//             );
//           })
//         ) : (
//           !loading &&
//           !error && (
//             <div className="text-center py-12">
//               <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
//                 <img src={bellicon} alt="No notifications" className="w-16 h-16 mx-auto mb-4 opacity-50" />
//                 <h3 className="text-xl font-semibold text-gray-900 mb-2" style={{ ...fonts.boldHeading }}>
//                   No notifications found
//                 </h3>
//                 <p className="text-gray-600" style={{ ...fonts.regular }}>
//                   {filterType === "all"
//                     ? "You don't have any notifications yet."
//                     : filterType === "unread"
//                     ? "You don't have any unread notifications."
//                     : "You don't have any read notifications."}
//                 </p>
//               </div>
//             </div>
//           )
//         )}
//       </div>

      
//       {selectedNotification && (
//         <ViewNotification
//           notification={selectedNotification}
//           onClose={() => setSelectedNotification(null)}
//           onDelete={(id) => {
//             dispatch(deleteNotificationThunk(String(id)));
//             setSelectedNotification(null);
//           }}
//         />
//       )}
//     </div>
//   );
// };

// export default Notification;
