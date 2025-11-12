// Payment types
export type Payment = {
  remarks: string;
  transactionId: string;
  createdAt: string;
  paymentMethod: string;
  amount: string;
  status: string;
}

export interface PaymentResponse {
  success: boolean;
  message: string;
  data: Payment[];
}

// Profile Address types
export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: number;
  country: string;
}

export interface EmergencyContact {
  name: string;
  relationship: string;
  email: string;
}

export interface PreviousEducation {
  level: string;
  institution: string;
  board: string;
  yearOfPassing: number;
  percentage: number;
  subjects: string[];
  _id: string;
}

export interface Document {
  type: string;
  name: string;
  url: string;
  uploadedAt: string;
  _id: string;
}

export interface AcademicInfo {
  previousEducation: PreviousEducation[];
  currentGPA: number;
  totalCredits: number;
  completedCredits: number;
}

export interface PersonalInfo {
  address: {
    permanent: Address;
    current: Address;
  };
  emergencyContact: EmergencyContact;
  dateOfBirth: string;
  gender: string;
  bloodGroup: string;
  nationality: string;
  religion: string;
  category: string;
}

export interface ProfileData {
  _id: string;
  studentId: string;
  rollNumber: string;
  semester: number;
  admissionDate: string;
  status: string;
  documents: Document[];
  createdAt: string;
  updatedAt: string;
  __v: number;
  instituteId: string;
  studentName: string;
  uuid: string;
  personalInfo: PersonalInfo;
  academicInfo: AcademicInfo;
}

export interface ProfileResponse {
  success: boolean;
  data: ProfileData;
  message?: string;
}

// Activity types
export interface ActivityItem {
  action: string;
  actorRole: string;
  createdAt: string;
  description: string;
  updatedAt: string;
  userid: string;
  uuid: string;
  __v: number;
  _id: string;
}

export interface UIProfileState {
  email: string;
  role: string;
  skills: string[];
  interests: string[];
  attendance: Array<{
    label: string;
    progress: number;
    sessionsCompleted: number;
    totalSessions: number;
    date: string;
  }>;
  recentActivity: Array<{
    title: string;
    date: string;
  }>;
  projects: Array<{
    title: string;
    description: string;
    tags: string[];
    date: string;
  }>;
  achievements: Array<{
    title: string;
    organization: string;
    description: string;
    date: string;
  }>;
}

export interface ActivityResponse {
  success: boolean;
  Message: string;
  Data: ActivityItem[];
}

// Fav types
export interface FavItem {
  id: string;
  name: string;
  type: string;
  courseId: string;
  title: string;
  price: number;
  discountPrice?: number;
  merchantId: string;
}

export interface FavListData {
  items: FavItem[];
}

export interface FavResponse {
  success: boolean;
  message: string;
  data: FavListData;
}

// Portfolio types
export interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  createdAt: string;
}

export interface PortfolioResponse {
  success: boolean;
  message: string;
  data: PortfolioItem[];
}

// Attendance types
export interface AttendanceRecord {
  date: string;
  status: string;
}

export interface AttendanceItem {
  courseId: string;
  totalDays: number;
  totalPresent: number;
  attendance: AttendanceRecord[];
}

export interface AttendanceResponse {
  success: boolean;
  message: string;
  data: AttendanceItem[];
}

export interface CoursesIdResponse {
  success: boolean;
  message: string;
  data: CourseData[];
}

// Setting State
export interface SettingState {
  paymentData: PaymentResponse | null;
  favData: FavResponse | null;
  profileData: ProfileData | null;
  port: PortfolioResponse | null;
  setData: ProfileResponse | null;
  activityData: ActivityResponse | null;
  attendanceData: AttendanceResponse | null;
  coursesIdData: CoursesIdResponse | null;
}

// Favorite types based on your API response
export interface FavoriteItem {
  _id: string;
  courseId: string;
  title: string;
  price: number;
  discountPrice?: number;
  merchantId: string;
}

export interface FavoritesData {
  _id: string;
  userId: string;
  items: FavoriteItem[];
  isactive: boolean;
  isdeleted: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}


// Course types based on your API response
export interface CourseCategory {
  primary: string;
  secondary: string[];
  tags: string[];
}

export interface CoursePricing {
  type: string;
  price: number;
  currency: string;
}

export interface CourseContent {
  totalDuration: number;
  totalLessons: number;
  totalQuizzes: number;
  totalAssignments: number;
}

export interface CourseReview {
  userId: string;
  name: string;
  rating: number;
  comment: string;
  _id: string;
  createdAt: string;
}

export interface CourseData {
  _id: string;
  title: string;
  description: string;
  shortDescription: string;
  thumbnail: string;
  previewVideo: string;
  instituteId: string;
  instructorId: string;
  requirements: string[];
  learningOutcomes: string[];
  targetAudience: string[];
  language: string;
  level: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  category: CourseCategory;
  pricing: CoursePricing;
  content: CourseContent;
  reviews: CourseReview[];
  uuid: string;
  is_active: boolean;
}

export interface CourseResponse {
  message: string;
  data: CourseData;
}

// Combined favorite item interface
export interface CombinedFavoriteItem {
  courseId: string;
  title: string;
  price: number;
  discountPrice?: number;
  merchantId: string;
  category: string;
  institute: string;
  description: string;
  thumbnail?: string;
}

// Add to your settingTypes.ts
export interface CourseThunkResponse {
  payload?: CourseResponse;
}

export interface CourseResponse {
  message: string;
  data: CourseData;
  success?: boolean; // Add if your API response includes this
}