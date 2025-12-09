/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { Star, Users, Clock, Globe, CheckCircle, MapPin, Mail, Phone, Award, X } from 'lucide-react';
import { COLORS, FONTS } from '../../Constants/uiconstants';
import { useNavigate, useParams } from 'react-router-dom';
import { getCoursebyidThunk } from '../../features/home_page/reducers/homeThunk';
import type { AppDispatch } from '../../store/store';
import { useDispatch, useSelector } from 'react-redux';
import { selectCoursebyid } from '../../features/home_page/reducers/homeSelector';
import { FaArrowLeft } from 'react-icons/fa';
// import { AddtoCartService } from '../../features/cart/services';
import { toast } from 'react-toastify';
import { BatchModal } from './batchs/SelectBatchCard';
import { getBatchBycourseId } from '../../features/courses/service';
import SignInPassword from '../Authentication/SignInPassword';
import SendOTP from '../Authentication/SendOTP';
import { sendOTPThunk } from '../../features/userlogin/reducers/otpthunks';
import type { OTPResponse } from '../../features/userlogin/types/otptypes';
import { otpVerify } from "../../features/userlogin/reducers/service";
import { useAuth } from "../../context/context";
import { GetLocalstorage, RemoveLocalstorage } from "../../utils/helper";

export interface CourseData {
  _id?: string;
  title: string;
  shortDescription: string;
  duration: number;
  price: number;
  language: string;
  level: string;
  batches: string;
  image: string;
  thumbnail: string;
  status: string;
  is_active: boolean;
  reviews: any[];
  learningOutcomes: string[];
  requirements: string[];
  targetAudience: string[];
  content: {
    totalDuration: number;
    modules: any[];
  };
  pricing: {
    type: string;
    currency: string;
    price: number;
  };
}


interface OTPVerificationProps {
  goBack: () => void;
}



