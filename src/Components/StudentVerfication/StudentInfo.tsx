/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { type ChangeEvent } from "react";
import { COLORS, FONTS } from "../../Constants/uiconstants";
import { HiOutlineUsers } from "react-icons/hi2";
import type { StudentFormType } from "../../types/studentForm";

interface props {
  handelpersonalInfo: (key: string, e: ChangeEvent<HTMLInputElement>) => void;
  studentForm: StudentFormType
}

const StudentInfo: React.FC<props> = ({ handelpersonalInfo, studentForm }) => {

  return (
    <div>
      <h2 style={{ ...FONTS.S_Cart_title, color: COLORS.C_DIV_Title }} className="flex items-center gap-2"><HiOutlineUsers size={38} className="rounded-full p-2 sm:p-3 md:p-2" style={{ background: COLORS.primary_red, color: COLORS.primary_white }} />Student Information</h2>
      <p style={{ ...FONTS.regular as any, color: COLORS.primary_gray }}>Let's Start with the Basics</p>

      <label htmlFor="fullName" style={{ ...FONTS.medium as any, display: "block", marginTop: "20px" }}>
        Full Student Name
      </label>
      <input
        id="fullName"
        type="text"
        value={studentForm?.personalInfo?.fullName}
        placeholder="Enter Full Legal Name"
        onChange={(e) => handelpersonalInfo("fullName", e)}
        style={{
          width: "100%",
          marginTop: "10px",
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
  )
}


export default StudentInfo;
