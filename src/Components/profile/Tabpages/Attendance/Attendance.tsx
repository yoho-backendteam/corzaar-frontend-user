import { useDispatch, useSelector } from "react-redux";
import { useAppSelector } from "../../../../hooks/reduxhooks";
import { CourseProgressCard } from "./Progresscard";
import { attendanceSelect, courseIdSelect } from "../../../../features/settings/reducers/settingSelectors";
import { useEffect } from "react";
import type { AppDispatch } from "../../../../store/store";
import { setAttendanceData, setCoursesById } from "../../../../features/settings/reducers/settingThunks";
import type { AttendanceItem } from "../../../../features/settings/types/settingTypes";
import { toast } from "react-toastify";

export const Attendance = () => {


  
  const dispatch = useDispatch<AppDispatch>();

  // Redux selectors
  const attendanceState = useSelector(attendanceSelect);
  const courseState = useAppSelector(courseIdSelect);

  const courseData = courseState?.data
  console.log("course", courseData)

  // ✅ Step 1: Fetch Attendance Data (once)
  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        const studentId = "68fb72ea19c3430ef1c8d3e6";
        const response = await dispatch(setAttendanceData(studentId));
        if(response?.success === true) {
          toast.success(response?.message)
        }
      } catch (error:unknown) {
        toast.error(`error as Error ${error}`);
      }
    };
    fetchAttendance();
  }, [dispatch]);

  // ✅ Extract course IDs (always an array)
  const courseIds = attendanceState?.data?.map((item: any) => item.courseId) || [];
  console.log("🟢 Course IDs:", courseIds);

  // ✅ Step 2: Fetch course details for each ID
  useEffect(() => {
    const fetchCourseDetails = async () => {
      if (!courseIds || courseIds.length === 0) return;
      try {
        for (const id of courseIds) {
          if (id) {
            const response = await dispatch(setCoursesById(id));
          }
        }
      } catch (error) {
        console.error("❌ Course fetch error:", error);
      }
    };

    fetchCourseDetails();
  }, [dispatch, JSON.stringify(courseIds)]);

  console.log("🎯 Attendance State:", attendanceState);
  console.log("🎯 Course State:", courseState);

  // ✅ Add this helper function to get the last attended date
  const getLastAttendedDate = (attendanceRecords: any[]): string => {
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

  const getLastAccessed = (): string => {
    return "2 days ago";
  };

  const mappedCourses: any[] = [];

  attendanceState?.data?.forEach((attendanceItem: AttendanceItem) => {
    // Check if this attendance item matches the single course
    if (courseData && courseData._id === attendanceItem.courseId) {
      const totalSessions = attendanceItem.totalDays;
      const sessionsCompleted = attendanceItem.totalPresent;
      const progress = totalSessions > 0 ? (sessionsCompleted / totalSessions) * 100 : 0;

      mappedCourses.push({
        title: courseData.title,
        date: getLastAttendedDate(attendanceItem.attendance), // Fixed: Add this function
        sessionsCompleted,
        totalSessions,
        progress,
        eligible: progress >= 75
      });
    }
  });

  console.log("mapp", mappedCourses);

  

  // Use mappedCourses instead of profile.attendance
  const displayData = mappedCourses.length > 0 ? mappedCourses : [];

  return (
    <div className="flex flex-col items-center">
      {displayData.length > 0 ? (
        displayData.map((course, index) => (
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