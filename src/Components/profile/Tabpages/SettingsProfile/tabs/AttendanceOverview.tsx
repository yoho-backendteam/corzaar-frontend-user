import React from "react";
import { useAppSelector } from "../../../../../hooks/reduxhooks";

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
        className={`text-xs font-semibold px-2 py-1 rounded-md ${
          progress >= 90
            ? "bg-[#68D391] text-white"
            : "bg-[#FFDD00] text-white"
        }`}
      >
        {progress}%
      </span>
    </div>
    <div className="w-full bg-[#5F5F5F1A]/20 rounded-full h-2.5">
      <div
        className="bg-[#707070] h-2.5 rounded-full"
        style={{ width: `${progress}%` }}
      ></div>
    </div>
    <div className="flex justify-between text-xs text-gray-500 mt-1">
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
    <div className="bg-white rounded-2xl shadow p-6 mb-6 border border-gray-200">
      <h2 className="text-xl font-bold mb-2">Attendance Overview</h2>
      <p className="text-sm text-gray-500 mb-4">
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
