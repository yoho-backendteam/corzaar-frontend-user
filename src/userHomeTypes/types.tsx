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
}


export interface Course {
  id: number;
  title: string;
  category: {
      primary: string
    };
  level: string;
  institute: string;
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
}


export interface CourseCardProps {
  course: {
    id: number;
    
    
    title: string;
    category: {
      primary: string
    };
    level: string;
    institute: string;
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
        createdAt: string
      }
    ];
    students: number;
    duration: string;
  };
}

export interface Institute {
  id: string;
  _id:string;
  name: string;
  coverImage: string;
  rating: number;
  location: string;
  courses: number;
 contactInfo: ContactInfo;
}



export interface ContactInfo {
  address:  {
  street: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
}
}


export interface CategoryType {
  id: number;
  name: string;
  courses: number;
}
