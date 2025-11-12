import { COLORS, FONTS } from "./../Constants/uiconstants";

import icon from "../assets/profile/icons/Icon.png";
import icon1 from "../assets/profile/icons/Icon1.png";
import icon2 from "../assets/profile/icons/Icon2.png";
import icon3 from "../assets/profile/icons/Icon3.png";
import { useAppSelector } from "../hooks/reduxhooks";
import { ProfileSlide } from "../Components/profile/profileSlide";
import { ProfileTabs } from "../Components/profile/profileTab";
import { ProfileHeader } from "../Components/profile/profileHeader";
import { Overview } from "../Components/profile/Tabpages/Overview";
import { Mycourse } from "../Components/profile/Tabpages/course/Mycourse";
import { Attendance } from "../Components/profile/Tabpages/Attendance/Attendance";
import Payments from "../Components/profile/Tabpages/Payment/Payments";
import Favorites from "../Components/profile/Tabpages/Favorites/Favorites";
import Settings from "../Components/profile/Tabpages/SettingsProfile/Settings";
import { Portfolio } from "../Components/profile/Tabpages/Portfolio/PortfolioPage";
export const Settingprofile = () => {
  

  const profile = useAppSelector((state) => state.profile);

  const tabs = [
    { label: "Overview", content: <Overview /> },
    { label: "My Course", content: <Mycourse /> },
    { label: "Portfolio", content: <Portfolio /> },
    { label: "Attendance", content: <Attendance /> },
    { label: "Payments", content: <Payments /> },
    { label: "Favorites", content: <Favorites /> },
    { label: "Settings", content: <Settings /> },
  ];
  const iconMap: Record<string, string> = {
    "icon.png": icon,
    "icon1.png": icon1,
    "icon2.png": icon2,
    "icon3.png": icon3,
  };

  return (
    <div
      className="min-w-screen min-h-screen"
      style={{
        fontFamily: FONTS.regular.fontFamily,
        fontOpticalSizing: FONTS.regular.fontOpticalSizing as "auto" | "none",
        fontWeight: FONTS.regular.fontWeight,
        fontStyle: FONTS.regular.fontStyle,
        backgroundColor: COLORS.primary_yellow,
      }}
    >
      <div className="w-full flex h-full p-10 flex-col gap-8">
        <ProfileHeader
          title={profile.title}
          verified={profile.verified}
          description={profile.description}
          ratings={profile.ratings}
          courses={profile.courses}
          students={profile.students}
          location={profile.location}
          tags={profile.tags}
          onEdit={() => alert("Edit profile clicked")}
        />
        <div className="grid lg:grid-cols-4  md:grid-cols-2  gap-4 justify-between flex-wrap">
          {profile.stats.map((item, index) => (
            <ProfileSlide
              key={index}
              icon={iconMap[item.icon] || icon}
              label={item.label}
              value={item.value}
            />
          ))}
        </div>
        <ProfileTabs tabs={tabs} />
      </div>
    </div>
  );
};
