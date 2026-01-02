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
    const fetchProfile = async (): Promise<void> => {
      try {
        const id = "68fb60f726d15f4ca736ff1d";
        await dispatch(setProfileData(id));
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.error("Profile fetch error:", error.message);
        }
      }
    };

    fetchProfile();
  }, [dispatch]);

  const profileData = useSelector(profileSelect);

  // Fetch activity data
  useEffect(() => {
    const fetchActivity = async (): Promise<void> => {
      try {
        const id = "6901e07f903ec14f1b04539e";
        await dispatch(setActivityData(id));
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.error("Activity fetch error:", error.message);
        }
      }
    };

    fetchActivity();
  }, [dispatch]);

  const activityData = useSelector(activitySelect);
  console.log("aci", activityData);


  // // Mock UI profile data (replace with actual data from your store)
  // const profileD: UIProfileState = useAppSelector(() => ({
  //   email: "john@example.com", // This should come from your actual profile state
  //   role: "Student",
  //   skills: ["JavaScript", "TypeScript", "React", "Node.js"],
  //   interests: ["Web Development", "AI/ML", "Mobile Development"],
  //   attendance: [
  //     {
  //       label: "Mathematics",
  //       progress: 85,
  //       sessionsCompleted: 17,
  //       totalSessions: 20,
  //       date: "2024-01-15"
  //     },
  //     {
  //       label: "Physics",
  //       progress: 75,
  //       sessionsCompleted: 15,
  //       totalSessions: 20,
  //       date: "2024-01-14"
  //     }
  //   ],
  //   recentActivity: [
  //     {
  //       title: "Completed Assignment",
  //       date: "2024-01-15"
  //     },
  //     {
  //       title: "Joined Course",
  //       date: "2024-01-10"
  //     }
  //   ],
  //   projects: [
  //     {
  //       title: "E-commerce Platform",
  //       description: "Full-stack e-commerce application",
  //       tags: ["React", "Node.js", "MongoDB"],
  //       date: "2024-01-01"
  //     }
  //   ],
  //   achievements: [
  //     {
  //       title: "Best Student Award",
  //       organization: "University",
  //       description: "Awarded for academic excellence",
  //       date: "2024-01-01"
  //     }
  //   ]
  // }));

  // Get current city and country from profile data
  const getLocation = (): string => {
    if (!profileData?.data?.personalInfo?.address?.current) {
      return "Location not available";
    }

    const { city, country } = profileData.data.personalInfo.address.current;
    return `${city || ""}, ${country || ""}`.trim();
  };

  // Get email from profile (you might need to adjust this based on your actual data structure)
  // const getEmail = (): string => {
  //   // Since email is not in the provided profile response, using mock data
  //   // Replace this with actual email field from your API if available
  //   return profile.email;
  // };

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
                value={profileData?.fullName}
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
                value={profileData?.email}
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

          {/* {skills.length > 0 ? (
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
          ) : ( */}
          <p className="text-sm text-gray-500">No skills available</p>
          {/* )} */}
        </div>

        {/* Interests */}
        <div className="mt-4">
          <p className="font-semibold mb-2" style={{ color: COLORS.primary_gray }}>
            Interests
          </p>

          {/* {interests.length > 0 ? (
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
          ) : ( */}
          <p className="text-sm text-gray-500">No interests listed</p>
          {/* )} */}
        </div>
      </div>

      {/* Attendance Overview */}
      <div className="p-6 rounded-xl shadow-sm" style={{ backgroundColor: COLORS.primary_white }}>
        <h3 className="text-xl font-semibold mb-2">Attendance Overview</h3>
        <p className="text-sm mb-4" style={{ color: COLORS.primary_gray }}>
          Your attendance across all enrolled courses
        </p>

        <div className="flex flex-col gap-4">
          {/* {attendance.map((course, index) => (
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
          ))} */}
        </div>
      </div>

      {/* Recent Activity */}
      {/* Recent Activity */}
      <div className="p-6 rounded-xl shadow-sm" style={{ backgroundColor: COLORS.primary_white }}>
        <h3 className="text-xl font-semibold mb-4">Recent Activity</h3>

        <div className="flex flex-col gap-4">
          {activityData?.Data?.map((item: ActivityItem, index: number) => (
            <div key={index} className="flex items-center gap-3 mt-5">
              <div
                className="h-10 w-10 flex items-center justify-center rounded-full"
                style={{ backgroundColor: `${COLORS.secondary_green}1A` }}
              >
                <img src={tick} alt="tick" />
              </div>
              <div className="flex flex-col">
                <p
                  className="font-medium"
                  style={{ color: COLORS.primary_black }}
                >
                  {item.description}
                </p>
                <p
                  className="text-xs"
                  style={{ color: COLORS.primary_gray }}
                >
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
