/* eslint-disable @typescript-eslint/no-explicit-any */
import { COLORS } from "../../../../../Constants/uiconstants";
// import type { PersonInformationProps } from "../../../../../features/settings/types/settingTypes";

export const Personinformation = ({ profile }: any) => {
  console.log(profile, "infr");
  console.log("infr");

  return (
    <div
      className="rounded-2xl shadow p-6 mb-6"
      style={{ backgroundColor: COLORS.primary_white }}
    >
      <h2 className="text-xl font-bold mb-2">Account Overview</h2>
      <p
        className="text-xs mb-4"
        style={{ color: COLORS.primary_gray }}
      >
        Manage your account preferences and privacy settings
      </p>

      <div className="flex flex-col gap-5">
        <p className="text-base font-semibold mb-2">Personal Information</p>
        <form className="grid grid-cols-2 gap-5">
          <div className="flex flex-col gap-2">
            <label style={{ color: COLORS.primary_black }}>Full Name</label>
            <input
              type="text"
              value={profile?.data?.studentName || ""}
              className="p-2 text-sm"
              style={{ color: COLORS.primary_gray }}
              readOnly
            />
          </div>
          <div className="flex flex-col gap-2">
            <label style={{ color: COLORS.primary_black }}>Email</label>
            <input
              type="email"
              value={profile?.data?.email || "example.com"}
              className="p-2 text-sm"
              style={{ color: COLORS.primary_gray }}
              readOnly
            />
          </div>
          <div className="flex flex-col gap-2">
            <label style={{ color: COLORS.primary_black }}>Location</label>
            <input
              type="text"
              value={profile?.data?.personalInfo?.address?.current?.city || ""}
              className="p-2 text-sm"
              style={{ color: COLORS.primary_gray }}
              readOnly
            />
          </div>
        </form>
      </div>
    </div>
  );
};