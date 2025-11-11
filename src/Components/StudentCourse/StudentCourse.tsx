"use client";

import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { ChevronDown, SearchIcon, X } from "lucide-react";
import CourseCard from "../../Components/StudentCourse/CourseCard";
import FilterSidebar from "../../Components/StudentCourse/FilterSidebars";
import { COLORS, FONTS } from "../../Constants/uiconstants";
import filter from "../../assets/Image/fillteryl.png";
import {
  fetchCourses,
  fetchCourseById,
  fetchCoursesByBranch,
  fetchTrendingCourses,
  fetchFeaturedCourses,
  fetchCoursesByInstitute,
  fetchAllDetailedCourses,
} from "../../Components/Redux/courseThunks";
import type { RootState, AppDispatch } from "../../store/store";

const sortOptions = [
  "Most Popular",
  "Highest Rated",
  "Price Low to High",
  "Price High to Low",
  "Newest",
];

const filterOptions = [
  { id: "all", label: "All Courses", action: fetchCourses },
  { id: "trending", label: "Trending Courses", action: fetchTrendingCourses },
  { id: "featured", label: "Featured Courses", action: fetchFeaturedCourses },
  {
    id: "detailed",
    label: "Detailed Courses",
    action: fetchAllDetailedCourses,
  },
];

