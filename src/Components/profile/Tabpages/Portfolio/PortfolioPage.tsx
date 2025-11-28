import React, { useEffect } from "react";
import arrow from "../../../../assets/profile/icons/arrow.png";
import icon from "../../../../assets/profile/icons/icons.png";
import ache from "../../../../assets/profile/icons/check.png";
import { useAppSelector } from "../../../../hooks/reduxhooks";
import { COLORS } from "../../../../Constants/uiconstants";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch } from "../../../../store/store";
import { getPortfolioData } from "../../../../features/settings/reducers/settingThunks";
import { portSelect } from "../../../../features/settings/reducers/settingSelectors";

export const Portfolio: React.FC = () => {

      const dispatch = useDispatch<AppDispatch>();


  useEffect(() => {
    (async () => {
      try {
        
        const id = "691d8d28340440bf767c5b1d";
        const data = await dispatch(getPortfolioData(id));
        const pay = data?.data
        // if(pay.success === true)
        //   toast.success(pay.message)
      } catch (error : unknown) {
          // toast.error(error as Error["message"])
      }
    })();
  }, []);

  const profile2 = useSelector(portSelect)
  console.log("portfoilki",profile2)


  const profile = useAppSelector((state) => state.profile);

  return (
    <div className="flex flex-col gap-10">
      <div>
        <div className="grid md:grid-cols-3 gap-6">
          {profile.projects.map((project, index) => (
            <div
              key={index}
              className=" rounded-2xl shadow-md p-6 hover:shadow-lg transition"
              style={{ backgroundColor: COLORS.primary_white }}
            >
              <div className="flex justify-between items-center mb-4">
                <img src={arrow} alt="arrow icon" className="w-8 h-8" />
                <img src={icon} alt="icon" className="w-4 h-4" />
              </div>
              <h3
                className="text-lg font-semibold mb-2"
                style={{ color: COLORS.primary_black }}
              >
                {project.title}
              </h3>
              <p
                className="text-sm  mb-4"
                style={{ color: COLORS.primary_gray }}
              >
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2 mb-3">
                {project.tags?.map((tag: string, idx: number) => (
                  <span
                    key={idx}
                    className=" text-gray-700 px-3 py-1 text-xs rounded-md"
                    style={{ backgroundColor: `${COLORS.primary_gray}2A` }}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <p
                className="text-xs "
                style={{ color: `${COLORS.primary_gray}` }}
              >
                {project.date}
              </p>
            </div>
          ))}
        </div>
      </div>
      <div
        className=" rounded-2xl p-6 "
        style={{ backgroundColor: COLORS.primary_white }}
      >
        <h2
          className="text-2xl font-bold mb-6 "
          style={{ color: COLORS.primary_black }}
        >
          Achievements & Certifications
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {profile.achievements.map((ach, index) => (
            <div
              key={index}
              className=" rounded-2xl p-6  hover:shadow-lg transition"
            >
              <div className="flex items-center mb-3">
                <img
                  src={ache}
                  alt="achievement icon"
                  className="w-6 h-6 mr-2"
                />
              </div>
              <h3 className="text-base font-semibold">{ach.title}</h3>
              <p className="text-sm " style={{ color: COLORS.primary_gray }}>
                {ach.organization}
              </p>
              <p
                className="text-sm  mb-2"
                style={{ color: COLORS.primary_gray }}
              >
                {ach.description}
              </p>
              <p className="text-xs " style={{ color: COLORS.primary_gray }}>
                {ach.date}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
