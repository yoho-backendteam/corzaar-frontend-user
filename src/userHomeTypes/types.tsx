/* eslint-disable @typescript-eslint/no-explicit-any */
export interface Offer {
  id: string;
  title: string;
  description: string;
  icon?: string;
  image?: string;
  buttonText?: string;
  buttonColor?: string;
  discount?: number;
  validTill?: string;
  validity: string;
  applicableTo: string[];
  code: string;
  endDate: string;
  discountValue: string;
  courseId?: string;
  _id: string;
  courseData: {
    title: string
  }
}




export interface Course {
  image: string;
  weeks: number;
  instituteId: string;
  id: number;
  title: string;
  category: {
    primary: string
  };
  level: string;
  institute?: string;
  price: number;
  oldPrice: number;
  enrolled: boolean;
  thumbnail: string;
  discount?: number;
  rating: number;
  reviews: [
    {
      comment: string;
      rating: number;
      name: string;
      createdAt: string;
    }
  ];
  students: number;
  duration: string;
  _id: string
  description: string;
  pricing: {
    price: number
  }
}


export interface CourseCardProps {
  _id?: string;
  // course: {
  //   id: number;
  //   _id: string

  //   title: string;
  //   category: {
  //     primary: string
  //   };
  //   description: string;
  //   level: string;
  //   institute: string;
  //   price: number;
  //   pricing: {
  //     price: number
  //   }
  //   oldPrice: number;
  //   enrolled: boolean;
  //   thumbnail: string;
  //   discount?: number;
  //   rating: number;
  //   reviews: [
  //     {
  //       comment: string;
  //       rating: number;
  //       name: string;
  //       createdAt: string
  //     }
  //   ];
  //   students: number;
  //   duration: string;
  //   isactive?: boolean
  // };
  course: any
}

export interface Institute {
  id: string;
  _id: string;
  name: string;
  coverImage: string;
  rating: number;
  location: string;
  courses: number;
  contactInfo: ContactInfo;
}



export interface ContactInfo {
  address: {
    street: string;
    city: string;
    state: string;
    country: string;
    zipCode: string;
  }
}


export interface CategoryType {
  id: number;
  category: {
    primary: string
  };
  courses: number;
  _id: string;
}


export interface addtocartTypes {
  userId: string
  courseId: string
  title: string
  price: number
  discount: number
  instituteId: string
  payment: number
  billing: string
}
