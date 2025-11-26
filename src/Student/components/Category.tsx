import type { RootState } from "../../store/store";
import { useSelector } from "react-redux";
import { COLORS, FONTS } from "../../Constants/uiconstants";

const Category = () => {
  const categories = useSelector(
    (state: RootState) => state.studentHome.categories
  );

  return (
    <>
      <section className="py-8 md:py-12 lg:py-16 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20">
        <div className="text-left mb-8 sm:mb-10 md:mb-12 lg:mb-14">
          <h2
            className="text-xl sm:text-2xl md:text-3xl font-bold text-black mb-2"
            style={{
              ...(FONTS.S_Cart_title as any),
              color: COLORS.primary_black,
            }}
          >
            Explore by Category
          </h2>
          <p
            className="text-xs sm:text-sm md:text-base"
            style={{ ...(FONTS.sub_head1 as any), color: COLORS.primary_gray }}
          >
            Find courses in your area of Interest
          </p>
        </div>

        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
          {categories.map((category) => (
            <div
              key={category.id}
              className="bg-white rounded-[12px] shadow-md hover:shadow-lg transition-all duration-300 text-center cursor-pointer 
                                w-full max-w-[280px] sm:max-w-[300px] md:w-[308px] h-[84px] sm:h-[90px] md:h-[94px] p-3 sm:p-[12px] px-4 sm:px-[16px] 
                                border border-gray-200 flex flex-col justify-center gap-2 sm:gap-3 mx-auto"
            >
              <h3 className="text-base sm:text-lg font-semibold text-black">
                {category.name}
              </h3>
              <p
                className="text-xs sm:text-sm"
                style={{ color: COLORS.primary_gray }}
              >
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
