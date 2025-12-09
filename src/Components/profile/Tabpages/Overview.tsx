import React, { useEffect } from "react";
import { COLORS, FONTS } from "../../../Constants/uiconstants";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch } from "../../../store/store";
import tick from "../../../assets/profile/icons/Container.png";

import { setActivityData, setProfileData } from "../../../features/settings/reducers/settingThunks";
import { activitySelect, profileSelect } from "../../../features/settings/reducers/settingSelectors";
import { formatDate } from "../../../utils/helper";
import type { ActivityItem } from "../../../features/settings/types/settingTypes";

export const Overview: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  // Fetch profile data
  useEffect(() => {
    const id = "691d8d28340440bf767c5b1d";
    dispatch(setProfileData(id));
  }, [dispatch]);

  const profileData = useSelector(profileSelect);

  // Fetch activity data
  useEffect(() => {
    const id = "691d8d28340440bf767c5b1d";
    dispatch(setActivityData(id));
  }, [dispatch]);

  const activityData = useSelector(activitySelect);

  // Extract values safely
  const firstName = profileData?.data?.personalInfo?.firstName || "";
  const lastName = profileData?.data?.personalInfo?.lastName || "";
  const email = profileData?.data?.personalInfo?.email || "Not available";
  const currentAddress = profileData?.data?.personalInfo?.address?.current;

  const fullName = `${firstName} ${lastName}`.trim() || "Not available";

  const getLocation = () => {
    if (!currentAddress) return "Location not available";

    const city = currentAddress.city || "";
    const country = currentAddress.country || "";

    return [city, country].filter(Boolean).join(", ") || "Location not available";
  };

  // Fallback if API does not return skills
  const skills: string[] = profileData?.data?.skills || [];

  // Fallback interests - if your API includes interests, map here
  const interests: string[] = profileData?.data?.interests || [];

  // TEMPORARY: Attendance because API has no attendance yet
  const attendance = [
    {
      label: "Mathematics",
      progress: 85,
      sessionsCompleted: 17,
      totalSessions: 20,
      date: "2024-01-15",
    },
    {
      label: "Physics",
      progress: 75,
      sessionsCompleted: 15,
      totalSessions: 20,
      date: "2024-01-14",
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      {/* Profile Summary */}
      <div className="p-6 rounded-xl shadow-sm" style={{ backgroundColor: COLORS.primary_white }}>
        <h3
          className="text-xl font-bold mb-4"
          style={{ fontFamily: FONTS.boldHeading.fontFamily }}
        >
          Profile Summary
        </h3>

        <div>
          <form className="grid grid-cols-2 gap-5">
            {/* Full Name */}
            <div className="flex flex-col gap-2">
              <label style={{ color: COLORS.primary_black }}>Full Name</label>
              <input
                type="text"
                value={fullName}
                className="p-2 text-sm border rounded"
                style={{
                  color: COLORS.primary_gray,
                  borderColor: COLORS.primary_gray,
                }}
                readOnly
              />
            </div>

            {/* Email */}
            <div className="flex flex-col gap-2">
              <label style={{ color: COLORS.primary_black }}>Email</label>
              <input
                type="email"
                value={email}
                className="p-2 text-sm border rounded"
                style={{
                  color: COLORS.primary_gray,
                  borderColor: COLORS.primary_gray,
                }}
                readOnly
              />
            </div>

            {/* Location */}
            <div className="flex flex-col gap-2">
              <label style={{ color: COLORS.primary_black }}>Location</label>
              <input
                type="text"
                value={getLocation()}
                className="p-2 text-sm border rounded"
                style={{
                  color: COLORS.primary_gray,
                  borderColor: COLORS.primary_gray,
                }}
                readOnly
              />
            </div>

            {/* Role */}
            <div className="flex flex-col gap-2">
              <label style={{ color: COLORS.primary_black }}>Role</label>
              <span
                className="px-3 py-2 rounded-md text-sm font-medium inline-block w-fit"
                style={{
                  backgroundColor: COLORS.primary_yellow,
                  color: COLORS.primary_black,
                }}
              >
                Student
              </span>
            </div>
          </form>
        </div>

        {/* Skills */}
        <div className="mt-4">
          <p className="font-bold mb-2" style={{ color: COLORS.primary_gray }}>
            Skills
          </p>

          {skills.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, index) => (
                <span
                  key={index}
                  className="px-3 py-1 rounded-md text-sm"
                  style={{ backgroundColor: `${COLORS.primary_gray}1A` }}
                >
                  {skill}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-500">No skills available</p>
          )}
        </div>

        {/* Interests */}
        <div className="mt-4">
          <p className="font-semibold mb-2" style={{ color: COLORS.primary_gray }}>
            Interests
          </p>

          {interests.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {interests.map((interest, index) => (
                <span
                  key={index}
                  className="px-3 py-1 rounded-md text-sm"
                  style={{ backgroundColor: `${COLORS.primary_gray}1A` }}
                >
                  {interest}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-500">No interests listed</p>
          )}
        </div>
      </div>

      {/* Attendance Overview */}
      <div className="p-6 rounded-xl shadow-sm" style={{ backgroundColor: COLORS.primary_white }}>
        <h3 className="text-xl font-semibold mb-2">Attendance Overview</h3>
        <p className="text-sm mb-4" style={{ color: COLORS.primary_gray }}>
          Your attendance across all enrolled courses
        </p>

        <div className="flex flex-col gap-4">
          {attendance.map((course, index) => (
            <div key={index}>
              <div className="flex justify-between items-center text-sm font-semibold mt-5">
                <p style={{ color: COLORS.primary_black }}>{course.label}</p>
                <p
                  className="px-2 py-0.5 rounded-lg text-xs"
                  style={{
                    backgroundColor: COLORS.secondary_green,
                    color: COLORS.primary_white,
                  }}
                >
                  {course.progress}%
                </p>
              </div>

              <div className="w-full h-2 rounded-full mt-1" style={{ backgroundColor: `${COLORS.secondary_gray}1A` }}>
                <div
                  className="h-2 rounded-full"
                  style={{
                    width: `${course.progress}%`,
                    backgroundColor: COLORS.primary_gray,
                  }}
                ></div>
              </div>

              <div className="flex justify-between text-xs mt-1" style={{ color: COLORS.primary_gray }}>
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
      {/* Recent Activity */}
      <div className="p-6 rounded-xl shadow-sm" style={{ backgroundColor: COLORS.primary_white }}>
        <h3 className="text-xl font-semibold mb-4">Recent Activity</h3>

        <div className="flex flex-col gap-4">

          {/* If API says NO ACTIVITY */}
          {activityData?.Message === "No activity logs found for this user" && (
            <p className="text-sm text-gray-500">No recent activity available</p>
          )}

          {/* If activity data exists */}
          {Array.isArray(activityData?.Data) && activityData.Data.length > 0 &&
            activityData.Data.map((item: ActivityItem) => (
              <div key={item._id} className="flex items-center gap-3 mt-5">
                <div
                  className="h-10 w-10 flex items-center justify-center rounded-full"
                  style={{ backgroundColor: `${COLORS.secondary_green}1A` }}
                >
                  <img src={tick} alt="tick" />
                </div>

                <div className="flex flex-col">
                  <p className="font-medium" style={{ color: COLORS.primary_black }}>
                    {item.description}
                  </p>
                  <p className="text-xs" style={{ color: COLORS.primary_gray }}>
                    {formatDate(item.createdAt)}
                  </p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};
