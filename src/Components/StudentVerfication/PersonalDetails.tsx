/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { type ChangeEvent } from "react";
import { COLORS, FONTS } from "../../Constants/uiconstants";
import { LuUserRound } from "react-icons/lu";
import type { StudentFormType } from "../../types/studentForm";

interface PersonalDetailsProps {
  InputField: React.FC<{ label: string; placeholder?: string; value?: string, onChange?: any }>;
  SelectField?: React.FC<{ label: string; placeholder?: string }>;
  handelPersonalInfo: (key: string, e: ChangeEvent<HTMLInputElement>) => void;
  studentForm: StudentFormType
}

const PersonalDetails: React.FC<PersonalDetailsProps> = ({ handelPersonalInfo, studentForm }) => {

  return (
    <div>
      <h2 style={{ ...FONTS.S_Cart_title, color: COLORS.C_DIV_Title }} className="flex items-center gap-2"><LuUserRound size={38} className="rounded-full p-2 sm:p-3 md:p-2" style={{ background: COLORS.primary_red, color: COLORS.primary_white }} />Personal Details</h2>
      <p style={{ ...FONTS.regular as any, color: COLORS.primary_gray }}>Help us know you better</p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "20px",
          marginTop: "20px",
        }}
      >
        <div className="w-full">
          <label style={{ ...(FONTS.medium as any), display: "block", marginBottom: "6px" }}>
            First Name
          </label>
          <input
            type="text"
            placeholder="first name"
            value={studentForm?.personalInfo?.firstName}
            style={{
              width: "100%",
              padding: "12px",
              border: "none",
              borderRadius: "6px",
              fontSize: "16px",
              outline: "none",
              boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
            }}
            onChange={(e: any) => handelPersonalInfo("firstName", e)}
          />
        </div>

        <div className="w-full">
          <label style={{ ...(FONTS.medium as any), display: "block", marginBottom: "6px" }}>
            Last Name
          </label>
          <input
            type="text"
            placeholder="last name"
            value={studentForm?.personalInfo?.lastName}
            style={{
              width: "100%",
              padding: "12px",
              border: "none",
              borderRadius: "6px",
              fontSize: "16px",
              outline: "none",
              boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
            }}
            onChange={(e: any) => handelPersonalInfo("lastName", e)}
          />
        </div>

        <div className="w-full">
          <label style={{ ...(FONTS.medium as any), display: "block", marginBottom: "6px" }}>
            Email
          </label>
          <input
            type="text"
            placeholder="email"
            value={studentForm?.personalInfo?.email}
            style={{
              width: "100%",
              padding: "12px",
              border: "none",
              borderRadius: "6px",
              fontSize: "16px",
              outline: "none",
              boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
            }}
            onChange={(e: any) => handelPersonalInfo("email", e)}
          />
        </div>

        <div className="w-full">
          <label style={{ ...(FONTS.medium as any), display: "block", marginBottom: "6px" }}>
            Date of Birth
          </label>
          <input
            type="text"
            placeholder="date of birth"
            value={studentForm?.personalInfo?.dateOfBirth}
            style={{
              width: "100%",
              padding: "12px",
              border: "none",
              borderRadius: "6px",
              fontSize: "16px",
              outline: "none",
              boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
            }}
            onChange={(e: any) => handelPersonalInfo("dateOfBirth", e)}
          />
        </div>

        <div className="w-full">
          <label style={{ ...(FONTS.medium as any), display: "block", marginBottom: "6px" }}>
            Gender
          </label>
          <input
            type="text"
            placeholder="Gender"
            value={studentForm?.personalInfo?.gender}
            style={{
              width: "100%",
              padding: "12px",
              border: "none",
              borderRadius: "6px",
              fontSize: "16px",
              outline: "none",
              boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
            }}
            onChange={(e: any) => handelPersonalInfo("gender", e)}
          />
        </div>
        {/* <SelectField
          label="Date Of Birth"
          placeholder="Select your Birthday"
        />
        <SelectField label="Gender" placeholder="Select Gender" /> */}
        {/* <SelectField label="Nationality" placeholder="Select your Nationality" /> */}
      </div>
    </div>
  )
}

export default PersonalDetails;
