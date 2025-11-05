import React from "react";
import { useAppSelector } from "../../../../../hooks/reduxhooks";
import { COLORS } from "../../../../../Constants/uiconstants";

type ProgressBarProps = {
  label: string;
  progress: number;
  sessionsCompleted: number;
  totalSessions: number;
  date?: string;
};

const ProgressBar: React.FC<ProgressBarProps> = ({
  label,
  progress,
  sessionsCompleted,
  totalSessions,
  date,
}) => (
  <div className="mb-5">
    <div className="flex justify-between mb-1 text-sm font-medium">
      <span>{label}</span>
      <span
        className={`text-xs font-semibold px-2 py-1 rounded-md `}
        style={{
          backgroundColor:
            progress >= 90 ? COLORS.secondary_green : COLORS.primary_yellow,
        }}
      >
        {progress}%
      </span>
    </div>
    <div
      className="w-full  rounded-full h-2.5"
      style={{ backgroundColor: COLORS.secondary_gray }}
    >
      <div
        className=" h-2.5 rounded-full"
        style={{ width: `${progress}%`, backgroundColor: COLORS.primary_gray }}
      ></div>
    </div>
    <div
      className="flex justify-between text-xs  mt-1"
      style={{ color: COLORS.primary_gray }}
    >
      <span>
        {sessionsCompleted} / {totalSessions} sessions
      </span>
      {date && <span>Last: {date}</span>}
    </div>
  </div>
);

export const AttendanceOverview = () => {
  const profile = useAppSelector((state) => state.profile);

  return (
    <div
      className=" rounded-2xl shadow p-6 mb-6 "
      style={{ backgroundColor: COLORS.primary_white }}
    >
      <h2 className="text-xl font-bold mb-2">Attendance Overview</h2>
      <p className="text-sm  mb-4" style={{ color: COLORS.primary_gray }}>
        Your attendance across all enrolled courses
      </p>

      {profile.attendance.map((item, i) => (
        <ProgressBar
          key={i}
          label={item.label}
          progress={item.progress}
          sessionsCompleted={item.sessionsCompleted}
          totalSessions={item.totalSessions}
          date={item.date}
        />
      ))}
    </div>
  );
};