const Courseview: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'curriculum' | 'reviews'>('overview');
  const dispatch = useDispatch<AppDispatch>();
  const coursebyid: CourseData = useSelector(selectCoursebyid);
  const [SelectedCourse, setSelectedCourse] = useState<any>(null);
  const [showLogin, setShowlogin] = useState(false)
  const [method, setMethod] = useState<"password" | "otp">("otp");
  const [otpStep, setOtpStep] = useState<"enter-phone" | "enter-otp">(
    "enter-phone"
  );
  const [phoneNumber, setPhoneNumber] = useState("");

  const { id } = useParams();

  const handleSendOTP = async (): Promise<void> => {
    if (!phoneNumber) {
      toast.error("Phone number is required");
      return;
    }

    const resultAction = await dispatch(sendOTPThunk({ phoneNumber })) as any;

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


  useEffect(() => {
    const fetchCourseById = async () => {
      try {
        const response = await dispatch(getCoursebyidThunk(id ? id : ''));
        return response;
      } catch (error) {
        console.error("Error fetching course:", error);
        return null;
      }
    };
    if (id) {
      fetchCourseById();
    }
  }, [dispatch, id]);

  // async function handelAddtoCart(id: string) {
  //   const response = await AddtoCartService(id)
  //   if (response?.success) {
  //     toast.success("course added your cart")
  //   } else {
  //     toast.warn("try again, something error.")
  //   }
  // }

  const OTPVerification: React.FC<OTPVerificationProps> = ({ goBack }) => {

    const [otpValues, setOtpValues] = useState<string[]>(Array(6).fill(""));
    const { login } = useAuth()

    const storedOtp = GetLocalstorage("generatedOtp");
    const token = GetLocalstorage("token")?.toString()

    const handleChange = (index: number, value: string) => {
      if (!/^\d*$/.test(value)) return;
      const newOtp = [...otpValues];
      newOtp[index] = value;
      setOtpValues(newOtp);

      if (value && index < 5) {
        const nextInput = document.getElementById(`otp-${index + 1}`);
        nextInput?.focus();
      }
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Backspace" && !otpValues[index] && index > 0) {
        const prevInput = document.getElementById(`otp-${index - 1}`);
        prevInput?.focus();
      }
    };

    const handleVerify = async () => {
      const enteredOtp = otpValues.join("");

      if (enteredOtp.length < 6) {
        toast.error("Please enter the complete 6-digit OTP.");
        return;
      }

      if (!storedOtp) {
        toast.error("OTP expired or missing. Please resend.");
        goBack();
        return;
      }

      const response = await otpVerify(token, enteredOtp)

      if (response?.status) {
        const token = response?.data?.token || ""
        login(token)
        if (!response?.reg) {
          setShowlogin(false)
        } else {
          setShowlogin(false)
        }
        RemoveLocalstorage("generatedOtp")
        RemoveLocalstorage("token")
      } else {
        console.log(response)
      }
    };

    return (
      <div className="w-full">
        <label
          style={{
            ...FONTS.medium,
            fontSize: "14px",
            color: COLORS.C_DIV_Title,
          } as any}
        >
          Enter OTP
        </label>
        <p
          style={{
            ...FONTS.regular,
            fontSize: "14px",
            color: COLORS.C_DIV_Title,
          } as any}
        >
          OTP for Demo {typeof storedOtp === 'string' ? storedOtp : String(storedOtp || '')}
        </p>

        <div className="flex flex-wrap justify-center gap-4 my-3 w-full mx-auto">
          {otpValues.map((val, i) => (
            <input
              key={i}
              id={`otp-${i}`}
              type="text"
              maxLength={1}
              value={val}
              onChange={(e) => handleChange(i, e.target.value)}
              onKeyDown={(e) => handleKeyDown(i, e)}
              className="flex-1 min-w-1 max-w-8 h-9 border rounded-md text-center text-base sm:text-lg outline-none"
              style={{ borderColor: COLORS.primary_gray }}
            />
          ))}
        </div>

        <button
          className="w-full py-2 rounded-md font-semibold text-sm mb-3 border cursor-pointer"
          style={{
            borderColor: COLORS.primary_gray,
            color: COLORS.primary_black,
            backgroundColor: COLORS.primary_white,
          }}
          onClick={goBack}
        >
          Change Number
        </button>

        <button
          onClick={handleVerify}
          className="w-full py-2 rounded-md font-semibold text-sm cursor-pointer"
          style={{ backgroundColor: COLORS.primary_red, color: COLORS.primary_white }}
        >
          Verify & Sign In
        </button>
      </div>
    );
  };

  // Sample course data based on your structure
  const courseData: CourseData = {
    title: "full stack",
    shortDescription: "mern",
    duration: 3540,
    price: 0,
    language: "English",
    level: "beginner",
    batches: "2",
    image: "",
    thumbnail: "",
    status: "Inactive",
    is_active: true,
    reviews: [],
    learningOutcomes: [],
    requirements: [],
    targetAudience: [],
    content: {
      totalDuration: 3540,
      modules: []
    },
    pricing: {
      type: "paid",
      currency: "INR",
      price: 0
    }
  };

  const navigate = useNavigate()

  const formatDuration = (seconds: number): string => {
    const weeks = Math.floor(seconds / (60 * 60 * 24 * 7));
    return `${weeks} weeks`;
  };

  // const calculateDiscount = (original: number, current: number): number => {
  //   return Math.round(((original - current) / original) * 100);
  // };


  const handelSlectedCourse = async (courseId: string) => {
    try {

      const { data } = await getBatchBycourseId(courseId)

      console.log(data, "add to")

      if (data.length == 0) {
        return toast.warn("there is no batch available")
      }

      setSelectedCourse(data)
    } catch (error) {
      console.error(error)
      setShowlogin(true);
    }

  }

  const handelcloseModel = () => {
    setSelectedCourse(null)
  }


  return (
    <div style={{ backgroundColor: COLORS.primary_yellow }} className="min-h-screen ">
      {/* Header */}
      <header className="bg-[#ED1C24]/90 backdrop-blur-sm ">
        <div className="mx-auto px-4 py-4 flex items-center gap-4">
          <button style={{ ...FONTS.nummedium4 as any }} onClick={() => navigate(-1)} className="flex cursor-pointer items-center gap-1 bg-white p-1.5 rounded-xl text-[#ED1C24] hover:text-black transition">
            <FaArrowLeft />
            <span>Back to Courses</span>
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <div className="mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="space-y-4">
              {/* Badges */}
              <div className="flex gap-2">
                <span style={{ ...FONTS.nummedium4 as any }} className="px-3 py-1 bg-white text-[#ED1C24] border border-[#ED1C24] text-xs rounded-full">
                  Best Seller
                </span>
                <span style={{ ...FONTS.nummedium4 as any }} className="px-3 py-1 bg-white text-[#ED1C24] border border-[#ED1C24] text-xs rounded-full">
                  Marketing
                </span>
              </div>

              {/* Title */}
              <h1 style={{ color: COLORS.primary_red, ...FONTS.boldHeading as any }} className="text-4xl font-bold ">
                {coursebyid?.title}
              </h1>

              {/* Description */}
              <p style={{ ...FONTS.nummedium4 as any, color: COLORS.primary_gray }}>
                {coursebyid?.shortDescription}
              </p>

              {/* Meta Info */}
              <div className="flex flex-wrap items-center gap-6 text-sm">
                <div style={{ color: COLORS.primary_red }} className="flex items-center gap-2">
                  <Star className="w-5 h-5 fill-current" />
                  <span style={{ color: COLORS.primary_black, ...FONTS.nummedium4 as any }}>4.6</span>
                  <span style={{ color: COLORS.primary_black, ...FONTS.nummedium4 as any }}>(1 reviews)</span>
                </div>
                <div style={{ color: COLORS.primary_black, ...FONTS.nummedium4 as any }} className="flex items-center gap-2 ">
                  <Users className="w-5 h-5" />
                  <span>500 students</span>
                </div>
                <div style={{ color: COLORS.primary_black, ...FONTS.nummedium4 as any }} className="flex items-center gap-2 ">
                  <Clock className="w-5 h-5" />
                  <span>{formatDuration(courseData.content.totalDuration)}</span>
                </div>
                <div style={{ color: COLORS.primary_black, ...FONTS.nummedium4 as any }} className="flex items-center gap-2 ">
                  <Globe className="w-5 h-5" />
                  <span>{coursebyid?.language}</span>
                </div>

                <div className="mt-12">
                  <div style={{ color: COLORS.primary_red, ...FONTS.boldHeading4 as any }}>
                    <div className="flex gap-8 ">
                      <button
                        onClick={() => setActiveTab('overview')}
                        className={`pb-4 px-2 font-medium transition cursor-pointer ${activeTab === 'overview'
                          ? 'text-[#ED1C24] border-b-2 border-[#ED1C24]'
                          : 'text-[#000000] hover:text-[#ED1C24]'
                          }`}
                      >
                        Overview
                      </button>
                      <button
                        onClick={() => setActiveTab('curriculum')}
                        className={`pb-4 px-2 font-medium transition cursor-pointer ${activeTab === 'curriculum'
                          ? 'text-[#ED1C24] border-b-2 border-[#ED1C24]'
                          : 'text-[#000000] hover:text-[#ED1C24]'
                          }`}
                      >
                        Curriculum
                      </button>
                      <button
                        onClick={() => setActiveTab('reviews')}
                        className={`pb-4 px-2 font-medium transition cursor-pointer ${activeTab === 'reviews'
                          ? 'text-[#ED1C24] border-b-2 border-[#ED1C24]'
                          : 'text-[#000000] hover:text-[#ED1C24]'
                          }`}
                      >
                        Reviews
                      </button>
                    </div>
                  </div>

                  {/* Tab Content */}
                  <div className="mt-8 grid lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                      {activeTab === 'overview' && (
                        <div className="bg-white border border-[#ED1C24] rounded-lg p-8 space-y-6">
                          <div>
                            <h2 style={{ ...FONTS.S_Cart_subtitle, color: COLORS.primary_red }} className="mb-4">Course Overview</h2>
                            <p style={{ ...FONTS.nummedium4 as any, color: COLORS.primary_black }}>
                              This comprehensive course will transform you into a digital marketing expert. You'll learn everything from SEO fundamentals to advanced social media strategies, email marketing campaigns, and data analytics.
                            </p>
                          </div>
                        </div>
                      )}

                      {activeTab === 'curriculum' && (
                        <div className="bg-white border border-[#ED1C24] rounded-lg p-8 space-y-6">
                          <h2 style={{ ...FONTS.S_Cart_subtitle, color: COLORS.primary_red }} className="mb-6" >Course Curriculum</h2>
                          <p style={{ ...FONTS.nummedium4 as any, color: COLORS.primary_black }} className="mb-6">
                            Detailed curriculum will be available after enrollment. This {formatDuration(courseData.content.totalDuration)} course covers comprehensive topics in Digital Marketing.
                          </p>

                          <div className="space-y-4">
                            <div className="border border-[#ED1C24] rounded-lg p-4">
                              <h3 style={{ ...FONTS.nummedium11 as any, color: COLORS.primary_red }}>Module 1: Introduction</h3>
                              <p style={{ ...FONTS.nummedium4 as any, color: COLORS.primary_black }}>Get started with the fundamentals and course overview</p>
                            </div>
                            <div className="border border-[#ED1C24] rounded-lg p-4">
                              <h3 style={{ ...FONTS.nummedium11 as any, color: COLORS.primary_red }}>Module 2: Core Concepts</h3>
                              <p style={{ ...FONTS.nummedium4 as any, color: COLORS.primary_black }}>Deep dive into essential concepts and practices</p>
                            </div>
                            <div className="border border-[#ED1C24] rounded-lg p-4">
                              <h3 style={{ ...FONTS.nummedium11 as any, color: COLORS.primary_red }}>Module 3: Advanced Topics</h3>
                              <p style={{ ...FONTS.nummedium4 as any, color: COLORS.primary_black }}>Master advanced techniques and real-world applications</p>
                            </div>
                            <div className="border border-[#ED1C24] rounded-lg p-4">
                              <h3 style={{ ...FONTS.nummedium11 as any, color: COLORS.primary_red }}>Final Project</h3>
                              <p style={{ ...FONTS.nummedium4 as any, color: COLORS.primary_black }}>Apply your knowledge in a comprehensive capstone project</p>
                            </div>
                          </div>
                        </div>
                      )}

                      {activeTab === 'reviews' && (
                        <div className="border border-[#ED1C24] bg-white rounded-2xl p-6 sm:p-8 shadow-sm">
                          {/* Title */}
                          <h2
                            style={{ ...FONTS.S_Cart_subtitle, color: COLORS.primary_red }}
                            className="mb-6 text-xl sm:text-2xl"
                          >
                            Student Reviews
                          </h2>

                          {/* Mapping Reviews */}
                          {coursebyid?.reviews?.length > 0 ? (
                            <div className="space-y-5">
                              {coursebyid?.reviews?.map((review, index) => (
                                <div
                                  key={index}
                                  className="border border-gray-200 rounded-xl p-4 sm:p-5 hover:shadow-md transition-all duration-200 bg-gray-50"
                                >
                                  {/* Name */}
                                  <p
                                    className="text-[15px] sm:text-base mb-1"
                                    style={{ color: COLORS.primary_black, ...FONTS.nummedium4 as any }}
                                  >
                                    {review?.name || "No Username"}
                                  </p>

                                  {/* Rating */}
                                  <p className="text-yellow-500 font-semibold mb-2 text-sm sm:text-base">
                                    ⭐ Rating: {review?.rating || "0"}
                                  </p>

                                  {/* Comment */}
                                  <p
                                    className="text-sm sm:text-[15px] leading-relaxed"
                                    style={{ color: COLORS.primary_black, ...FONTS.nummedium4 as any }}
                                  >
                                    {review?.comment || "No comments"}
                                  </p>

                                  {/* Date */}
                                  <p
                                    className="text-xs sm:text-sm mt-3"
                                    style={{ color: COLORS.primary_black, ...FONTS.nummedium4 as any }}
                                  >
                                    {review?.createdAt || "No date available"}
                                  </p>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <div className="py-6 text-center">
                              <p style={{ color: COLORS.primary_black, ...FONTS.nummedium4 as any }}>
                                No reviews yet. Be the first to review this course!
                              </p>
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Institute Info Sidebar */}
                    <div className="lg:col-span-1">
                      <div className="bg-white rounded-lg p-6 space-y-6">
                        <img
                          src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=200&fit=crop"
                          alt="Institute"
                          className="w-full h-32 object-cover rounded-lg"
                        />

                        <div>
                          <h3 style={{ ...FONTS.S_Cart_subtitle, color: COLORS.primary_black }} className="mb-2">About the Institute</h3>
                          <p style={{ ...FONTS.nummedium5 as any, color: COLORS.primary_black }} className="mb-4">Business Experience Academy</p>
                          <p style={{ ...FONTS.nummedium5 as any, color: COLORS.primary_black }} >
                            Providing premium online and marketing education
                          </p>
                        </div>

                        <div className="flex items-center gap-2 text-slate-700">
                          <Award className="w-5 h-5 text-yellow-500" />
                          <span style={{ ...FONTS.nummedium5 as any, color: COLORS.primary_black }}>4.6 Institute Rating</span>
                        </div>

                        <div className=" pt-4 border-t border-slate-200 space-y-3 ">
                          <div style={{ ...FONTS.nummedium6 as any, color: COLORS.primary_black }} className="flex items-center gap-2" >
                            <MapPin className="w-3 h-3 " />
                            <span>Boston, MA, USA</span>
                          </div>
                          <div style={{ ...FONTS.nummedium6 as any, color: COLORS.primary_black }} className="flex items-center gap-2" >
                            <Mail className="w-3 h-3 " />
                            <a href="mailto:hello@businessacademy.com" className="hover:text-blue-600">
                              hello@businessacademy.com
                            </a>
                          </div>
                          <div style={{ ...FONTS.nummedium6 as any, color: COLORS.primary_black }} className="flex items-center gap-2" >
                            <Phone className="w-3 h-3 " />
                            <span>+1-555-876-5432</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-2xl overflow-hidden sticky top-4">
              {/* Course Image */}
              <div className="aspect-video bg-linear-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                <img
                  src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=450&fit=crop"
                  alt="Course preview"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Pricing */}
              <div className="p-6 space-y-4">
                <div className="flex items-baseline gap-3">
                  <span style={{ color: COLORS.primary_black, ...FONTS.boldHeading as any }}> ₹{coursebyid?.pricing?.price}</span>
                  <span style={{ color: COLORS.primary_black, ...FONTS.boldHeading4 as any }} className=" line-through">₹599</span>
                  <span style={{ backgroundColor: COLORS.primary_red, color: COLORS.primary_white }} className="px-2 py-1 text-xs font-semibold rounded">
                    25% OFF
                  </span>
                </div>

                <button onClick={() => handelSlectedCourse(coursebyid?._id || "")} style={{ ...FONTS.nummedium4 as any, color: COLORS.primary_white, backgroundColor: COLORS.primary_black }} className="w-full py-3 rounded-lg hover:bg-slate-800 transition cursor-pointer">
                  Add to Cart
                </button>

                {/* What's Included */}
                <div className="pt-4 border-t border-black">
                  <h3 style={{ ...FONTS.SHOPPING_CART_Title as any, color: COLORS.primary_black }} className="mb-3">This course includes:</h3>
                  <ul style={{ ...FONTS.regularr as any, color: COLORS.primary_black }} className="space-y-2 ">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span>Live sessions</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span>Case studies</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span>Marketing tools access</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span>Certificate</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
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

export default Courseview;