import type { AppDispatch, RootState } from "../../store/store";
import  { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { COLORS } from "../../Constants/uiconstants";
import {
  selectCategoryData,
  selectCourseData,
} from "../../features/home_page/reducers/homeSelector";
import { getCategoriesThunk } from "../../features/home_page/reducers/homeThunk";
import type { CategoryType, Course } from "../../userHomeTypes/types";

const Category = () => {
  const categories = useSelector<RootState, CategoryType[]>(selectCategoryData); 
  const courses = useSelector<RootState, Course[]>(selectCourseData); 
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const getCategories = async () => {
      try {
        await dispatch(getCategoriesThunk());
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    getCategories();
  }, [dispatch]);

 
  const courseCountMap: Record<string, number> = {};
  courses?.forEach((course) => {
    const primary = course?.category?.primary;
    if (primary) {
      courseCountMap[primary] = (courseCountMap[primary] || 0) + 1;
    }
  });

  
  const uniqueCategories = categories.reduce((acc, cat) => {
    const primary = cat?.category?.primary;
    if (!primary) return acc;

    
    const existing = acc.find((c) => c.primary === primary);
    if (!existing) {
      acc.push({
        primary,
        count: courseCountMap[primary] || 0,
      });
    }
    return acc;
  }, [] as { primary: string; count: number }[]);

 
  const limitedCategories = uniqueCategories.slice(0, 4);

  return (
    <section className="py-16 px-6 md:px-12 lg:px-20">
      {/* Header */}
      <div className="text-left mb-14">
        <h2 className="text-2xl md:text-3xl font-bold text-black mb-2">
          Explore by Category
        </h2>
        <p
          className="text-sm md:text-base"
          style={{ color: COLORS.primary_gray }}
        >
          Find courses in your area of interest
        </p>
      </div>

      {limitedCategories?.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {limitedCategories.map((cat) => (
            <div
              key={cat.primary}
              className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 text-center py-10 cursor-pointer"
            >
              <h3 className="text-lg font-semibold text-black mb-2">
                {cat.primary}
              </h3>
              <p className="text-sm" style={{ color: COLORS.primary_gray }}>
                {cat.count} Courses
              </p>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 text-gray-500 text-lg font-medium">
          No categories available
        </div>
      )}
    </section>
  );
};

export default Category;
