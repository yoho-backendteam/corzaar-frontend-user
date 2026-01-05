import { COLORS } from "../../../../Constants/uiconstants";
import { AttendanceOverview } from "../../../../Components/profile/Tabpages/SettingsProfile/tabs/AttendanceOverview";
import Notification from "../../../../Components/profile/Tabpages/SettingsProfile/tabs/Notification";
import { Password } from "../../../../Components/profile/Tabpages/SettingsProfile/tabs/Password";
import { PrivacySetting } from "../../../../Components/profile/Tabpages/SettingsProfile/tabs/Privacysetting";
import { Personinformation } from "../../../../Components/profile/Tabpages/SettingsProfile/tabs/personinformation";

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
        <button
          className="px-5 py-2  text-white font-semibold rounded-md hover:bg-red-700 transition"
          style={{ backgroundColor: COLORS.primary_red }}
        >
          Save Changes
        </button>
        <button
          className="px-5 py-2 font-semibold rounded-md transition"
          style={{
            border: `1px solid ${COLORS.primary_red}`,
            color: COLORS.primary_red,
          }}
          
        >
          Cancel
        </button>
      </div>

      {/* Danger Zone */}
      <div className=" rounded-2xl shadow p-6 "
      style={{backgroundColor:COLORS.primary_white}}>
        <h2 className="text-lg font-semibold mb-2 "
        style={{color:COLORS.primary_red}}>
          Danger Zone
        </h2>
        <p className="text-sm  mb-4"
        style={{color:COLORS.primary_gray}}>
          Once you delete your account, there is no going back. Please be
          certain.
        </p>
        <button
          className="px-4 py-2  text-white rounded-lg text-sm font-semibold hover:bg-red-700 transition"
          style={{ backgroundColor: COLORS.primary_red }}
        >
          Delete Account
        </button>
      </div>
    </div>
  );
};

export default Settings;
