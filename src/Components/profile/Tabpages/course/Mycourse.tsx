import { CourseCard } from "./CourseNote";
import { useAppDispatch, useAppSelector } from "../../../../hooks/reduxhooks";
import { COLORS } from "../../../../Constants/uiconstants";
import { useEffect, useState } from "react";
import { getCoursesById } from "../../../../features/settings/reducers/settingThunks";

export const Mycourse = () => {
  const dispatch = useAppDispatch();
  const [course, setCourse] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const courseId = "691d8d28340440bf767c5b1d";

    // Dispatch the thunk and handle the result
    dispatch(getCoursesById(courseId))
      .then((res: any) => {
        if (res.payload?.message === "Course not found") {
          setCourse(null);
        } else {
          setCourse(res.payload); // store fetched course
        }
      })
      .finally(() => setLoading(false));
  }, [dispatch]);

  if (loading) {
    return <p className="text-sm" style={{ color: COLORS.primary_gray }}>Loading...</p>;
  }

  return (
    <div className="flex flex-col gap-6">
      {course ? (
        <CourseCard
          title={course.title}
          instructor={course.instructor}
          progress={course.progress}
          category={course.category}
          lastAccessed={course.lastAccessed}
        />
      ) : (
        <p className="text-sm" style={{ color: COLORS.primary_gray }}>
          No courses found.
        </p>
      )}
    </div>
  );
};
