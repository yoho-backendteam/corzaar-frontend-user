export interface SocialMedia {
  linkedin?: string;
  [key: string]: string | undefined; 
}

export interface ContactInfo {
  website: string | undefined;
  email: string;
  phone?: string;
  address?: {
    city?: string;
    state?: string;
    country?: string;
    [key: string]: string | undefined;
  };
}

export interface Statistics {
  averageRating?: number;
  totalCourses?: number;
  totalStudents?: number;
}

export interface Institute {
  _id: string;
  id: string;
  name: string;
  description: string;
  image: string;
  coverImage?: string;
  logo?: string;
  rating: number;
  city: string;
  courses: number;
  students: number;
  category?: string;
  tags: string[];
  email: string;
  website?: string;
  linkedin?: string;
  socialMedia?: SocialMedia;
  contactInfo?: ContactInfo;
  statistics?: Statistics;
}

export interface Student {
  id: string;
  name: string;
  email: string;
  enrolledCourses: string[];
  instituteId: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  duration: string;
  instructor: string;
  instituteId: string;
}

export interface InstituteState {
  list: Institute[];
  selected: Institute | null;
  loading: boolean;
  error: string | null;
  search: string;
  activeCategory: string;
}
