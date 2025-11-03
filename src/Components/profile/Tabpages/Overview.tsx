import { COLORS, FONTS } from "../../../Constants/uiconstants";
import { useAppSelector } from "../../../hooks/reduxhooks";
import tick from "../../../assets/profile/icons/Container.png";

export const Overview = () => {
  const profile = useAppSelector((state) => state.profile);

  return (
    <div className="flex flex-col gap-6">
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <h3
          className="text-xl font-bold mb-4"
          style={{ fontFamily: FONTS.boldHeading.fontFamily }}
        >
          Profile Summary
        </h3>
        <div className="">
          <form className="grid grid-cols-2 gap-5">
            <div className="flex flex-col gap-2">
              <label>Full Name</label>
              <input
                type="text"
                value={profile.name}
                className=" p-2 text-sm text-[#707070]"
                readOnly
              />
            </div>
            <div className="flex flex-col gap-2">
              <label>Email</label>
              <input
                type="email"
                value={profile.email}
                className=" p-2 text-sm text-[#707070]"
                readOnly
              />
            </div>
            <div className="flex flex-col gap-2">
              <label>Location</label>
              <input
                type="text"
                value={profile.location}
                className="p-2 text-sm text-[#707070]"
                readOnly
              />
            </div>
            <div>
              <p className="font-semibold text-gray-700">Role</p>
              <span
                className="px-3 py-1 rounded-md text-sm font-medium"
                style={{
                  backgroundColor: COLORS.primary_yellow,
                  color: COLORS.primary_black,
                }}
              >
                {profile.role}
              </span>
            </div>
          </form>
        </div>

        {/* Skills */}
        <div className="mt-4">
          <p className="font-bold text-gray-700 mb-2">Skills</p>
          <div className="flex flex-wrap gap-2">
            {profile.skills.map((skill, i) => (
              <span
                key={i}
                className="bg-[#707070]/10 px-3 py-1 rounded-md text-sm"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Interests */}
        <div className="mt-4">
          <p className="font-semibold text-gray-700 mb-2">Interests</p>
          <div className="flex flex-wrap gap-2">
            {profile.interests.map((interest, i) => (
              <span
                key={i}
                className="bg-[#707070]/10 px-3 py-1 rounded-md text-sm"
              >
                {interest}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Attendance Overview */}
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <h3 className="text-xl font-semibold mb-2">Attendance Overview</h3>
        <p className="text-sm text-[#707070] mb-4">
          Your attendance across all enrolled courses
        </p>
        <div className="flex flex-col gap-4">
          {profile.attendance.map((course, index) => (
            <div key={index}>
              <div className="flex justify-between items-center text-sm font-semibold mt-5">
                <p>{course.label}</p>
                <p className="bg-[#68D391] px-2 py-[2px] rounded-lg text-white text-xs">
                  {course.progress}%
                </p>
              </div>
              <div className="w-full bg-gray-200 h-2 rounded-full mt-1">
                <div
                  className="bg-[#707070] h-2 rounded-full"
                  style={{ width: `${course.progress}%` }}
                ></div>
              </div>
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <p>
                  {course.sessionsCompleted} / {course.totalSessions} sessions
                </p>
                <p>Last: {course.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <h3 className="text-xl font-semibold mb-4">Recent Activity</h3>
        <div className="flex flex-col gap-4">
          {profile.recentActivity.map((item, idx) => (
            <div key={idx} className="flex items-center gap-3 mt-5">
              <div className="h-10 w-10 flex items-center justify-center rounded-full bg-green-100">
                <img src={tick} alt="tick"  />
              </div>
              <div className="flex flex-col">
                <p className="font-medium text-gray-800">{item.title}</p>
                <p className="text-xs text-gray-500">{item.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
