import React, { useEffect, useState } from 'react';
import { Star, Users, Clock, Globe, CheckCircle, MapPin, Mail, Phone, Award } from 'lucide-react';
import { COLORS, FONTS } from '../../Constants/uiconstants';
import { useNavigate, useParams } from 'react-router-dom';
import { getCoursebyidThunk } from '../../features/home_page/reducers/homeThunk';
import type { AppDispatch } from '../../store/store';
import { useDispatch, useSelector } from 'react-redux';
import { selectCoursebyid } from '../../features/home_page/reducers/homeSelector';
import { FaArrowLeft } from 'react-icons/fa';
import { AddtoCartService } from '../../features/cart/services';
import { toast } from 'react-toastify';

export interface CourseData {
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

const Courseview: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'curriculum' | 'reviews'>('overview');
  const dispatch = useDispatch<AppDispatch>();
  const coursebyid: CourseData = useSelector(selectCoursebyid);

  const { id } = useParams();

  const fetchCourseById = async () => {
    try {
      const response = await dispatch(getCoursebyidThunk(id ? id : ''));
      return response;
    } catch (error) {
      console.error("Error fetching course:", error);
      return null;
    }
  };

  useEffect(() => {
    if (id) {
      fetchCourseById();
    }
  }, [dispatch]);

  async function handelAddtoCart(id: string) {
    const response = await AddtoCartService(id)
    if (response?.success) {
      toast.success("course added your cart")
    } else {
      toast.warn("try again, something error.")
    }
  }



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

  const calculateDiscount = (original: number, current: number): number => {
    return Math.round(((original - current) / original) * 100);
  };

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
                        <div className="border border-[#ED1C24] bg-white rounded-[16px] p-6 sm:p-8 shadow-sm">
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
              <div className="aspect-video bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
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

                <button onClick={() => handelAddtoCart(coursebyid?._id)} style={{ ...FONTS.nummedium4 as any, color: COLORS.primary_white, backgroundColor: COLORS.primary_black }} className="w-full py-3 rounded-lg hover:bg-slate-800 transition">
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
    </div>
  );
};

export default Courseview;