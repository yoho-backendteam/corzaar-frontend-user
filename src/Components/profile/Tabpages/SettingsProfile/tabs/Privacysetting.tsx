import { useAppSelector } from "../../../../../hooks/reduxhooks";

export const PrivacySetting = () => {
  const privacySettings = useAppSelector(
    (state) => state.profile.privacySettings
  );

  return (
    <div className="bg-white rounded-2xl shadow p-6 mb-6 border border-gray-200">
      <h2 className="text-base font-semibold mb-2">Privacy Settings</h2>
      <p className="text-sm text-gray-500 mb-4">
        Control who can see your information and activity
      </p>

      <div className="flex flex-col gap-4">
        {privacySettings.map((item, index) => (
          <div key={index} className="flex justify-between items-center">
            <span className="text-sm text-gray-700">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
