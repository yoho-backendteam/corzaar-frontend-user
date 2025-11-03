import React from "react";
import arrow from "../../../../assets/profile/icons/arrow.png";
import icon from "../../../../assets/profile/icons/icons.png";
import ache from "../../../../assets/profile/icons/check.png";
import { useAppSelector } from "../../../../hooks/reduxhooks";

export const Portfolio: React.FC = () => {
  const profile = useAppSelector((state) => state.profile);

  return (
    <div className="flex flex-col gap-10">
      <div>
        <div className="grid md:grid-cols-3 gap-6">
          {profile.projects.map((project, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition"
            >
              <div className="flex justify-between items-center mb-4">
                <img src={arrow} alt="arrow icon" className="w-8 h-8" />
                <img src={icon} alt="icon" className="w-4 h-4" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{project.title}</h3>
              <p className="text-sm text-gray-600 mb-4">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2 mb-3">
                {project.tags?.map((tag: string, idx: number) => (
                  <span
                    key={idx}
                    className="bg-gray-100 text-gray-700 px-3 py-1 text-xs rounded-md"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <p className="text-xs text-gray-500">{project.date}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-white rounded-2xl p-6 ">
        <h2 className="text-2xl font-bold mb-6 text-gray-900">
          Achievements & Certifications
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {profile.achievements.map((ach, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6  hover:shadow-lg transition"
            >
              <div className="flex items-center mb-3">
                <img
                  src={ache}
                  alt="achievement icon"
                  className="w-6 h-6 mr-2"
                />
              </div>
              <h3 className="text-base font-semibold">{ach.title}</h3>
              <p className="text-sm text-gray-700">{ach.organization}</p>
              <p className="text-sm text-gray-600 mb-2">{ach.description}</p>
              <p className="text-xs text-gray-500">{ach.date}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
