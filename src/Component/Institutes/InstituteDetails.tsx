import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../store/store";
import { fetchInstituteById } from "../../features/institute/reducers/thunks";
import { FONTS } from "../../Constants/uiconstants";
import { Mail, Phone, MapPin, Globe, Users, BookOpen, Star } from "lucide-react";
import { selectInstitute } from "../../features/institute/reducers/selectors";

const InstituteDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const institute = useSelector(selectInstitute);

  const { loading, error } = useSelector(
    (state: RootState) => state.institute
  );

 useEffect(() => {
  if (id) {
    dispatch(fetchInstituteById(id));
  }
}, [dispatch, id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen text-lg font-semibold">
        Loading Institute Details...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 mt-20">
        Failed to load institute details: {error}
      </div>
    );
  }

  if (!institute) {
    return (
      <div className="text-center text-gray-500 mt-20">
        No institute details found.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFDD00] py-10 px-4 sm:px-6 md:px-10 lg:px-20">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-md overflow-hidden">
        <img
          src={institute.logo || institute.image || ""}
          alt={institute.name}
          className="w-full h-56 sm:h-72 object-cover"
        />
        <div className="p-6">
          <h1
            style={FONTS.boldHeading as React.CSSProperties}
            className="text-2xl sm:text-3xl font-bold text-gray-900"
          >
            {institute.name}
          </h1>
          <p
            style={FONTS.regular as React.CSSProperties}
            className="text-sm sm:text-base text-gray-600 mt-2"
          >
            {institute.description}
          </p>

          {/* Stats */}
          <div className="flex flex-wrap gap-4 mt-4 text-sm text-gray-700">
            <div className="flex items-center gap-2">
              <Star className="text-yellow-500" size={16} />
              <span>{institute.statistics?.averageRating || "N/A"} Rating</span>
            </div>
            <div className="flex items-center gap-2">
              <BookOpen size={16} className="text-[#ED1C24]" />
              <span>{institute.statistics?.totalCourses || 0} Courses</span>
            </div>
            <div className="flex items-center gap-2">
              <Users size={16} className="text-blue-600" />
              <span>{institute.statistics?.totalStudents || 0} Students</span>
            </div>
          </div>

          {/* Location */}
          <div className="flex items-center gap-2 mt-3 text-gray-700">
            <MapPin size={16} />
            <span>{institute.contactInfo?.address?.city || "City not available"}</span>
          </div>

          {/* Contact */}
          <div className="flex flex-wrap gap-4 mt-4 text-gray-700 text-sm sm:text-base">
            <div className="flex items-center gap-2">
              <Mail size={16} />
              <span>{institute.contactInfo?.email || "Email not available"}</span>
            </div>
            {institute.contactInfo?.phone && (
              <div className="flex items-center gap-2">
                <Phone size={16} />
                <span>{institute.contactInfo.phone}</span>
              </div>
            )}
          </div>

          {/* Links */}
          <div className="flex flex-wrap gap-6 mt-4">
            {institute.contactInfo?.website && (
              <a
                href={institute.contactInfo.website}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-[#ED1C24] hover:underline"
              >
                <Globe size={16} />
                Website
              </a>
            )}
            {institute.socialMedia?.linkedin && (
              <a
                href={institute.socialMedia.linkedin}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-blue-700 hover:underline"
              >
                LinkedIn
              </a>
            )}
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-5">
            {institute.tags?.map((tag: string) => (
              <span
                key={tag}
                className="text-xs bg-[#7070701A] px-3 py-1 rounded-md text-[#707070]"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstituteDetails;
