import { useAppSelector } from "../../../../../hooks/reduxhooks";

export const Personinformation = () => {
  const profile = useAppSelector((state) => state.profile);

  return (
    <div className="bg-white rounded-2xl shadow p-6 mb-6 border border-gray-200">
      <h2 className="text-xl font-bold mb-2">Account Overview</h2>
      <p className="text-xs text-gray-500 mb-4">
        Manage your account preferences and privacy settings
      </p>

      <div className="flex flex-col gap-5">
        <p className="text-base font-semibold mb-2">Personal Information</p>
        <form className="grid grid-cols-2 gap-5">
          <div className="flex flex-col gap-2">
            <label>Full Name</label>
            <input
              type="text"
              value={profile.name}
              className=" p-2 text-sm text-[#707070]" 
  
            />
          </div>
          <div className="flex flex-col gap-2">
            <label>Email</label>
            <input
              type="email"
              value={profile.email}
              className=" p-2 text-sm text-[#707070]"
  
            />
          </div>
          <div className="flex flex-col gap-2">
            <label>Location</label>
            <input
              type="text"
              value={profile.location}
              className="p-2 text-sm text-[#707070]"
  
            />
          </div>
        </form>
      </div>
    </div>
  );
};
