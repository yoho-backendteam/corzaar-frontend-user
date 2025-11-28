import { useDispatch, useSelector } from "react-redux";
import { useAppSelector } from "../../../../hooks/reduxhooks";
import { CourseProgressCard } from "./Progresscard";
import { attendanceSelect, courseIdSelect } from "../../../../features/settings/reducers/settingSelectors";
import { useEffect, useMemo, useState } from "react";
import type { AppDispatch } from "../../../../store/store";
import { setAttendanceData, getCoursesById } from "../../../../features/settings/reducers/settingThunks";

export const Attendance = () => {
  const dispatch = useDispatch<AppDispatch>();

  // Redux selectors
  const attendanceState = useSelector(attendanceSelect);
  const courseState = useAppSelector(courseIdSelect);

  // State to store mapped course data
  const [mappedCourses, setMappedCourses] = useState<any[]>([]);

  // ✅ Step 1: Fetch Attendance Data (once)
  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        const studentId = "68fb72ea19c3430ef1c8d3e6";
        const response = await dispatch(setAttendanceData(studentId));
        console.log("✅ Attendance Data:", response?.data);
      } catch (error) {
        console.error("❌ Attendance fetch error:", error);
      }
    };
    fetchAttendance();
  }, [dispatch]);

  // ✅ Extract course IDs from attendance data
  const courseIds = useMemo(() => {
    return attendanceState?.data?.map((item: any) => item.courseId) || [];
  }, [attendanceState?.data]);

  console.log("🟢 Course IDs:", courseIds);

  // ✅ Step 2: Fetch course details for each ID
  useEffect(() => {
    const fetchCourseDetails = async () => {
      if (!courseIds || courseIds.length === 0) return;
      
      try {
        const coursePromises = courseIds.map(async (id: string) => {
          if (id) {
            const response = await dispatch(getCoursesById(id));
            return response?.data;
          }
          return null;
        });

        const courseDetails = await Promise.all(coursePromises);
        console.log("📘 All Course Data:", courseDetails[0]);
        
        // Map attendance data with course details
        const mappedData = attendanceState?.data?.map((attendanceItem: any, index: number) => {
          const courseDetail = courseDetails[index].data;
          console.log("course",courseDetail);
          
          if (!courseDetail) return null;

          const totalSessions = attendanceItem.totalDays;
          const sessionsCompleted = attendanceItem.totalPresent;
          const progress = totalSessions > 0 ? (sessionsCompleted / totalSessions) * 100 : 0;

          return {
            title: courseDetail.title || "Unknown Course",
            date: getLastAttendedDate(attendanceItem.attendance),
            sessionsCompleted: sessionsCompleted,
            totalSessions: totalSessions,
            progress: progress,
            eligible: progress >= 75 
          };
        }).filter(Boolean);

        setMappedCourses(mappedData || []);
        
      } catch (error) {
        console.error("❌ Course fetch error:", error);
      }
    };

    fetchCourseDetails();
  }, [dispatch, courseIds, attendanceState?.data]);

  // Helper function to get the last attended date
  const getLastAttendedDate = (attendanceRecords: any[]) => {
    if (!attendanceRecords || attendanceRecords.length === 0) return "Never attended";
    
    // Find the last present date
    const presentRecords = attendanceRecords.filter(record => record.status === "present");
    if (presentRecords.length === 0) return "Never attended";
    
    // Sort by date and get the most recent
    const sortedRecords = presentRecords.sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    
    const lastDate = new Date(sortedRecords[0].date);
    return lastDate.toLocaleDateString();
  };

  // Calculate last accessed time (you might want to get this from your API)
  const getLastAccessed = () => {
    // This is a placeholder - replace with actual logic from your data
    return "2 days ago";
  };

  console.log("🎯 Mapped Courses:", mappedCourses);
  console.log("🎯 Attendance State:", attendanceState);
  console.log("🎯 Course State:", courseState);

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