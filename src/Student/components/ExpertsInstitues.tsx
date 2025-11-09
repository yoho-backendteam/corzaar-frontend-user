import React, { useEffect } from "react";
import { Star, MapPin } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../store/store";
import { COLORS } from "../../Constants/uiconstants";
import { selectInstituteData } from "../../features/home_page/reducers/homeSelector";
import { getInstituteThunk } from "../../features/home_page/reducers/homeThunk";
import type { Institute } from "../../userHomeTypes/types";

const ExpertsInstitute = () => {
  const institutes = useSelector<RootState, Institute[]>(selectInstituteData);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const getInstitutes = async () => {
      try {
        await dispatch(getInstituteThunk());
      } catch (error) {
        console.error("Error fetching institutes:", error);
      }
    };
    getInstitutes();
  }, [dispatch]);

  // Only show first 4 institutes
  const limitedInstitutes = institutes.slice(0, 4);

  return (
    <section
      className="py-12 px-6 md:px-12 lg:px-20"
      style={{ background: COLORS.primary_red }}
    >
      {/* Header */}
      <div className="mb-14 text-left">
        <h2 className="text-2xl md:text-3xl text-white font-bold mb-1">
          Institutes Experts Hub
        </h2>
        <p className="text-sm md:text-base text-white">
          Discover quality education providers in your area
        </p>
      </div>

      {/* Card Grid or Empty State */}
      {limitedInstitutes.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {limitedInstitutes.map((institute) => (
            <div
              key={institute.id}
              className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300"
            >
              <img
                src={institute.coverImage}
                alt={institute.name}
                className="w-full h-40 object-cover"
              />
              <div className="p-5 text-left">
                <h3 className="text-lg mt-3 font-semibold text-black mb-1">
                  {institute.name}
                </h3>
                <p
                  className="mt-3 text-sm mb-3"
                  style={{ color: COLORS.primary_gray }}
                >
                  {institute.courses} courses
                </p>

                <div
                  className="flex flex-col gap-1 text-sm"
                  style={{ color: COLORS.primary_gray }}
                >
                  <div className="flex mt-3 items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    <span className="font-semibold">{institute.rating}</span>
                  </div>
                  <div
                    className="flex mt-3 items-center gap-1"
                    style={{ color: COLORS.primary_gray }}
                  >
                    <MapPin className="w-4 h-4" />
                    <span>{institute.location}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
      
        <div className="text-center py-20 text-white text-lg font-medium">
          No institute expert hubs available
        </div>
      )}
    </section>
  );
};

export default ExpertsInstitute;
