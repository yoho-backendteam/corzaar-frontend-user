import { useDispatch, useSelector } from "react-redux";
import { useAppSelector } from "../../../../hooks/reduxhooks";
import { CourseProgressCard } from "./Progresscard";
import { attendanceSelect, courseIdSelect } from "../../../../features/settings/reducers/settingSelectors";
import { useEffect, useMemo, type JSX } from "react";
import type { AppDispatch } from "../../../../store/store";
import { setAttendanceData, setCoursesById } from "../../../../features/settings/reducers/settingThunks";
import type { AttendanceItem, AttendanceRecord, CourseData } from "../../../../features/settings/types/settingTypes";
import { toast } from "react-toastify";

interface MappedCourse {
  title: string;
  date: string;
  sessionsCompleted: number;
  totalSessions: number;
  progress: number;
  eligible: boolean;
}

export const Attendance = (): JSX.Element => {
  const dispatch = useDispatch<AppDispatch>();

  // Redux selectors
  const attendanceState = useSelector(attendanceSelect);
  const courseState = useAppSelector(courseIdSelect);

  const courseData = courseState?.data;

  useEffect(() => {
    const fetchAttendance = async (): Promise<void> => {
      try {
        const studentId = "68fb72ea19c3430ef1c8d3e6";
        const response = await dispatch(setAttendanceData(studentId));

        if (response?.success === true) {
          toast.success(response?.message);
        }
      } catch (error: unknown) {
        toast.error(`Error fetching attendance: ${(error as Error).message}`);
      }
    };
    fetchAttendance();
  }, [dispatch]);

  // ✅ Extract course IDs safely (memoized)
  const courseIds = useMemo<string[]>(
    () => attendanceState?.data?.map((item: AttendanceItem) => item.courseId) ?? [],
    [attendanceState?.data]
  );

  // ✅ Step 2: Fetch course details for each ID
  useEffect(() => {
    const fetchCourseDetails = async (): Promise<void> => {
      if (courseIds.length === 0) return;

      try {
        for (const id of courseIds) {
          if (id) await dispatch(setCoursesById(id));
        }
      } catch (error: unknown) {
        toast.error(`❌ Course fetch error: ${(error as Error).message}`);
      }
    };

    fetchCourseDetails();
  }, [dispatch, courseIds]); 

  // ✅ Helper to get last attended date
  const getLastAttendedDate = (attendanceRecords: AttendanceRecord[]): string => {
    if (!attendanceRecords || attendanceRecords.length === 0) return "Never attended";

    const presentRecords = attendanceRecords.filter(
      (record) => record.status === "present"
    );
    if (presentRecords.length === 0) return "Never attended";

    const sortedRecords = [...presentRecords].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    const lastDate = new Date(sortedRecords[0].date);
    return lastDate.toLocaleDateString();
  };

  const getLastAccessed = (): string => "2 days ago";

  // ✅ Step 3: Map attendance with corresponding course
  const mappedCourses: MappedCourse[] =
    attendanceState?.data?.flatMap((attendanceItem: AttendanceItem) => {
      const matchedCourse = Array.isArray(courseData)
        ? courseData.find((c) => c._id === attendanceItem.courseId)
        : courseData && (courseData as CourseData)._id === attendanceItem.courseId
        ? (courseData as CourseData)
        : undefined;

      if (!matchedCourse) return [];

      const totalSessions = attendanceItem.totalDays;
      const sessionsCompleted = attendanceItem.totalPresent;
      const progress =
        totalSessions > 0 ? (sessionsCompleted / totalSessions) * 100 : 0;

      return [
        {
          title: matchedCourse.title,
          date: getLastAttendedDate(attendanceItem.attendance),
          sessionsCompleted,
          totalSessions,
          progress,
          eligible: progress >= 75,
        },
      ];
    }) ?? [];


  return (
    <div className="flex flex-col items-center">
      {mappedCourses.length > 0 ? (
        mappedCourses.map((course, index) => (
          <CourseProgressCard
            key={index}
            title={course.title}
            lastAttended={course.date}
            sectionsCompleted={course.sessionsCompleted}
            totalSections={course.totalSessions}
            progress={course.progress}
            lastAccessed={getLastAccessed()}
            eligible={course.eligible}
          />
        ))
      ) : (
        <div className="text-center py-8">
          <p className="text-gray-500">No attendance data available</p>
        </div>
      )}
    </div>
  );
};
