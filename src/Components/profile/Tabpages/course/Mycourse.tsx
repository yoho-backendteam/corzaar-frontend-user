import { CourseCard } from "./CourseNote";
import { useAppDispatch } from "../../../../hooks/reduxhooks";
import { COLORS } from "../../../../Constants/uiconstants";
import { useEffect, useState } from "react";
import { getCoursesById } from "../../../../features/settings/reducers/settingThunks";

export const Mycourse = () => {
  const dispatch = useAppDispatch();
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userId = "691d8d28340440bf767c5b1d";

    dispatch(getCoursesById(userId))
      .then((res: any) => {
        console.log("🚀 Courses API Response:", res);

        // ✅ Correct API path
        const courseList = res?.data?.courses;

        if (Array.isArray(courseList)) {
          setCourses(courseList);
        } else {
          setCourses([]);
        }
      })
      .finally(() => setLoading(false));
  }, [dispatch]);

  if (loading) {
    return (
      <p className="text-sm" style={{ color: COLORS.primary_gray }}>
        Loading...
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {courses.length > 0 ? (
        courses.map((course: any) => (
       <CourseCard
  key={course._id}
  image={course.thumbnail}
  title={course.title}
  description={course.description}
  category={course.category?.primary || "Uncategorized"}
  price={course.pricing?.price || 0}
  currency={course.pricing?.currency || "INR"}
/>


        ))
      ) : (
        <p className="text-sm" style={{ color: COLORS.primary_gray }}>
          No courses found.
        </p>
      )}
    </div>
  );
};
