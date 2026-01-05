import React from "react";
import { useParams } from "react-router-dom";
import robo from "../../assets/robo.png";
import syste from "../../assets/syste.png";
import laptop from "../../assets/laptop.png";
import icon from "../../assets/icon.png";
import star from "../../assets/star.png";
import hat from "../../assets/hat.png";
import student from "../../assets/student.png"; 
import map from "../../assets/map.png";
import clock from "../../assets/clock.png";
import linkicon from "../../assets/linkicon.png";
import facebicon from "../../assets/facebicon.png";
import ratingicon from "../../assets/ratingicon.png";
import course from "../../assets/course.png";
import heart from "../../assets/heart.png";
import {
  CheckCircle,
  Mail,
  Phone,
  Globe,
 
} from "lucide-react";
import { FONTS } from "../../Constants/uiconstants";

const institutes = [
  {
    id: 1,
    name: "Tech Academy Pro",
    banner: laptop,
    description:
      "Leading technology education provider with expert instructors and industry partnerships. We offer world-class technology, business, and management programs.",
    rating: 4.9,
    
    courses: 65,
    students: 14500,
    location: "Bangalore, India",
    tags: ["Technology", "Design", "Business"],
    website: "https://techacademypro.com",
    email: "info@techacademypro.com",
    phone: "+91 90000 12345",
    verified: true,
    allCourses: [
      {
        id: 1,
        title: "Complete Web Development Bootcamp",
        image: robo,
        description1: "Master web development with HTML, CSS, JS, React, Node.js, and more. Build real-world projects and get job-ready.",
        instructor: "Tech Academy Pro",
        rating: 4.7,
        students: 5478,
        weeks: 12,
        level: "Beginner",
        enrolled: true,
        oldPrice: 4999,
        price: 2999,
        price1: "40% off"
      },
      {
        id: 2,
        title: "Data Science & Machine Learning",
        image: syste,
        description1: "Learn data analysis, visualization, and machine learning using Python.Master ML algorithms and build predictive models.",
        instructor: "Tech Academy Pro",
        rating: 4.9,
        students: 8901,
        weeks: 16,
        level: "Intermediate",
        enrolled: false,
        oldPrice: 5999,
        price: 3499,
                price1: "40% off"

      },
    ],
  },
];
   
const InstituteDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const institute = institutes.find((inst) => inst.id === Number(id));

  if (!institute) {
    return (
      <p className="text-center mt-10 text-[#000000]">Institute not found.</p>
    );
  }

  return (
    <div className="bg-[#FFDD00] min-h-screen">
      {/* Banner Image */}
      <div className="relative h-60">
        <img
          src={institute.banner}
          alt="Institute Banner"
          className="w-full h-56 md:h-72 object-cover"
        />
      </div>

      {/* Floating Info Card */}
      <div className="relative z-20 max-w-6xl mx-auto -mt-10 bg-[#FFFFFF] shadow-lg rounded-xl p-5 flex flex-col md:flex-row justify-start items-center gap-4">
        {/* Left Gray Box */}
<div
  className="bg-[#D9D9D9] rounded-lg shrink-0"
  style={{
    width: "160px",
    height: "160px",
  }}
/>   

        {/* Institute Info */}
        <div className="flex-1 w-full md:w-[600px]">
          {/* 🔹 Name + Verified + View Website */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <h2             style={FONTS.boldHeadingg as React.CSSProperties} 
               className="text-[#000000] md:text-2xl font-semibold">
                {institute.name}
              </h2>

              {/* ✅ Verified Button */}
              {institute.verified && (
                <button  style={FONTS.boldHeadingg as React.CSSProperties} className="flex items-center gap-2 bg-[#68D391] text-[#101828] px-3 py-1 rounded-md text-xs font-medium shadow-sm border-[#00000000]">
                  Verified <CheckCircle size={14} className="text-[#101828]" />
                </button>
              )}
            </div>

            <button
  onClick={() => window.open(institute.website, "_blank")}
  style={FONTS.tabheadingg as React.CSSProperties}
  className="flex items-center justify-center gap-2 bg-[#7070701A] text-[#0A0A0A] px-3 py-2 rounded-md text-sm md:text-base transition"
>
  View Website
  <img src={icon} alt="website icon" className="w-5 h-5 object-contain" />
</button>

          </div>

          <p style={FONTS.regularr as React.CSSProperties} className="text-[#707070] mt-1 line-clamp-3">
            {institute.description}
          </p>

         <div  style={FONTS.mediummm as React.CSSProperties} className="flex items-center gap-3 mt-3 text-[#707070] text-sm">
                <img src={star} alt="Rating" className="w-4 h-4" />
                <span>{institute.rating}</span>
                <img src={hat} alt="Courses" className="w-4 h-4" />
                <span>{institute.courses} Courses</span>
                <img src={student} alt="Students" className="w-4 h-4" />
                <span>{institute.students} Students</span>
                <img src={map} alt="Location" className="w-4 h-4" />
                <span>{institute.location}</span>
              </div>

          <div style={FONTS.mediummm as React.CSSProperties} className="flex gap-2 mt-3 flex-wrap">
            {institute.tags.map((tag) => (
              <span
                key={tag}
                className="bg-[#7070701A] text-[#707070] px-3 py-1 rounded-md text-xs font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Main Section */}
      <div className="max-w-6xl mx-auto mt-16 grid grid-cols-1 lg:grid-cols-3 gap-6 px-4 pb-10">
        {/* Left Section - Courses */}
        <div className="lg:col-span-2">
          <div style={FONTS.regularr as React.CSSProperties} className="flex flex-wrap gap-5 mb-4">
            <button className="bg-[#ED1C24] text-[#FFFFFF] px-3 py-1 rounded-md text-sm">
              All Categories
            </button>
            {institute.tags.map((tag) => (
              <button
                key={tag}
                className="bg-[#FFFFFF] text-[#ED1C24] px-3 py-1 rounded-md text-sm"
              >
                {tag}
              </button>
            ))}
          </div>

          <h2 style={FONTS.boldHeading1 as React.CSSProperties} className="  text-[#000000] mb-4">
            All Courses ({institute.allCourses.length})
          </h2>

          <div className="space-y-6 w-full ">
            {institute.allCourses.map((course) => (
              <div
  key={course.id}
  className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition relative h-165"
>
  {/* 📸 Course Image Section with Overlays */}
  <div className="relative ">

  {/* Course Image */}
 <div className="bg-white rounded-xl shadow-md h-83 p-3 ">
  <div className="rounded-xl overflow-hidden h-80 bg-white p-1">
    <img
      src ={course.image}
      alt={course.title}
      className="w-full h-75 object rounded-lg"
    />
  </div>
</div>



  {/* 🔴 40% OFF Badge */}
  <div style={FONTS.tabheadingg as React.CSSProperties} className="absolute top-3 left-3 mt-5 ml-5 px-3 py-2 bg-[#ED1C24] text-white text-xs font-semibold  rounded-md shadow-md z-10">
    40% OFF
  </div>

  {/* ❤️ Heart Icon */}
  <div className="absolute top-3 right-3 bg-[#FFFFFF] rounded-full p-1 mr-5 mt-4 shadow-md cursor-pointer">
    <img src={heart} alt="Favorite" className="w-10 h-10 " />
  </div>

  {/* 🟩 Enrolled Tag */}
  {course.enrolled && (
    <div style={FONTS.tabheadingg as React.CSSProperties} className="absolute bottom-3 right-3 mb-6 mr-5 bg-[#00A63E] text-[#FFFFFF] text-xs px-3 py-1 rounded-md shadow-md z-10">
      Enrolled
    </div>
  )}
</div>


  {/* 📘 Course Info */}
  <div className="p-5">
    <div
      style={FONTS.mediumm as React.CSSProperties}
      className="flex justify-between items-center mb-2"
    >
      <span className="bg-[#ED1C24] text-[#FFFFFF] text-xs px-2 py-1 rounded">
        Technology
      </span>

      <span className="text-xs px-2 py-1 border border-[#ED1C24] rounded text-[#ED1C24]">
        {course.level}
      </span>
    </div>

    <h3
      style={FONTS.boldHeadingg2 as React.CSSProperties}
      className="font-semibold text-[#000000]"
    >
      {course.title}
    </h3>

    <p
      style={FONTS.regular as React.CSSProperties}
      className="text-sm text-[#707070] mt-1"
    >
      {course.description1}
    </p>

    <p
      style={FONTS.boldHeadingg3 as React.CSSProperties}
      className="text-sm text-[#000000] mt-3"
    >
      {course.instructor}
    </p>

    {/* 📊 Course Stats */}
    <div
      style={FONTS.mediummm as React.CSSProperties}
      className="flex items-center gap-4 text-gray-700 text-sm mt-2"
    >
      <div className="flex items-center gap-1">
        <img src={star} alt="Rating" className="w-4 h-4" />
        <span>{course.rating}(1234)</span>
      </div>

      <div className="flex items-center gap-1">
        <img src={student} alt="Students" className="w-4 h-4" />
        <span>{course.students}</span>
      </div>

      <div className="flex items-center gap-1">
        <img src={clock} alt="Duration" className="w-4 h-4" />
        <span>{course.weeks} Weeks</span>
      </div>
    </div>

    {/* 💰 Price Section */}
    <div className="flex justify-between items-center mt-3">
      <div>
        <span
          style={FONTS.numbold as React.CSSProperties}
          className="text-lg font-bold text-[#000000]"
        >
          ₹{course.price}
        </span>
        <span
          style={FONTS.nummedium as React.CSSProperties}
          className="text-[#707070] ml-3 line-through text-sm"
        >
          ₹{course.oldPrice}
        </span>
      </div>
    </div>

    {/* 🛒 Button */}
    <button
      style={FONTS.boldHeadingg2 as React.CSSProperties}
      className={`mt-3 px-4 py-2 w-full text-sm font-medium rounded-md ${
        course.enrolled
          ? "bg-[#ED1C24] text-[#FFFFFF]"
          : "bg-[#FFDD00] text-[#000000]"
      }`}
    >
      {course.enrolled ? "Already Enrolled" : "Add To Cart"}
    </button>
  </div>
</div>

            ))}
          </div>
        </div>

        {/* Right Section */}
        <div className="space-y-10 ">
          {/* Contact Info */}
          <div className="bg-white rounded-xl shadow-md w-full max-w-md p-6 mt-27 space-y-5">
  <h3
    style={FONTS.boldHeadingg as React.CSSProperties}
    className="font-semibold text-black mb-3"
  >
    Contact Information
  </h3>

  {/* 📍 Address */}
  <p
    style={FONTS.regularr as React.CSSProperties}
    className="flex items-start gap-3 text-sm text-[#707070]"
  >
    <img src={map} alt="Map" className="w-5 h-5 mt-0.5 object-contain" />
    123 Tech Park, Whitefield, Bangalore, Karnataka 560066, India
  </p>

  {/* ✉️ Email */}
  <p
    style={FONTS.regularr as React.CSSProperties}
    className="flex items-center gap-3 text-sm text-[#707070]"
  >
    <Mail size={16} /> {institute.email}
  </p>

  {/* 📞 Phone */}
  <p
    style={FONTS.regularr as React.CSSProperties}
    className="flex items-center gap-3 text-sm text-[#707070]"
  >
    <Phone size={16} /> {institute.phone}
  </p>

  {/* 🌐 Website */}
  <p
    style={FONTS.regularr as React.CSSProperties}
    className="flex items-center gap-3 text-sm text-[#707070] cursor-pointer hover:underline"
    onClick={() => window.open(institute.website, "_blank")}
  >
    <Globe size={16} /> Visit Website
  </p>
</div>


          {/* Connect */}
          <div
  style={FONTS.regularr as React.CSSProperties}
  className="bg-white rounded-xl shadow-md w-full p-5"
>
  <h3 className="font-semibold text-[#707070] mb-3">Connect With Us</h3>

  {/* LinkedIn Button */}
  <button className="w-full flex items-center justify- px-4 gap-2 border py-2 rounded-md mb-2 text-[#707070] bg-[#7070701A]">
    <img src={linkicon} alt="LinkedIn" className="w-5 h-5 object-contain" />
    LinkedIn
  </button>

  {/* Facebook Button */}
  <button className="w-full flex items-center justify- gap-2 px-4 border py-2 rounded-md text-[#707070] bg-[#7070701A]">
    <img src={facebicon} alt="Facebook" className="w-5 h-5 object-contain" />
    Facebook
  </button>
</div>


          {/* Quick Stats */}
        <div className="bg-white rounded-xl shadow-md w-full p-5 space-y-4">
  <h3   style={FONTS.boldHh as React.CSSProperties}
 className="font-semibold text-[#000000] mb-4">Quick Stats</h3>

  {/* Rating */}
  <div   style={FONTS.nummedium as React.CSSProperties}
  className="flex justify-between items-center text-sm text-[#707070]">
    <div  className="flex items-center gap-2">
      <img src={ratingicon} alt="Rating Icon" className="w-5 h-5 object-contain" />
      <span>Rating</span>
    </div>
    <span className="flex items-center gap-1"> <img src={star} alt="Rating Icon" className="w-5 h-5 object-contain" /> {institute.rating}</span>
  </div>

  {/* Total Courses */}
  <div  style={FONTS.nummedium as React.CSSProperties} className="flex justify-between items-center text-sm text-[#707070]">
    <div className="flex items-center gap-2">
      <img src={course} alt="Courses Icon" className="w-5 h-5 object-contain" />
      <span>Total Courses</span>
    </div>
    <span>{institute.courses}</span>
  </div>

  {/* Total Students */}
  <div  style={FONTS.nummedium as React.CSSProperties}className="flex justify-between items-center text-sm text-[#707070]">
    <div className="flex items-center gap-2">
      <img src={student} alt="Students Icon" className="w-5 h-5 object-contain" />
      <span>Total Students</span>
    </div>
    <span>{institute.students}</span>
  </div>
</div>


        </div>
      </div>
    </div>
  );
};

export default InstituteDetails; 
