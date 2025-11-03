import { useAppSelector } from "../../../../hooks/reduxhooks";
import { CourseProgressCard } from "./Progresscard";

export const Attendance = () => {
  const profile = useAppSelector((state) => state.profile);

  return (
    <div className="flex flex-col items-center">
      {profile.attendance.map((course, index) => (
       <CourseProgressCard
          key={index}
          title={course.label}
          lastAttended={course.date}
          sectionsCompleted={course.sessionsCompleted}
          totalSections={course.totalSessions}
          progress={course.progress}
          lastAccessed={"2 days ago"}
          eligible={true}
        />
      ))}
    </div>
  );
};
