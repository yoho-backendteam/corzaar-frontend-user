"use client";

import { useState, useEffect } from "react";
import { X, Plus, Minus } from "lucide-react";
import { COLORS, FONTS } from "../../Constants/uiconstants";

interface CourseFormData {
  _id: string;
  title: string;
  description: string;
  shortDescription: string;
  thumbnail: string;
  previewVideo: string;
  category: {
    primary: string;
    secondary: string[];
    tags: string[];
  };
  pricing: {
    planType: string;
    price: number;
    currency: string;
    discountPrice: number;
    discountValidUntil: string;
  };
  content: {
    totalDuration: number;
    totalLessons: number;
    totalQuizzes: number;
    totalAssignments: number;
    modules: Array<{
      title: string;
      description: string;
      order: number;
      lessons: Array<{
        title: string;
        type: string;
        duration: number;
        content: {
          videoUrl?: string;
          assignmentData?: {
            description: string;
          };
        };
        order: number;
        isPreview: boolean;
      }>;
    }>;
  };
  requirements: string[];
  learningOutcomes: string[];
  targetAudience: string[];
  language: string;
  level: string;
  status: string;
}

interface EditPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onUpdateCourse: (courseData: CourseFormData) => void;
  courseData: CourseFormData | null;
}

export default function EditPopup({ isOpen, onClose, onUpdateCourse, courseData }: EditPopupProps) {
  const initialState: CourseFormData = {
    _id: "",
    title: "",
    description: "",
    shortDescription: "",
    thumbnail: "",
    previewVideo: "",
    category: { primary: "", secondary: [], tags: [] },
    pricing: { planType: "paid", price: 0, currency: "INR", discountPrice: 0, discountValidUntil: "" },
    content: { totalDuration: 0, totalLessons: 0, totalQuizzes: 0, totalAssignments: 0, modules: [] },
    requirements: [""],
    learningOutcomes: [""],
    targetAudience: [""],
    language: "English",
    level: "beginner",
    status: "draft",
  };

  const [formData, setFormData] = useState<CourseFormData>(initialState);
  const [currentTag, setCurrentTag] = useState("");
  const [currentSecondary, setCurrentSecondary] = useState("");

  useEffect(() => {
    if (courseData) {
      setFormData({
        ...courseData,
        requirements: courseData.requirements.length > 0 ? courseData.requirements : [""],
        learningOutcomes: courseData.learningOutcomes.length > 0 ? courseData.learningOutcomes : [""],
        targetAudience: courseData.targetAudience.length > 0 ? courseData.targetAudience : [""],
        category: {
          ...courseData.category,
          secondary: courseData.category.secondary || [],
          tags: courseData.category.tags || []
        }
      });
    }
  }, [courseData]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    if (name.startsWith("pricing.")) {
      const key = name.split(".")[1];
      setFormData(prev => ({
        ...prev,
        pricing: { ...prev.pricing, [key]: key.includes("price") ? parseFloat(value) || 0 : value }
      }));
    } else if (name.startsWith("category.")) {
      const key = name.split(".")[1];
      setFormData(prev => ({
        ...prev,
        category: { ...prev.category, [key]: value }
      }));
    } else if (name.startsWith("content.")) {
      const key = name.split(".")[1];
      setFormData(prev => ({
        ...prev,
        content: { ...prev.content, [key]: parseFloat(value) || 0 }
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleArrayInputChange = (field: "requirements" | "learningOutcomes" | "targetAudience", index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].map((item, i) => (i === index ? value : item))
    }));
  };

  const addArrayItem = (field: "requirements" | "learningOutcomes" | "targetAudience") => {
    setFormData(prev => ({ ...prev, [field]: [...prev[field], ""] }));
  };

  const removeArrayItem = (field: "requirements" | "learningOutcomes" | "targetAudience", index: number) => {
    setFormData(prev => ({ ...prev, [field]: prev[field].filter((_, i) => i !== index) }));
  };

  const addTag = () => {
    if (currentTag.trim() && !formData.category.tags.includes(currentTag.trim())) {
      setFormData(prev => ({ ...prev, category: { ...prev.category, tags: [...prev.category.tags, currentTag.trim()] } }));
      setCurrentTag("");
    }
  };

  const removeTag = (tag: string) => {
    setFormData(prev => ({ ...prev, category: { ...prev.category, tags: prev.category.tags.filter(t => t !== tag) } }));
  };

  const addSecondary = () => {
    if (currentSecondary.trim() && !formData.category.secondary.includes(currentSecondary.trim())) {
      setFormData(prev => ({ ...prev, category: { ...prev.category, secondary: [...prev.category.secondary, currentSecondary.trim()] } }));
      setCurrentSecondary("");
    }
  };

  const removeSecondary = (sec: string) => {
    setFormData(prev => ({ ...prev, category: { ...prev.category, secondary: prev.category.secondary.filter(s => s !== sec) } }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title.trim() || !formData.description.trim() || !formData.category.primary) {
      alert("Please fill in all required fields");
      return;
    }

    const filteredData: CourseFormData = {
      ...formData,
      requirements: formData.requirements.filter(r => r.trim() !== ""),
      learningOutcomes: formData.learningOutcomes.filter(r => r.trim() !== ""),
      targetAudience: formData.targetAudience.filter(r => r.trim() !== "")
    };

    onUpdateCourse(filteredData);
    handleClose();
  };

  const handleClose = () => {
    setFormData(initialState);
    setCurrentTag("");
    setCurrentSecondary("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div 
        className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        style={{
          boxShadow: "0px 10px 40px rgba(0,0,0,0.2)",
        }}
      >
        <form onSubmit={handleSubmit}>
          {/* Header */}
          <div className="flex justify-between items-center p-6 border-b border-gray-200 sticky top-0 bg-white z-10">
            <h2 
              className="text-xl font-semibold"
              style={{
                color: COLORS.primary_black,
                fontFamily: FONTS.boldHeading.fontFamily,
              }}
            >
              Edit Course
            </h2>
            <button
              type="button"
              onClick={handleClose}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6">
            {/* Basic Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold" style={{ color: COLORS.primary_black, fontFamily: FONTS.medium.fontFamily }}>
                Basic Information
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: COLORS.primary_black, fontFamily: FONTS.medium.fontFamily }}>
                    Course Title *
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="Enter course title"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    style={{ fontFamily: FONTS.regular.fontFamily }}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: COLORS.primary_black, fontFamily: FONTS.medium.fontFamily }}>
                    Short Description *
                  </label>
                  <input
                    type="text"
                    name="shortDescription"
                    value={formData.shortDescription}
                    onChange={handleInputChange}
                    placeholder="Enter short description"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    style={{ fontFamily: FONTS.regular.fontFamily }}
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: COLORS.primary_black, fontFamily: FONTS.medium.fontFamily }}>
                  Full Description *
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Enter detailed course description"
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  style={{ fontFamily: FONTS.regular.fontFamily }}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: COLORS.primary_black, fontFamily: FONTS.medium.fontFamily }}>
                    Thumbnail URL
                  </label>
                  <input
                    type="url"
                    name="thumbnail"
                    value={formData.thumbnail}
                    onChange={handleInputChange}
                    placeholder="https://example.com/image.jpg"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    style={{ fontFamily: FONTS.regular.fontFamily }}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: COLORS.primary_black, fontFamily: FONTS.medium.fontFamily }}>
                    Preview Video URL
                  </label>
                  <input
                    type="url"
                    name="previewVideo"
                    value={formData.previewVideo}
                    onChange={handleInputChange}
                    placeholder="https://example.com/video.mp4"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    style={{ fontFamily: FONTS.regular.fontFamily }}
                  />
                </div>
              </div>
            </div>

            {/* Category Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold" style={{ color: COLORS.primary_black, fontFamily: FONTS.medium.fontFamily }}>
                Category Information
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: COLORS.primary_black, fontFamily: FONTS.medium.fontFamily }}>
                    Primary Category *
                  </label>
                  <select 
                    name="category.primary"
                    value={formData.category.primary}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    style={{ fontFamily: FONTS.regular.fontFamily }}
                    required
                  >
                    <option value="">Select primary category</option>
                    <option value="Programming">Programming</option>
                    <option value="Design">Design</option>
                    <option value="Business">Business</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Science">Science</option>
                    <option value="Mathematics">Mathematics</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: COLORS.primary_black, fontFamily: FONTS.medium.fontFamily }}>
                    Level *
                  </label>
                  <select 
                    name="level"
                    value={formData.level}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    style={{ fontFamily: FONTS.regular.fontFamily }}
                    required
                  >
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: COLORS.primary_black, fontFamily: FONTS.medium.fontFamily }}>
                  Secondary Categories
                </label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={currentSecondary}
                    onChange={(e) => setCurrentSecondary(e.target.value)}
                    placeholder="Add secondary category"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    style={{ fontFamily: FONTS.regular.fontFamily }}
                  />
                  <button
                    type="button"
                    onClick={addSecondary}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                  >
                    <Plus size={16} />
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.category.secondary.map((sec, index) => (
                    <span key={index} className="flex items-center gap-1 px-3 py-1 bg-gray-100 rounded-full text-sm">
                      {sec}
                      <button type="button" onClick={() => removeSecondary(sec)} className="text-red-500 hover:text-red-700">
                        <X size={14} />
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: COLORS.primary_black, fontFamily: FONTS.medium.fontFamily }}>
                  Tags
                </label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={currentTag}
                    onChange={(e) => setCurrentTag(e.target.value)}
                    placeholder="Add tag"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    style={{ fontFamily: FONTS.regular.fontFamily }}
                  />
                  <button
                    type="button"
                    onClick={addTag}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                  >
                    <Plus size={16} />
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.category.tags.map((tag, index) => (
                    <span key={index} className="flex items-center gap-1 px-3 py-1 bg-gray-100 rounded-full text-sm">
                      {tag}
                      <button type="button" onClick={() => removeTag(tag)} className="text-red-500 hover:text-red-700">
                        <X size={14} />
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Pricing Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold" style={{ color: COLORS.primary_black, fontFamily: FONTS.medium.fontFamily }}>
                Pricing Information
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: COLORS.primary_black, fontFamily: FONTS.medium.fontFamily }}>
                    Plan Type
                  </label>
                  <select 
                    name="pricing.planType"
                    value={formData.pricing.planType}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    style={{ fontFamily: FONTS.regular.fontFamily }}
                  >
                    <option value="free">Free</option>
                    <option value="paid">Paid</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: COLORS.primary_black, fontFamily: FONTS.medium.fontFamily }}>
                    Currency
                  </label>
                  <select 
                    name="pricing.currency"
                    value={formData.pricing.currency}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    style={{ fontFamily: FONTS.regular.fontFamily }}
                  >
                    <option value="INR">INR</option>
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: COLORS.primary_black, fontFamily: FONTS.medium.fontFamily }}>
                    Price *
                  </label>
                  <input
                    type="number"
                    name="pricing.price"
                    value={formData.pricing.price}
                    onChange={handleInputChange}
                    placeholder="0.00"
                    min="0"
                    step="0.01"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    style={{ fontFamily: FONTS.regular.fontFamily }}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: COLORS.primary_black, fontFamily: FONTS.medium.fontFamily }}>
                    Discount Price
                  </label>
                  <input
                    type="number"
                    name="pricing.discountPrice"
                    value={formData.pricing.discountPrice}
                    onChange={handleInputChange}
                    placeholder="0.00"
                    min="0"
                    step="0.01"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    style={{ fontFamily: FONTS.regular.fontFamily }}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: COLORS.primary_black, fontFamily: FONTS.medium.fontFamily }}>
                  Discount Valid Until
                </label>
                <input
                  type="datetime-local"
                  name="pricing.discountValidUntil"
                  value={formData.pricing.discountValidUntil}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  style={{ fontFamily: FONTS.regular.fontFamily }}
                />
              </div>
            </div>

            {/* Content Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold" style={{ color: COLORS.primary_black, fontFamily: FONTS.medium.fontFamily }}>
                Content Information
              </h3>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: COLORS.primary_black, fontFamily: FONTS.medium.fontFamily }}>
                    Total Duration (min)
                  </label>
                  <input
                    type="number"
                    name="content.totalDuration"
                    value={formData.content.totalDuration}
                    onChange={handleInputChange}
                    placeholder="0"
                    min="0"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    style={{ fontFamily: FONTS.regular.fontFamily }}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: COLORS.primary_black, fontFamily: FONTS.medium.fontFamily }}>
                    Total Lessons
                  </label>
                  <input
                    type="number"
                    name="content.totalLessons"
                    value={formData.content.totalLessons}
                    onChange={handleInputChange}
                    placeholder="0"
                    min="0"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    style={{ fontFamily: FONTS.regular.fontFamily }}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: COLORS.primary_black, fontFamily: FONTS.medium.fontFamily }}>
                    Total Quizzes
                  </label>
                  <input
                    type="number"
                    name="content.totalQuizzes"
                    value={formData.content.totalQuizzes}
                    onChange={handleInputChange}
                    placeholder="0"
                    min="0"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    style={{ fontFamily: FONTS.regular.fontFamily }}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: COLORS.primary_black, fontFamily: FONTS.medium.fontFamily }}>
                    Total Assignments
                  </label>
                  <input
                    type="number"
                    name="content.totalAssignments"
                    value={formData.content.totalAssignments}
                    onChange={handleInputChange}
                    placeholder="0"
                    min="0"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    style={{ fontFamily: FONTS.regular.fontFamily }}
                  />
                </div>
              </div>
            </div>

            {/* Arrays Section */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold" style={{ color: COLORS.primary_black, fontFamily: FONTS.medium.fontFamily }}>
                Additional Information
              </h3>

              {/* Requirements */}
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: COLORS.primary_black, fontFamily: FONTS.medium.fontFamily }}>
                  Requirements
                </label>
                {formData.requirements.map((requirement, index) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={requirement}
                      onChange={(e) => handleArrayInputChange('requirements', index, e.target.value)}
                      placeholder="Enter requirement"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      style={{ fontFamily: FONTS.regular.fontFamily }}
                    />
                    <button
                      type="button"
                      onClick={() => removeArrayItem('requirements', index)}
                      className="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                    >
                      <Minus size={16} />
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addArrayItem('requirements')}
                  className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                >
                  <Plus size={16} />
                  Add Requirement
                </button>
              </div>

              {/* Learning Outcomes */}
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: COLORS.primary_black, fontFamily: FONTS.medium.fontFamily }}>
                  Learning Outcomes
                </label>
                {formData.learningOutcomes.map((outcome, index) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={outcome}
                      onChange={(e) => handleArrayInputChange('learningOutcomes', index, e.target.value)}
                      placeholder="Enter learning outcome"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      style={{ fontFamily: FONTS.regular.fontFamily }}
                    />
                    <button
                      type="button"
                      onClick={() => removeArrayItem('learningOutcomes', index)}
                      className="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                    >
                      <Minus size={16} />
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addArrayItem('learningOutcomes')}
                  className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                >
                  <Plus size={16} />
                  Add Learning Outcome
                </button>
              </div>

              {/* Target Audience */}
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: COLORS.primary_black, fontFamily: FONTS.medium.fontFamily }}>
                  Target Audience
                </label>
                {formData.targetAudience.map((audience, index) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={audience}
                      onChange={(e) => handleArrayInputChange('targetAudience', index, e.target.value)}
                      placeholder="Enter target audience"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      style={{ fontFamily: FONTS.regular.fontFamily }}
                    />
                    <button
                      type="button"
                      onClick={() => removeArrayItem('targetAudience', index)}
                      className="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                    >
                      <Minus size={16} />
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addArrayItem('targetAudience')}
                  className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                >
                  <Plus size={16} />
                  Add Target Audience
                </button>
              </div>
            </div>

            {/* Language and Status */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: COLORS.primary_black, fontFamily: FONTS.medium.fontFamily }}>
                  Language
                </label>
                <select 
                  name="language"
                  value={formData.language}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  style={{ fontFamily: FONTS.regular.fontFamily }}
                >
                  <option value="English">English</option>
                  <option value="Hindi">Hindi</option>
                  <option value="Spanish">Spanish</option>
                  <option value="French">French</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: COLORS.primary_black, fontFamily: FONTS.medium.fontFamily }}>
                  Status
                </label>
                <select 
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  style={{ fontFamily: FONTS.regular.fontFamily }}
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                  <option value="archived">Archived</option>
                </select>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-3 p-6 border-t border-gray-200 sticky bottom-0 bg-white">
            <button
              type="button"
              onClick={handleClose}
              className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              style={{
                color: COLORS.primary_black,
                fontFamily: FONTS.medium.fontFamily,
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 rounded-lg text-white transition-colors hover:opacity-90"
              style={{
                backgroundColor: COLORS.primary_red,
                fontFamily: FONTS.medium.fontFamily,
              }}
            >
              Update Course
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}