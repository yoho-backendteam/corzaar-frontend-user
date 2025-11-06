import React from "react";
import { COLORS, FONTS } from "../../Constants/uiconstants";
import { HiOutlineLocationMarker } from "react-icons/hi";

const StudentInfo: React.FC = () => (
  <div>
    <h2 style={{ ...FONTS.S_Cart_title, color: COLORS.C_DIV_Title }}><HiOutlineLocationMarker size={24} />Student Information</h2>
    <p style={{ ...FONTS.regular as any, color: COLORS.primary_gray }}>Let's Start with the Basics</p>

    <label htmlFor="fullName" style={{ ...FONTS.medium as any, display: "block", marginTop: "20px" }}>
      Full Student Name
    </label>
    <input
      id="fullName"
      type="text"
      placeholder="Enter Full Legal Name"
    style={{
    width: "100%",
    marginTop:"10px",
    padding: "15px",
    border: "none", 
    borderRadius: "6px",
    fontSize: "16px",
    outline: "none", 
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)", 
  }}
    />
    
    <p style={{ fontSize: "12px", color: COLORS.primary_gray }}>
      This will appear on your Certificate
    </p>
  </div>
);

export default StudentInfo;
