/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { type ChangeEvent } from "react";
import { COLORS, FONTS } from "../../Constants/uiconstants";
import { HiOutlinePhone } from "react-icons/hi2";
import { CircleCheck } from 'lucide-react';
import type { StudentFormType } from "../../types/studentForm";

interface EmergencyContactProps {
  InputField: React.FC<{ label: string; placeholder?: string, value?: string, onChange?: any }>;
  handelemgInfo: (key: string, e: ChangeEvent<HTMLInputElement>) => void;
  studentForm: StudentFormType
}

const EmergencyContact: React.FC<EmergencyContactProps> = ({ handelemgInfo, studentForm }) => {



  return (
    <div>
      <div className="shadow-md p-4 rounded-2xl mb-5">
        <h1 style={{ ...FONTS.S_Cart_title, color: COLORS.C_DIV_Title, marginBottom: "8px" }} className="flex items-center gap-2">
          <HiOutlinePhone size={38} className="rounded-full p-2 sm:p-3 md:p-2" style={{ background: COLORS.primary_red, color: COLORS.primary_white }} /> Emergency Contact
        </h1>
        <p style={{ ...FONTS.regular as any, color: COLORS.primary_gray, marginBottom: "32px" }}>
          Someone we can reach in emergencies
        </p>


        <div className="mb-6 flex gap-5">
          <div className="flex-1">
            <h2 style={{ ...FONTS.SHOPPING_CART_Title, color: COLORS.C_DIV_Title, marginBottom: "8px" }}>
              Contact Name
            </h2>
            <div className="w-full">
              <input
                type="text"
                placeholder="name"
                value={studentForm?.personalInfo?.emergencyContact?.name}
                style={{
                  width: "100%",
                  padding: "12px",
                  border: "none",
                  borderRadius: "6px",
                  fontSize: "16px",
                  outline: "none",
                  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                }}
                onChange={(e: any) => handelemgInfo("name", e)}
              />
            </div>
          </div>

          <div className="flex-1">
            <h2 style={{ ...FONTS.SHOPPING_CART_Title, color: COLORS.C_DIV_Title, marginBottom: "8px" }}>
              Relationship
            </h2>
            <div className="w-full">
              <input
                type="text"
                placeholder="relationship"
                value={studentForm?.personalInfo?.emergencyContact?.relationship}
                style={{
                  width: "100%",
                  padding: "12px",
                  border: "none",
                  borderRadius: "6px",
                  fontSize: "16px",
                  outline: "none",
                  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                }}
                onChange={(e: any) => handelemgInfo("relationship", e)}
              />
            </div>
          </div>

        </div>


        <div className="mb-6 flex gap-5">
          <div className="flex-1">
            <h2 style={{ ...FONTS.SHOPPING_CART_Title, color: COLORS.C_DIV_Title, marginBottom: "8px" }}>
              Phone Number
            </h2>
            <div className="w-full">
              <input
                type="text"
                placeholder="phone"
                value={studentForm?.personalInfo?.emergencyContact?.phone}
                style={{
                  width: "100%",
                  padding: "12px",
                  border: "none",
                  borderRadius: "6px",
                  fontSize: "16px",
                  outline: "none",
                  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                }}
                onChange={(e: any) => handelemgInfo("phone", e)}
              />
            </div>
          </div>
          <div className="flex-1">
            <h2 style={{ ...FONTS.SHOPPING_CART_Title, color: COLORS.C_DIV_Title, marginBottom: "8px" }}>
              Email
            </h2>
            <div className="w-full">
              <input
                type="text"
                placeholder="email"
                value={studentForm?.personalInfo?.emergencyContact?.email}
                style={{
                  width: "100%",
                  padding: "12px",
                  border: "none",
                  borderRadius: "6px",
                  fontSize: "16px",
                  outline: "none",
                  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                }}
                onChange={(e: any) => handelemgInfo("email", e)}
              />
            </div>
          </div>
        </div>

      </div>
      <div className="shadow-md p-4 rounded-2xl">
        <div className="mb-8 ">
          <div style={{
            border: `2px solid ${COLORS.secondary_green}`,
            borderRadius: "8px",
            padding: "16px",
          }}>
            <h4 style={{
              ...FONTS.SHOPPING_CART_Title,
              color: COLORS.C_DIV_Title,
              marginBottom: "8px"
            }}
              className="flex gap-2 items-center">
              <span className="rounded-full p-2" style={{ background: COLORS.secondary_green }}><CircleCheck style={{ color: COLORS.primary_white }} /> </span>  Almost Done!
            </h4>
            <p style={{
              ...FONTS.SHOPPING_CART_SubTitle,
              color: COLORS.primary_gray
            }}>
              Review your information and click submit to complete your enrollment.
            </p>
          </div>

        </div>
      </div>

    </div>
  );
}

export default EmergencyContact;