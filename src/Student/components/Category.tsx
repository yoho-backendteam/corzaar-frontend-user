import type { RootState } from "../../store/store";
import React from "react";
import { useSelector } from "react-redux";


const Category = () => {
    const categories = useSelector((state: RootState) => state.studentHome.categories)
  return (
    <>

      <section className="py-16 px-6 md:px-12 lg:px-20">
        <div className="text-left mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-black mb-2">
            Explore by Category
          </h2>
          <p className="text-[#707070] text-sm md:text-base">
            Find courses in your area of Interest
          </p>
        </div>

        {/* Category Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((category) => (
            <div
              key={category.id}
              className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 text-center py-10 cursor-pointer"
            >
              <h3 className="text-lg font-semibold text-black mb-2">
                {category.name}
              </h3>
              <p className="text-gray-600 text-sm">
                {category.courses} Courses
              </p>
            </div>
          ))}
        </div>
      </section>

     
    </>
  );
};

export default Category;
