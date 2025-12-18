import React, { useState } from "react";
import {
  Heart,
  Star,
  Users,
  Clock,
  ShoppingCart,
  Phone,
  X,
} from "lucide-react";
import { FaHeart } from "react-icons/fa";
import enroll from '../../assets/clipboard-tick.png'
import { COLORS, FONTS } from "../../Constants/uiconstants";
import type { CourseCardProps } from "../../userHomeTypes/types";
import { AddtoCartService } from "../../features/cart/services";
import { toast } from "react-toastify";
import { sendOTPThunk } from "../../features/userlogin/reducers/otpthunks";
import { useDispatch } from "react-redux";
import type { AppDispatch } from '../../store/store';
import type { OTPResponse } from "../../features/userlogin/types/otptypes";
import OTPVerification from "../../Components/Authentication/OTPVerification";
import SendOTP from "../../Components/Authentication/SendOTP";
import SignInPassword from "../../Components/Authentication/SignInPassword";
import { useNavigate } from "react-router-dom";
import { getBatchBycourseId } from "../../features/courses/service";
import { BatchModal } from "../../Components/StudentCourse/batchs/SelectBatchCard";
// import { useDispatch } from "react-redux";
// import type { AppDispatch } from "../../store/store";
// import { addtokartThunk } from "../../features/home_page/reducers/homeThunk";




