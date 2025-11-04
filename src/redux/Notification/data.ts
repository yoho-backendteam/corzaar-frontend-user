import card1icon from "../../assets/Notification/card1icon.png"
import offericon from "../../assets/Notification/offersicon.png"
import successicon from "../../assets/Notification/successicon.png"
export interface Notification {
  id: number;
  img: string;
  title: string;
  message: string;
  time: string;
  type: "course" | "offer" | "completed" | "payment" | "query";
  read: boolean;
}

export const notificationsData: Notification[] = [
  {
    id: 1,
    img: card1icon,
    title: "New Courses Added",
    message: 'Tech Academy Pro has added a new course: "Advanced React Patterns"',
    time: "5 Hours Ago",
    type: "course",
    read: false,
  },
  {
    id: 2,
    img: offericon,
    title: "Special Offers Alert",
    message: "Get 60% off on all tech courses. Use code: NEWYEAR60",
    time: "5 Hours Ago",
    type: "offer",
    read: false,
  },
  {
    id: 3,
    img: successicon,
    title: "Course Completed",
    message: 'Congratulations! You have completed "Complete Web Development Bootcamp"',
    time: "5 Hours Ago",
    type: "completed",
    read: true,
  },
  {
    id: 4,
    img: successicon,
    title: "Payment Successful",
    message: "Your payment of ₹2,999 for Digital Marketing Masterclass was successful",
    time: "5 Hours Ago",
    type: "payment",
    read: true,
  },
  {
    id: 5,
    img: card1icon,
    title: "Query Resolved",
    message: "Your query regarding certificate generation has been resolved",
    time: "5 Hours Ago",
    type: "query",
    read: true,
  },
];
