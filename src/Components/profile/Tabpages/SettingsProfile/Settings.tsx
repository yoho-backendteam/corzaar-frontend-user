import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { COLORS } from "../../../../Constants/uiconstants";
import { AttendanceOverview } from "./tabs/AttendanceOverview";
import Notification from "./tabs/Notification";
import { Password } from "./tabs/Password";
import { Personinformation } from "./tabs/personinformation";
import { PrivacySetting } from "./tabs/Privacysetting";
import type { AppDispatch } from "../../../../store/store";
import { useEffect } from "react";
import { setAttendanceData, setProfileData } from "../../../../features/settings/reducers/settingThunks";
import { attendanceSelect, profileSelect } from "../../../../features/settings/reducers/settingSelectors";
import type { ProfileResponse } from "../../../../features/settings/types/settingTypes";

export const Settings: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  // Profile data
  useEffect(() => {
    const fetchProfileData = async (): Promise<void> => {
      try {
        const id = "68fb60f726d15f4ca736ff1d";
        await dispatch(setProfileData(id));
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.error("Profile fetch error:", error.message);
        }
      }
    };

    fetchProfileData();
  }, [dispatch]);

  const profileData: ProfileResponse | null = useSelector(profileSelect);

  // Attendance data
  useEffect(() => {
    const fetchAttendanceData = async (): Promise<void> => {
      try {
        const id = "68fb60f726d15f4ca736ff1d";
        await dispatch(setAttendanceData(id));
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.error("Attendance fetch error:", error.message);
        }
      }
    };

    fetchAttendanceData();
  }, [dispatch]);

  const attendance = useSelector(attendanceSelect);

  return (
    <div className="space-y-6">
      <Personinformation profile={profileData} />
      <AttendanceOverview />
      <Notification />
      <PrivacySetting />

      {/* Password */}
      <Password />

      {/* Save / Cancel Buttons */}
      <div className="flex justify-end gap-4">
        <button
          className="px-5 py-2 text-white font-semibold rounded-md hover:bg-red-700 transition"
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
      <div 
        className="rounded-2xl shadow p-6"
        style={{ backgroundColor: COLORS.primary_white }}
      >
        <h2 
          className="text-lg font-semibold mb-2"
          style={{ color: COLORS.primary_red }}
        >
          Danger Zone
        </h2>
        <p 
          className="text-sm mb-4"
          style={{ color: COLORS.primary_gray }}
        >
          Once you delete your account, there is no going back. Please be
          certain.
        </p>
        <button
          className="px-4 py-2 text-white rounded-lg text-sm font-semibold hover:bg-red-700 transition"
          style={{ backgroundColor: COLORS.primary_red }}
        >
          Delete Account
        </button>
      </div>
    </div>
  );
};

export default Settings;