const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  const [isFavorite, setIsFavorite] = useState(false);
   const [showLogin,setShowlogin] = useState(false)
    const [method, setMethod] = useState<"password" | "otp">("otp");
      const [otpStep, setOtpStep] = useState<"enter-phone" | "enter-otp">(
        "enter-phone"
      );
        const [phoneNumber, setPhoneNumber] = useState("");
        const [SelectedCourse, setSelectedCourse] = useState<any>(null);
        
        const dispatch = useDispatch<AppDispatch>();
      const navigate = useNavigate()
    // const { id } = useParams();

        const handleOpen = (id: string) => {
    navigate(`/courses/view/${id}`)
  }
  
   const handleSendOTP = async (): Promise<void> => {
      if (!phoneNumber) {
        toast.error("Phone number is required");
        return;
      }
  
      const resultAction = await dispatch(sendOTPThunk({ phoneNumber })) as OTPThunkResult;
  
      if (sendOTPThunk.fulfilled.match(resultAction)) {
        const payload: OTPResponse = resultAction.payload;
  
        toast.success(payload.message);
        setOtpStep("enter-otp");
      } else {
        const errorMessage =
          typeof resultAction.payload === "string"
            ? resultAction.payload
            : "Failed to send OTP";
        toast.error(errorMessage);
      }
    };
  
  // const dispatch = useDispatch<AppDispatch>();

 const handelSlectedCourse = async (courseId: string) => {
    try {
      
      const { data } = await getBatchBycourseId(courseId)
  
      console.log(data,"add to")
  
      if (data.length == 0) {
        return toast.warn("there is no batch available")
      }
  
      setSelectedCourse(data)
    } catch (error) {
      // navigate("/login")
      setShowlogin(true);
    }
  }

  const handelcloseModel = () => {
    setSelectedCourse(null)
  }


  const handleFavoriteToggle = () => {
    setIsFavorite((prev) => !prev);

    // Optional: Save favorite courses to localStorage
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");

    if (!isFavorite) {
      // Add course to favorites
      localStorage.setItem(
        "favorites",
        JSON.stringify([...favorites, course.id])
      );
    } else {
      // Remove from favorites
      localStorage.setItem(
        "favorites",
        JSON.stringify(favorites.filter((id: number) => id !== course.id))
      );
    }
  };

  const oldPrice = (course?.pricing?.price * 0.05) + course?.pricing?.price

  return (
    <div className="relative overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 p-2 rounded-2xl"
      style={{ background: COLORS.primary_white }}>
      {/* Image Section */}
      <div onClick={() => { handleOpen(course?._id) }} className="relative">
        <img
          src={course?.thumbnail || "/placeholder.png"}
          alt={course?.title || "Course Image"}
          className="w-full h-48 object-cover"
        />

        {/* Discount Tag */}
        {course.discount && (
          <div className="absolute top-3 left-3 text-xs font-semibold px-2 py-1 rounded-md" style={{ color: COLORS.primary_white, background: COLORS.primary_red }}>
            {course.discount}% OFF
          </div>
        )}


        <button
          onClick={handleFavoriteToggle}
          className="absolute top-3 right-3 rounded-full p-1.5 shadow hover:scale-110 transition"
          style={{ background: COLORS.primary_white }}
        >
          {isFavorite ? (
            <FaHeart className="w-5 h-5 " style={{ color: COLORS.primary_red }} />
          ) : (
            <Heart className="w-5 h-5 " style={{ color: COLORS.primary_red }} />
          )}
        </button>

        {/* Enrolled Tag */}
        {course.enrolled && (
          <div className="absolute bottom-3 right-3 px-2 py-1 rounded-md"
            style={{ background: COLORS.secondary_green, color: COLORS.primary_white }} >
            Enrolled
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5 text-left">
        {/* Category & Type */}
        <div onClick={() => { handleOpen(course?._id) }} className="flex items-center justify-between mb-3">
          <span className="text-white text-xs font-semibold px-2 py-1 rounded-md" style={{ background: COLORS.primary_red }}>
            {course?.category?.primary}
          </span>
          <span className="border border-[#ED1C24] text-xs font-semibold px-2 py-1 rounded-md" style={{ color: COLORS.primary_red }}>
            {course?.level}
          </span>
        </div>

        {/* Title */}
        <h3 onClick={() => { handleOpen(course?._id) }} className="leading-snug mb-2" style={{ color: COLORS.primary_black, ...(FONTS.boldHeadingg2 as any) }}>
          {course.title}
        </h3>

        {/* Description */}
        <p onClick={() => { handleOpen(course?._id) }} className=" text-sm mb-2 leading-snug" style={{ color: COLORS.primary_gray }}>
          {course?.description}
        </p>

        {/* Institute */}
        <p onClick={() => { handleOpen(course?._id) }} className="text-sm font-semibold  mb-3" style={{ color: COLORS.primary_gray }}>
          {course?.institute}
        </p>

        {/* Ratings, Students, Duration */}
        {course?.reviews?.length ? course?.reviews?.map((review, index) => (
          <div onClick={() => { handleOpen(course?._id) }} className="flex items-center text-sm  mb-4" style={{ color: COLORS.primary_gray }} key={index}>
            <div className="flex gap-3 items-center mr-4">
              <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
              <span className="font-semibold text-black">{review.rating}</span>
              <span className="ml-1 " style={{ color: COLORS.primary_gray }}>({review.comment})</span>
            </div>
            <div className="flex items-center mr-4">
              <Users className="w-4 h-4  mr-1" style={{ color: COLORS.primary_gray }} />
              <span>{review.name}</span>
            </div>
            <div className="flex items-center">
              <Clock
                className="w-4 h-4 mr-1"
                style={{ color: COLORS.primary_gray }}
              />
              <span>
                {new Date(review.createdAt).toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}
              </span>
            </div>
          </div>
        )) : null}

        {/* Price */}
        <div onClick={() => { handleOpen(course?._id) }} className="flex items-end justify-between mb-3">
          <div className="flex">
            <p className="text-2xl font-bold text-black">
              ₹{course?.pricing?.price}
            </p>
            <p className=" mt-1 ml-3 line-through" style={{ color: COLORS.primary_gray }}>
              ₹{oldPrice}
            </p>
          </div>
        </div>

        {/* Button */}
        {course?.enrolled ? (
          <button className=" text-white text-sm font-semibold px-4 py-3 rounded-lg w-full flex items-center justify-center gap-2 hover:bg-red-700 transition" style={{ background: COLORS.primary_red }}>

            Already Enrolled
            <img src={enroll} alt="" className="font-bold ml-1 h-5" />
          </button>
        ) : (
          <button className=" text-black text-sm cursor-pointer font-semibold px-4 py-3 rounded-lg w-full flex items-center justify-center gap-2 hover:bg-[#FFD400] transition" style={{ background: COLORS.primary_yellow }} onClick={() => handelSlectedCourse(course?._id)}>
            <ShoppingCart className="w-4 h-4" />
            Add To Cart
          </button>
        )}
      </div>

      <BatchModal
              isOpen={SelectedCourse !== null}
              onClose={handelcloseModel}
              course={SelectedCourse}
              gotoCart={() => navigate("/cart")}
            />

      {showLogin && (
  <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
    <div
      className="w-full md:w-1/4 rounded-lg shadow-md p-6 md:p-8 flex flex-col justify-between"
      style={{
        backgroundColor: COLORS.primary_white,
        minHeight: "420px",
      }}
    >
      <div>
        <div className='flex justify-between'>
        <h2
          style={{
            ...(FONTS.boldHeading as any),
            fontSize: "20px",
            color: COLORS.primary_black,
            marginBottom: "0.5rem",
          }}
        >
          Join now
        </h2>
          <p className='cursor-pointer'
          onClick={() => setShowlogin(false)}
          style={{
            ...(FONTS.boldHeading as any),
            fontSize: "20px",
            color: COLORS.primary_red,
            marginBottom: "0.5rem",
          }}><X className='w-6 h-6 text-black hover:text-[#ED1C24]' /></p>
          </div>
        <p
          style={{
            ...(FONTS.regular as any),
            color: COLORS.primary_gray,
            marginBottom: "1.5rem",
            fontSize: "14px",
          }}
        >
          Choose your preferred method to sign in to your account
        </p>

        <div className="flex mb-6">
          <button
            onClick={() => {
              setMethod("otp");
              setOtpStep("enter-phone");
            }}
            className="flex-1 py-2 rounded-r-md font-semibold text-sm transition-all cursor-pointer"
            style={{
              backgroundColor:
                method === "otp"
                  ? COLORS.primary_red
                  : COLORS.primary_white,
              color:
                method === "otp"
                  ? COLORS.primary_white
                  : COLORS.primary_red,
              border: `1px solid ${COLORS.primary_red}`,
            }}
          >
            <Phone className="inline mr-2 w-4 h-4 cursor-pointer" />
            Sign Up / Sign In
          </button>
        </div>

        <div className="flex flex-col items-center transition-all duration-300 w-full">
          {method === "password" && (
            <SignInPassword />
          )}

          {method === "otp" && otpStep === "enter-phone" && (
            <SendOTP
              goToOtp={handleSendOTP}
              phoneNumber={phoneNumber}
              setPhoneNumber={setPhoneNumber}
            />
          )}
  
          {method === "otp" && otpStep === "enter-otp" && (
            <OTPVerification goBack={() => setOtpStep("enter-phone")} />
          )}
        </div>
      </div>

      <p
        className="text-center mt-4 text-sm"
        style={{ color: COLORS.primary_gray }}
      >
        Don’t have an account?{" "}
        <button
        className='cursor-pointer'
          onClick={() => setMethod("otp")}
          style={{
            color: COLORS.primary_red,
            fontWeight: 600,
            cursor: "pointer",
            background: "none",
            border: "none",
            padding: 0,
            fontSize: "inherit",
          }}
        >
          Sign up now
        </button>
      </p>
    </div>
  </div>
)}
    </div>
  );
};

export default CourseCard;
