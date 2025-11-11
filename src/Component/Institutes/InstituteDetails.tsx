import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../store/store";
import { fetchInstituteById } from "../../features/institute/reducers/thunks";
import { selectInstitute } from "../../features/institute/reducers/selectors";
import { FONTS } from "../../Constants/uiconstants";
import {
  Mail,
  Phone,
  MapPin,
  Globe,
  Users,
  BookOpen,
  Star,
  CheckCircle,
} from "lucide-react";

const InstituteDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const institute = useSelector(selectInstitute);
  const { loading, error } = useSelector((state: RootState) => state.institute);

  useEffect(() => {
    if (id) dispatch(fetchInstituteById(id));
  }, [dispatch, id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen text-lg font-semibold bg-gray-100">
        Loading Institute Details...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen text-red-500 text-lg font-semibold bg-gray-100">
        Failed to load institute details: {error}
      </div>
    );
  }

  if (!institute) {
    return (
      <div className="flex justify-center items-center min-h-screen text-gray-500 text-lg font-semibold bg-gray-100">
        No institute details found.
      </div>
    );
  }

  return (
  <div className="min-h-screen w-full flex flex-col bg-[#FFDD00] overflow-x-hidden">
    {/* Banner Section */}
    <div className="relative w-full h-[40vh] md:h-[50vh]">
      <img
        src={institute.coverImage || institute.logo || ""}
        alt="Institute Banner"
        className="w-full h-full object-cover"
      />

      {/* Optional dark overlay for text contrast */}
      <div className="absolute inset-0 bg-black/20" />
    </div>

    {/* Floating Card */}
    <div className="relative -mt-20 z-10 px-4 w-full flex justify-center">
      <div className="max-w-6xl w-full bg-white shadow-xl rounded-2xl p-6 md:p-8 flex flex-col md:flex-row gap-8 items-center">
        {/* Logo */}
        <div
          className="bg-[#D9D9D9] rounded-xl overflow-hidden shrink-0"
          style={{ width: "160px", height: "160px" }}
        >
          {institute.logo ? (
            <img
              src={institute.logo}
              alt={institute.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="flex justify-center items-center h-full text-gray-400">
              No Image
            </div>
          )}
        </div>

        {/* Info Section */}
        <div className="flex-1">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <h2
                style={FONTS.boldHeadingg as React.CSSProperties}
                className="text-[#000000] text-2xl md:text-3xl font-semibold"
              >
                {institute.name}
              </h2>

              {institute.verification?.status === "verified" && (
                <div className="flex items-center gap-2 bg-[#68D391] text-[#101828] px-3 py-1 rounded-md text-xs font-medium shadow-sm">
                  Verified <CheckCircle size={14} />
                </div>
              )}
            </div>

            {institute.website && (
              <button
                onClick={() => window.open(institute.website, "_blank")}
                className="flex items-center gap-2 bg-[#7070701A] text-[#0A0A0A] px-3 py-2 rounded-md text-sm md:text-base transition"
              >
                View Website <Globe size={18} />
              </button>
            )}
          </div>

          <p className="text-[#707070] mt-3">
            {institute.description || "No description available."}
          </p>

          <div className="flex flex-wrap gap-4 mt-4 text-[#707070] text-sm">
            <div className="flex items-center gap-1">
              <Star className="text-yellow-500" size={16} />
              <span>
                Rating: {institute.statistics?.averageRating || "N/A"}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <BookOpen className="text-[#ED1C24]" size={16} />
              <span>Courses: {institute.statistics?.totalCourses || 0}</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="text-blue-600" size={16} />
              <span>Students: {institute.statistics?.totalStudents || 0}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* Bottom Section */}
    <div className="flex-1 flex justify-center px-4 py-10">
      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Contact Info */}
        <div className="bg-white rounded-2xl shadow-md p-6 space-y-4">
          <h3 className="font-semibold text-black mb-3 text-xl">
            Contact Information
          </h3>

          <p className="flex items-start gap-3 text-sm text-[#707070]">
            <MapPin size={16} />
            {institute.contactInfo?.address
              ? `${institute.contactInfo.address.street}, ${institute.contactInfo.address.city}, ${institute.contactInfo.address.state}`
              : "Address not available"}
          </p>

          <p className="flex items-center gap-3 text-sm text-[#707070]">
            <Mail size={16} />
            {institute.contactInfo?.email || "Email not available"}
          </p>

          <p className="flex items-center gap-3 text-sm text-[#707070]">
            <Phone size={16} />
            {institute.contactInfo?.phone || "Phone not available"}
          </p>
        </div>

        {/* Quick Stats */}
        <div className="bg-white rounded-2xl shadow-md p-6 space-y-4 lg:col-span-2">
          <h3 className="font-semibold text-black mb-3 text-xl">Quick Stats</h3>
          <div className="flex flex-wrap gap-6 text-[#707070]">
            <div className="flex flex-col">
              <span>Faculty Members</span>
              <strong className="text-black text-lg">
                {institute.number_of_faculty || 0}
              </strong>
            </div>
            <div className="flex flex-col">
              <span>Student Capacity</span>
              <strong className="text-black text-lg">
                {institute.student_capacity || 0}
              </strong>
            </div>
            <div className="flex flex-col">
              <span>Status</span>
              <strong className="text-black text-lg capitalize">
                {institute.status || "N/A"}
              </strong>
            </div>
            <div className="flex flex-col">
              <span>Active</span>
              <strong className="text-black text-lg">
                {institute.isActive ? "Yes" : "No"}
              </strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
};

export default InstituteDetails;
