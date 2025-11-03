import React from "react";
import { useSelector } from "react-redux";
import { selectCourses } from "../features/courses/Selector";
import { LuGraduationCap } from "react-icons/lu";


const CoursesOnSale: React.FC = () => {
  const courses = useSelector(selectCourses);

  return (
    <div className="py-10 px-6">
     
      <h2 className="text-xl font-bold mb-1">Courses on Sale</h2>
      <p className="text-sm text-black mb-5">
        {courses.length} Courses with active discounts
      </p>

     
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {courses.map((course) => (
          <div
            key={course.id}
            className="bg-white rounded-xl shadow-md overflow-hidden"
          >
           
            <div className="relative">
              <img
                src={course.image}
                alt={course.title}
                className="w-full h-80 object-cover"
              />
              <span className="absolute top-2 left-2 bg-red-600 text-white text-xs px-2 py-1 rounded">
                {course.discount}
              </span>
            </div>

           
            <div className="p-4">
              <span className="bg-gray-100 text-xs text-red-600 px-2 py-1 rounded font-semibold">
                 {course.category}
              </span>

              <h3 className="font-semibold mt-2 leading-snug">{course.title}</h3>
              <p className="text-sm text-gray-600">{course.author}</p>

              <div className="mt-2 flex gap-4 justify-between">
               <div>
                <span className="text-xl font-bold">{course.newPrice}</span>{" "}
                <span className="text-gray-400 line-through text-sm">
                  {course.oldPrice}
                </span>
                </div> 
                <div><p className="text-green-600 text-xs font-semibold mt-1">
                {course.save}
              </p></div>
              </div>

            

              <button className="flex justify-center items-center gap-1 mt-4 w-full bg-red-600 text-white font-semibold py-2 rounded hover:bg-red-700 transition">
                View Courses<LuGraduationCap/>

              </button>
            </div>
          </div>
        ))}
      </div>

     
      <div className="bg-white rounded-xl shadow-md p-6 max-w-8xl mx-auto">
        <h3 className="text-lg font-semibold mb-4">How to Use Coupon Codes</h3>
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