export default function ExploreCourses() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedSort, setSelectedSort] = useState("Most Popular");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [branchId, setBranchId] = useState("");
  const [instituteId, setInstituteId] = useState("");
  const [courseId, setCourseId] = useState("");

  const dispatch = useDispatch<AppDispatch>();

  const { courses, loading, error } = useSelector(
    (state: RootState) => state.course
  );

  useEffect(() => {
    dispatch(fetchCourses());
  }, [dispatch]);

  const handleFilterChange = (filterId: string) => {
    setActiveFilter(filterId);

    switch (filterId) {
      case "all":
        dispatch(fetchCourses());
        break;
      case "trending":
        dispatch(fetchTrendingCourses());
        break;
      case "featured":
        dispatch(fetchFeaturedCourses());
        break;
      case "detailed":
        dispatch(fetchAllDetailedCourses());
        break;
      default:
        dispatch(fetchCourses());
    }
  };

  const handleFetchByBranch = () => {
    if (branchId.trim()) {
      dispatch(fetchCoursesByBranch(branchId));
    }
  };

  const handleFetchByInstitute = () => {
    if (instituteId.trim()) {
      dispatch(fetchCoursesByInstitute(instituteId));
    }
  };

  const handleFetchById = () => {
    if (courseId.trim()) {
      dispatch(fetchCourseById(courseId));
    }
  };

  const handleSortChange = (option: string) => {
    setSelectedSort(option);
    const details = document.querySelector("details");
    if (details) details.removeAttribute("open");
  };

  const filteredCourses = courses.filter((course: any) => {
    if (!searchQuery.trim()) return true;

    const query = searchQuery.toLowerCase();
    return (
      course.title?.toLowerCase().includes(query) ||
      course.description?.toLowerCase().includes(query) ||
      course.instituteName?.toLowerCase().includes(query) ||
      course.category?.toLowerCase().includes(query)
    );
  });

  const sortedAndFilteredCourses = [...filteredCourses].sort(
    (a: any, b: any) => {
      switch (selectedSort) {
        case "Most Popular":
          return (b.popularity || 0) - (a.popularity || 0);
        case "Highest Rated":
          return (b.rating || 0) - (a.rating || 0);
        case "Price Low to High":
          return (a.price || 0) - (b.price || 0);
        case "Price High to Low":
          return (b.price || 0) - (a.price || 0);
        case "Newest":
          return (
            new Date(b.createdAt || 0).getTime() -
            new Date(a.createdAt || 0).getTime()
          );
        default:
          return 0;
      }
    }
  );

  return (
    <div
      className="min-h-screen w-full flex flex-col"
      style={{ backgroundColor: COLORS.primary_yellow }}
    >
      <header
        className="sticky top-0 z-40 px-4 sm:px-6 lg:px-8 py-4 sm:py-5 border-b border-black/10"
        style={{ backgroundColor: COLORS.primary_yellow }}
      >
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 sm:gap-6 w-full">
          <div className="flex flex-col flex-1 space-y-4">
            <h1
              className="text-2xl sm:text-3xl lg:text-4xl"
              style={{
                color: COLORS.primary_black,
                fontFamily: FONTS.boldHeading.fontFamily,
                fontWeight: FONTS.boldHeading.fontWeight,
                fontSize: "clamp(1.5rem, 4vw, 2.25rem)",
              }}
            >
              Explore Courses
            </h1>

            <div className="relative w-full max-w-full lg:max-w-2xl">
              <SearchIcon
                className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5"
                style={{ color: COLORS.primary_gray }}
              />
              <input
                type="text"
                placeholder="Search for courses, institutes..."
                className="w-full pl-10 pr-4 py-2 sm:py-3 rounded-lg border bg-white placeholder:text-gray-500 focus:outline-none focus:ring-2 text-sm sm:text-base"
                style={{
                  borderColor: COLORS.primary_gray,
                  color: COLORS.primary_black,
                  fontFamily: FONTS.regular.fontFamily,
                }}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="flex items-center justify-between lg:justify-end gap-3 w-full lg:w-auto">
            <span
              className="text-sm whitespace-nowrap shrink-0 hidden sm:inline-block"
              style={{
                color: COLORS.primary_black,
                fontFamily: FONTS.medium.fontFamily,
                fontWeight: FONTS.medium.fontWeight,
              }}
            >
              Sort By:
            </span>

            <details className="relative flex-1 lg:flex-none min-w-[140px] sm:min-w-40">
              <summary
                className="flex items-center justify-between px-3 sm:px-4 py-2 sm:py-2.5 border rounded-lg hover:bg-gray-100 transition cursor-pointer list-none bg-white w-full"
                style={{
                  borderColor: COLORS.primary_gray,
                  color: COLORS.primary_black,
                  fontFamily: FONTS.regular.fontFamily,
                  fontSize: "14px",
                }}
              >
                <span className="truncate text-sm sm:text-base">
                  {selectedSort}
                </span>
                <ChevronDown
                  size={16}
                  className="transition-transform shrink-0"
                />
              </summary>

              <div className="absolute top-12 right-0 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                <div className="flex flex-col p-2 gap-1">
                  {sortOptions.map((option) => (
                    <button
                      key={option}
                      onClick={() => handleSortChange(option)}
                      className={`flex items-center px-3 py-2.5 gap-4 rounded transition-colors hover:bg-gray-100 w-full text-left ${selectedSort === option ? "bg-gray-100 font-medium" : ""
                        }`}
                      style={{
                        color: COLORS.primary_gray,
                        fontFamily: FONTS.regular.fontFamily,
                        fontSize: "14px",
                      }}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            </details>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mt-4 sm:mt-6">
          {filterOptions.map((filter) => (
            <button
              key={filter.id}
              onClick={() => handleFilterChange(filter.id)}
              className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm transition-colors ${activeFilter === filter.id
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 mt-4 p-3 sm:p-4 bg-gray-100 rounded-lg">
          <div className="flex items-center gap-2 flex-1 min-w-[200px]">
            <input
              type="text"
              placeholder="Branch ID"
              className="px-3 py-2 border rounded text-sm w-full max-w-[120px] sm:max-w-[140px]"
              value={branchId}
              onChange={(e) => setBranchId(e.target.value)}
            />
            <button
              onClick={handleFetchByBranch}
              className="px-3 py-2 bg-green-500 text-white rounded text-sm hover:bg-green-600 transition-colors whitespace-nowrap flex-1 sm:flex-none"
            >
              Fetch by Branch
            </button>
          </div>

          <div className="flex items-center gap-2 flex-1 min-w-[200px]">
            <input
              type="text"
              placeholder="Institute ID"
              className="px-3 py-2 border rounded text-sm w-full max-w-[120px] sm:max-w-[140px]"
              value={instituteId}
              onChange={(e) => setInstituteId(e.target.value)}
            />
            <button
              onClick={handleFetchByInstitute}
              className="px-3 py-2 bg-purple-500 text-white rounded text-sm hover:bg-purple-600 transition-colors whitespace-nowrap flex-1 sm:flex-none"
            >
              Fetch by Institute
            </button>
          </div>

          <div className="flex items-center gap-2 flex-1 min-w-[200px]">
            <input
              type="text"
              placeholder="Course ID"
              className="px-3 py-2 border rounded text-sm w-full max-w-[120px] sm:max-w-[140px]"
              value={courseId}
              onChange={(e) => setCourseId(e.target.value)}
            />
            <button
              onClick={handleFetchById}
              className="px-3 py-2 bg-orange-500 text-white rounded text-sm hover:bg-orange-600 transition-colors whitespace-nowrap flex-1 sm:flex-none"
            >
              Fetch by ID
            </button>
          </div>
        </div>

        <p
          className="font-medium mt-3 sm:mt-4 text-sm sm:text-base"
          style={{
            color: COLORS.primary_black,
            fontFamily: FONTS.medium.fontFamily,
          }}
        >
          {loading
            ? "Loading courses..."
            : error
              ? `Failed to load courses: ${error}`
              : `${sortedAndFilteredCourses.length} Courses Found`}
        </p>
      </header>

      <main className="flex flex-1 gap-4 sm:gap-6 px-4 sm:px-6 lg:px-8 py-4 sm:py-6 relative">
        <aside className="hidden lg:block w-72 shrink-0">
          <div className="sticky top-28">
            <FilterSidebar
              onFilterChange={handleFilterChange}
              activeFilter={activeFilter}
            />
          </div>
        </aside>

        {isSidebarOpen && (
          <div className="fixed inset-0 z-50 bg-black/40 flex justify-end lg:hidden">
            <div className="bg-white w-80 sm:w-96 h-full p-4 sm:p-6 overflow-y-auto shadow-lg animate-in slide-in-from-right duration-300">
              <div className="flex justify-between items-center mb-4 sm:mb-6">
                <h2 className="font-semibold text-lg sm:text-xl">Filters</h2>
                <button
                  onClick={() => setIsSidebarOpen(false)}
                  className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
              <FilterSidebar
                onFilterChange={handleFilterChange}
                activeFilter={activeFilter}
              />
            </div>
          </div>
        )}

        <button
          onClick={() => setIsSidebarOpen(true)}
          className="lg:hidden fixed bottom-6 right-6 z-40 flex items-center gap-2 px-4 py-3 rounded-full shadow-lg hover:opacity-90 transition-opacity"
          style={{
            backgroundColor: COLORS.primary_red,
            fontFamily: FONTS.medium.fontFamily,
          }}
        >
          <img src={filter} alt="Filter Icon" className="w-5 h-5" />
          <span
            style={{ color: COLORS.primary_white }}
            className="text-sm sm:text-base"
          >
            Filters
          </span>
        </button>

        <section className="flex-1 grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
          {loading && (
            <div className="col-span-full flex justify-center py-8 sm:py-12">
              <p className="text-base sm:text-lg">Loading courses...</p>
            </div>
          )}

          {!loading && error && (
            <div className="col-span-full flex justify-center py-8 sm:py-12">
              <p className="text-red-500 text-base sm:text-lg">
                Error: {error}
              </p>
            </div>
          )}

          {!loading && !error && sortedAndFilteredCourses.length === 0 && (
            <div className="col-span-full flex justify-center py-8 sm:py-12">
              <p className="text-base sm:text-lg text-center">
                No courses found. Try adjusting your filters.
              </p>
            </div>
          )}

          {!loading &&
            !error &&
            sortedAndFilteredCourses.map((course: any) => (
              <div key={course.id || course._id} className="relative group">
                <CourseCard course={course} />
              </div>
            ))}
        </section>
      </main>
    </div>
  );
}
