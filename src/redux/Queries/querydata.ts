import emailIcon from "../../assets/Container.png";
import icon2 from "../../assets/Container (3).png";
import icon3 from "../../assets/Container (1).png";
import icon4 from "../../assets/Container (2).png";

export const categories = [
  "General Inquiry",
  "Support",
  "Business",
  "Feedback"
];

export const contactInfo = [
  {
     icon: icon2,  
    isImage: true,
    title: "Email Us",
    value: "support@studyamarket.com",
    desc: "We typically respond within 24 hours"
  },
  {
    icon: emailIcon,
    isImage: true,
    title: "Call Us",
    value: "+1-555-234-5678",
    desc: "Mon-Fri,9:00 AM -6:00 PM EST"
  },
  {
    icon: icon3,
    isImage: true,
    title: "Visit Us",
    value: "123 Education Street\nBoston, MA 02101, USA",
    desc: ""
  },
  {
   icon: icon4,
    isImage: true,
    title: "Business Hours",
    value: "Monday -Friday\n9:30 AM - 6:00 PM EST",
    desc: ""
  }
];

export const quickLinks = [
  "FAQs",
  "Help Center",
  "Support Documentation",
  "Terms & Conditions"
];
