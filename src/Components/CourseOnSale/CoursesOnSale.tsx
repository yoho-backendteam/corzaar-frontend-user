import React from "react";
import { useSelector } from "react-redux";
import { selectCourses } from "../../features/courses/Selector";
import { LuGraduationCap } from "react-icons/lu";
import { COLORS, FONTS } from "../../Constants/uiconstants";

const CoursesOnSale: React.FC = () => {
  const courses = useSelector(selectCourses);

  return (
    <div className="py-10 px-6" style={FONTS.regular as any}>
     
      <h2 className="mb-1"  style={FONTS.boldHeading as any}>Courses on Sale</h2>
      <p className="mb-5" style={FONTS.regular as any}>
        {courses.length} Courses with active discounts
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {courses.map((course) => (
          <div
            key={course.id}
            className=" rounded-xl shadow-md overflow-hidden"  style={{background : COLORS.primary_white}}
          >
            <div className="relative">
              <img
                src={course.image}
                alt={course.title}
                className="w-full h-80 object-cover"
                style={{ ...(FONTS.medium as any), color: COLORS.primary_white}}
              />
              <span className="absolute top-2 left-2 px-2 py-1 rounded"  style={{ ...(FONTS.regular as any), color: COLORS.primary_white , background : COLORS.primary_red}}>
                {course.discount}
              </span>
            </div>

            <div className="p-4">
              <span className=" px-2 py-1 rounded font-semibold" style={{color: COLORS.primary_white , background : COLORS.primary_red}}>
                 {course.category}
              </span>

              <h3 className="mt-2 " style={FONTS.regular as any}>{course.title}</h3>
              <p style={{ ...(FONTS.regular as any), color: COLORS.primary_gray}}>{course.author}</p>

              <div className="mt-2 flex gap-4 justify-between">
                <div>
                  <span style={FONTS.boldHeading as any}>{course.newPrice}</span>{" "}
                  <span className="line-through" style={{ ...(FONTS.regular as any), color: COLORS.primary_gray}}>
                    {course.oldPrice}
                  </span>
                </div> 
                <div>
                  <p className="text-green-600 mt-1" style={FONTS.regular as any}>
                    {course.save}
                  </p>
                </div>
              </div>

              <button
                className="flex justify-center items-center gap-1 mt-4 w-full py-2 rounded hover:bg-red-700 transition"
               style={{ ...(FONTS.regular as any), color: COLORS.primary_white , background : COLORS.primary_red}}>
              
                View Courses <LuGraduationCap />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-md p-6 max-w-8xl mx-auto">
        <h3 className="mb-4" style={FONTS.medium as any}>How to Use Coupon Codes</h3>
        <ol className="list-decimal list-inside text-gray-700 space-y-2">
          <li>Copy the coupon code from the offer above</li>
          <li>Add courses to your cart</li>
          <li>Paste the code in the coupon field at checkout</li>
          <li>Click “Apply” to get your discount</li>
          <li>Complete your purchase and start learning!</li>
        </ol>
      </div>
    </div>
  );
};

export default CoursesOnSale;
