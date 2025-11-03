import { CourseCard } from "./CourseNote";
import { useAppSelector } from "../../../../hooks/reduxhooks";

export const Mycourse = () => {
  const profile = useAppSelector((state) => state.profile);

  return (
    <div className="flex flex-col gap-6">
      {profile.coursesList && profile.coursesList.length > 0 ? (
        profile.coursesList.map((course, index) => (
          <CourseCard
            key={index}
            title={course.title}
            instructor={course.instructor}
            progress={course.progress}
            category={course.category}
            lastAccessed={course.lastAccessed}
          />
        ))
      ) : (
        <p className="text-gray-500 text-sm">No courses found.</p>
      )}
    </div>
  );
};
