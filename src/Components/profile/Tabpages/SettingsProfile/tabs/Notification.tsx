
import { COLORS } from "../../../../../Constants/uiconstants";
import { useAppSelector } from "../../../../../hooks/reduxhooks";

const Notification = () => {
  const notifications = useAppSelector(
    (state) => state.profile.notifications
  );

  return (
    <div className=" rounded-2xl shadow p-6 mb-6 border border-gray-200"
    style={{ backgroundColor: COLORS.primary_white}}>
      <h2 className="text-base font-semibold mb-2">Notification Preferences</h2>
      <p className="text-sm  mb-4"
      style={{ color: COLORS.primary_gray}}>
        Manage how you receive updates and alerts
      </p>

      <div className="flex flex-col gap-4">
        {notifications.map((item, index) => (
          <div key={index} className="flex justify-between items-center">
            <span className="text-sm"
            style={{ color: COLORS.primary_black}}>{item.label}</span>
            
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notification;
