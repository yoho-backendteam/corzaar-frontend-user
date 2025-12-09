/* eslint-disable @typescript-eslint/no-explicit-any */
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
  lastName: any;
  firstName: any;
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
  success: any;
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
  message?: string;
  Message?: string
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

// Course types
export interface CourseData {
  title: string;
  category?: {
    primary: string;
  };
  instituteId?: string;
  description: string;
  shortDescription?: string;
  thumbnail?: string;
  price?: number;
  discountPrice?: number;
}

export interface CourseResponse {
  success: boolean;
  data: CourseData;
  message?: string;
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
  setData: ProfileResponse | any | null;
  activityData: ActivityResponse | null;
  attendanceData: AttendanceResponse | null;
  coursesIdData: CoursesIdResponse | null;
}

