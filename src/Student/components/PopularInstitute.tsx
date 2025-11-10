import {  MapPin } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../store/store";
import { COLORS } from "../../Constants/uiconstants";
import { selectInstituteData } from "../../features/home_page/reducers/homeSelector";
import { useEffect } from "react";
import { getInstituteThunk } from "../../features/home_page/reducers/homeThunk";
import type { Institute } from "../../userHomeTypes/types";

const PopularInstitute = () => {
  const institutes = useSelector<RootState, Institute[]>(selectInstituteData);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const getInstitutes = async () => {
      try {
        await dispatch(getInstituteThunk());
      } catch (error) {
        console.error("Error in fetching trending courses:", error);
      }
    };
    getInstitutes();
  }, [dispatch]);


  const displayedInstitutes = institutes?.slice(0, 4);

  return (
    <section className="py-12 px-6 md:px-12 lg:px-20">
      {/* Header */}
      <div className="mb-14 text-left">
        <h2 className="text-2xl md:text-3xl font-bold text-black mb-1">
          Popular Institutes
        </h2>
        <p
          className="text-sm md:text-base"
          style={{ color: COLORS.primary_gray }}
        >
          Learn from verified and trusted Institutes
        </p>
      </div>

      {/* Card Grid or Empty Message */}
      {displayedInstitutes && displayedInstitutes.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {displayedInstitutes.map((institute) => (
            <div
              key={institute?._id}
              className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300"
            >
              {/* Image */}
              <img
                src={institute?.coverImage}
                alt={institute?.name}
                className="w-full h-40 object-cover"
              />

              {/* Info Section */}
              <div className="p-5 text-left">
                <h3 className="text-lg mt-3 font-semibold text-black mb-1">
                  {institute?.name}
                </h3>
                <p
  className="mt-3 text-sm mb-3"
  style={{ color: COLORS.primary_gray }}
>
  {Array.isArray(institute?.courses)
    ? `${institute?.courses.length} courses`
    : `${institute?.courses || 0} courses`}
</p>


                {/* Rating + Location */}
                <div className="flex flex-col gap-1 text-sm text-gray-700">
                  {/* <div className="flex mt-3 items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    <span className="font-semibold">{institute?.rating}</span>
                  </div> */}
                  <div
                    className="flex mt-3 items-center gap-1"
                    style={{ color: COLORS.primary_gray }}
                  >
                    <MapPin className="w-4 h-4" />
                    <span>{institute?.contactInfo?.address?.city}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p
          className="text-center text-gray-500 text-lg"
          style={{ color: COLORS.primary_gray }}
        >
          No institutes available
        </p>
      )}
    </section>
  );
};

export default PopularInstitute;
