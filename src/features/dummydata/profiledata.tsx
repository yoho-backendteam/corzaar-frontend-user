// src/features/profile/profileData.ts
export const profileData = {
  name: "Rahul Sharma",
  email: "rahulsharma@example.com",
  role: "Student",
  skills: ["JavaScript", "HTML", "CSS", "Node.js"],
  interests: ["Web Development", "UI Design", "Cloud Computing"],
  coursesEnrolled: 3,
  avgAttendance: 91,

  // ✅ Updated attendance data (includes sessions + date)
  attendance: [
    {
      label: "Complete Web Development Bootcamp",
      progress: 95,
      sessionsCompleted: 38,
      totalSessions: 40,
      date: "Oct 2025",
    },
    {
      label: "Digital Marketing Masterclass",
      progress: 90,
      sessionsCompleted: 27,
      totalSessions: 30,
      date: "Oct 2025",
    },
    {
      label: "Cloud Computing with AWS",
      progress: 89.9,
      sessionsCompleted: 40,
      totalSessions: 45,
      date: "Nov 2025",
    },
  ],

  // ✅ Recent activity list
  recentActivity: [
    {
      title: "Enrolled in Complete Web Development Bootcamp",
      date: "Nov 3, 2025",
    },
    { title: "Enrolled in Digital Marketing Masterclass", date: "Nov 3, 2025" },
    { title: "Enrolled in Cloud Computing with AWS", date: "Nov 3, 2025" },
  ],

  title: "Tech Academy Pro",
  verified: true,
  description:
    "Leading technology education provider with expert instructors and industry partnerships. We offer world-class technology, business, and management programs.",
  ratings: "4.9",
  courses: 65,
  students: 14,
  location: "Bangalore, India",
  tags: ["Technology", "Design", "Business"],

  stats: [
    { icon: "icon.png", label: "Courses Enrolled", value: 3 },
    { icon: "icon1.png", label: "Projects", value: 3 },
    { icon: "icon2.png", label: "Achievements", value: 3 },
    { icon: "icon3.png", label: "Avg Attendance", value: "91%" },
  ],

  projects: [
    {
      title: "E-Commerce Platform",
      description: "A full-stack e-commerce application with React.",
      tags: ["React", "Node.js", "MongoDB", "Express"],
      date: "Sep 2025",
    },
    {
      title: "Task Management App",
      description:
        "A collaborative task management tool with real-time updates.",
      tags: ["React", "Node.js", "MongoDB", "Express"],
      date: "Sep 2025",
    },
    {
      title: "Weather Dashboard",
      description: "Interactive weather dashboard with data visualization.",
      tags: ["React", "Node.js", "MongoDB", "Express"],
      date: "Sep 2025",
    },
  ],

  achievements: [
    {
      title: "Top Performer - Web Development Bootcamp",
      organization: "Tech Academy Pro",
      description: "Achieved 98% in final assessment",
      date: "Oct 2025",
    },
    {
      title: "Capstone Project Winner",
      organization: "Tech Academy Pro",
      description: "E-Commerce Platform selected as best project",
      date: "Sep 2025",
    },
    {
      title: "AWS Certified Practitioner",
      organization: "Amazon Web Services",
      description: "AWS Cloud Practitioner certification",
      date: "Aug 2025",
    },
  ],

  coursesList: [
    {
      title: "Complete Web Development Bootcamp",
      instructor: "Tech Academy Pro",
      progress: 75,
      category: "Technology",
      lastAccessed: "2 days ago",
    },
    {
      title: "Digital Marketing Masterclass",
      instructor: "Marketing Experts Hub",
      progress: 80,
      category: "Business",
      lastAccessed: "2 days ago",
    },
    {
      title: "Cloud Computing with AWS",
      instructor: "Cloud Masters Institute",
      progress: 90,
      category: "Technology",
      lastAccessed: "2 days ago",
    },
  ],

  payments: [
    {
      title: "Complete Web Development Bootcamp",
      paymentId: "PAY001",
      date: "Sep 2025",
      method: "Credit Card",
      amount: "3,499",
      status: "Completed",
    },
    {
      title: "Digital Marketing Masterclass",
      paymentId: "PAY002",
      date: "Sep 2025",
      method: "UPI",
      amount: "3,499",
      status: "Completed",
    },
    {
      title: "Cloud Computing with AWS",
      paymentId: "PAY003",
      date: "Oct 2025",
      method: "Debit Card",
      amount: "3,499",
      status: "Completed",
    },
  ],

  favorites: [
    {
      image: "image1.png",
      category: "Technology",
      title: "Data Science & Machine Learning",
      institute: "Data Science Institute",
      price: "3,499",
      oldPrice: "5,999",
      buttonLabel: "View Details",
    },
    {
      image: "image2.png",
      category: "Technology",
      title: "UI/UX Design Fundamentals",
      institute: "Tech Academy Pro",
      price: "2,999",
      oldPrice: "3,999",
      buttonLabel: "View Details",
    },
  ],

  // ✅ Notifications and Privacy settings (for Settings tab)
  notifications: [
    { label: "Email notifications for course updates", enabled: true },
    { label: "Promotional offers and discounts", enabled: false },
    { label: "Weekly course recommendations", enabled: true },
  ],
  privacySettings: [
    { label: "Show profile to other students", enabled: true },
    { label: "Share learning progress with institutes", enabled: false },
    { label: "Allow search engines to index profile", enabled: false },
  ],
};
