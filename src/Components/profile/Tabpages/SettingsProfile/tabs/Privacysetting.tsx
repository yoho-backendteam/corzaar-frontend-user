import { COLORS } from "../../../../../Constants/uiconstants";
import { useAppSelector } from "../../../../../hooks/reduxhooks";

export const PrivacySetting = () => {
  const privacySettings = useAppSelector(
    (state) => state.profile.privacySettings
  );

  return (
    <div className=" rounded-2xl shadow p-6 mb-6 "
    style={{backgroundColor:COLORS.primary_white}}>
      <h2 className="text-base font-semibold mb-2">Privacy Settings</h2>
      <p className="text-sm  mb-4"
      style={{color:COLORS.primary_gray}}>
        Control who can see your information and activity
      </p>

      <div className="flex flex-col gap-4">
        {privacySettings.map((item, index) => (
          <div key={index} className="flex justify-between items-center">
            <span className="text-sm "
            style={{color:COLORS.primary_gray}}>{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
