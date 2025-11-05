import tick from "../../../../../assets/profile/icons/tick.png";
import { COLORS } from "../../../../../Constants/uiconstants";
export const Password = () => {
  return (
    <div
      className=" rounded-2xl shadow p-6 mb-6 "
      style={{ backgroundColor: COLORS.primary_white }}
    >
      <h2 className="text-base font-semibold mb-2">Password & Security</h2>
      <button
        className="mt-3 flex items-center gap-2 px-4 py-2  rounded-lg text-sm font-medium"
        style={{ color: `${COLORS.primary_gray}1A` }}
      >
        <span>
          <img src={tick} alt="" />
        </span>
        Change Password
      </button>
    </div>
  );
};
