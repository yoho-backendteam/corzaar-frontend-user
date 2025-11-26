import React from "react";

import offericon1 from "../../assets/Notification/offericon1.png"
import closeicon from "../../assets/Notification/closeicon.png"
import deleteicon from "../../assets/Notification/deleteicon.png"
import { FONTS } from "../../Constants/uiconstants";

interface ViewNotificationProps {
    notification: {
  id: number;
  title: string;
  message: string;
  time: string;
  type: string;
}

    onClose: () => void;
    onDelete: (id: number) => void;
}

const ViewNotification: React.FC<ViewNotificationProps> = ({
    notification,
    onClose,
    onDelete,
}) => {
    if (!notification) return null;

    return (
        <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50 px-3">
            <div className="bg-white rounded-xl shadow-lg w-full max-w-sm sm:max-w-md md:max-w-lg p-5 relative animate-fadeIn">

                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-red-500"
                >
                    <img src={closeicon} className="w-5 h-5" />

                </button>

                <div className="flex items-center gap-3 mb-8">
  <div>
    <span className="text-lg">
      <img src={offericon1} alt="icon" className="w-8 h-8" />
    </span>
  </div>
  <div>
    <h2 className="text-lg font-bold text-gray-800" style={{ ...FONTS.medium }}>
      {notification.title}
    </h2>
    <p className="text-xs text-gray-500" style={{ ...FONTS.regular }}>
      {notification.time}
    </p>
  </div>
</div>

<div className="mb-4">
  <h3 className="font-medium text-gray-700 mb-1" style={{ ...FONTS.medium }}>Message</h3>
  <p className="text-sm text-gray-600" style={{ ...FONTS.regular }}>
    {notification.message}
  </p>
</div>


                <h2>Action</h2>
                <div className="flex justify-between items-center mt-2">
                    <button
                        onClick={onClose}
                        className="bg-[#ED1C24] text-white px-4 py-2 rounded-md text-sm " style={{ ...FONTS.medium }}>
                        View Details
                    </button>
                </div>

                <div className="flex justify-between mt-10">
                    <div>
                        <button className="px-2 rounded-full border border-[#9810FA] text-[#9810FA]" style={{ ...FONTS.medium }}>Promo</button>
                    </div>
                    <button
                        onClick={() => onDelete(notification.id)}
                        className="flex items-center gap-1 bg-[#ED1C24] text-white px-4 py-2 rounded-md text-sm " style={{ ...FONTS.medium }}>
                        <img src={deleteicon} className="w-4 h-4" style={{ ...FONTS.medium }} />
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ViewNotification;
