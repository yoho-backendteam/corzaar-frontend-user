import { COLORS } from "../../../../../Constants/uiconstants";
import { useAppSelector } from "../../../../../hooks/reduxhooks";

export const Personinformation = () => {
  const profile = useAppSelector((state) => state.profile);

  return (
    <div className=" rounded-2xl shadow p-6 mb-6"
    style={{ backgroundColor: COLORS.primary_white }}>
      <h2 className="text-xl font-bold mb-2">Account Overview</h2>
      <p className="text-xs  mb-4"
      style={{ color: COLORS.primary_gray}}>
        Manage your account preferences and privacy settings
      </p>

      <div className="flex flex-col gap-5">
        <p className="text-base font-semibold mb-2">Personal Information</p>
        <form className="grid grid-cols-2 gap-5">
          <div className="flex flex-col gap-2">
            <label style={{ color: COLORS.primary_black}}>Full Name</label>
            <input
              type="text"
              value={profile.name}
              className=" p-2 text-sm " 
              style={{ color: COLORS.primary_gray}}
  
            />
          </div>
          <div className="flex flex-col gap-2">
            <label style={{ color: COLORS.primary_black}}>Email</label>
            <input
              type="email"
              value={profile.email}
              className=" p-2 text-sm "
              style={{ color: COLORS.primary_gray}}
  
            />
          </div>
          <div className="flex flex-col gap-2">
            <label style={{ color: COLORS.primary_black}}>Location</label>
            <input
              type="text"
              value={profile.location}
              className="p-2 text-sm "
              style={{ color: COLORS.primary_gray}}
  
            />
          </div>
        </form>
      </div>
    </div>
  );
};
