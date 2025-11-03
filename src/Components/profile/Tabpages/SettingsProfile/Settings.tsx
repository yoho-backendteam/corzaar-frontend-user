import { AttendanceOverview } from "./tabs/AttendanceOverview";
import Notification from "./tabs/Notification";
import { Password } from "./tabs/Password";
import { PrivacySetting } from "./tabs/Privacysetting";
import { Personinformation } from "./tabs/personinformation";

export const Settings = () => {
  return (
    <div className="  space-y-6">
      <Personinformation />
      <AttendanceOverview />
      <Notification />
      <PrivacySetting />

      {/* Password */}
      <Password />

      {/* Save / Cancel Buttons */}
      <div className="flex justify-end gap-4">
        <button className="px-5 py-2 bg-[#ED1C24] text-white font-semibold rounded-md hover:bg-red-700 transition">
          Save Changes
        </button>
        <button className="px-5 py-2 border border-[#ED1C24] text-[#ED1C24] font-semibold rounded-md hover:bg-red-100 transition">
          Cancel
        </button>
      </div>

      {/* Danger Zone */}
      <div className="bg-white rounded-2xl shadow p-6 border border-gray-200">
        <h2 className="text-lg font-semibold mb-2 text-[#ED1C24]">Danger Zone</h2>
        <p className="text-sm text-gray-600 mb-4">
          Once you delete your account, there is no going back. Please be
          certain.
        </p>
        <button className="px-4 py-2 bg-[#ED1C24] text-white rounded-lg text-sm font-semibold hover:bg-red-700 transition">
          Delete Account
        </button>
      </div>
    </div>
  );
};

export default Settings;
