/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { type ChangeEvent } from "react";
import { COLORS, FONTS } from "../../Constants/uiconstants";
import { HiOutlineLocationMarker } from "react-icons/hi";
import type { StudentFormType } from "../../types/studentForm";
interface AddressProps {
  InputField: React.FC<{ label: string; placeholder?: string, value?: string, onChange?: any }>;
  handelAddressInfo: (key: string, type: 'permanent' | 'current', e: ChangeEvent<HTMLInputElement>) => void;
  studentForm: StudentFormType;
  setSameAddress: () => void;
}

const Address: React.FC<AddressProps> = ({ handelAddressInfo, studentForm, setSameAddress }) => (
  <div>
    <h2 style={{ ...FONTS.S_Cart_title, color: COLORS.C_DIV_Title }} className="flex items-center gap-2">
      <HiOutlineLocationMarker size={38} className="rounded-full p-2 sm:p-3 md:p-2" style={{ background: COLORS.primary_red, color: COLORS.primary_white }} />  Address Information
    </h2>
    <p style={{ ...FONTS.regular as any, color: COLORS.primary_gray }}>
      Where can we reach you?
    </p>


    <div className="mt-5 shadow-md p-4 rounded-2xl">
      <h3
        style={{
          ...FONTS.medium as any,
          fontWeight: 600,
          color: COLORS.primary_black,
          marginBottom: "15px",
        }}
      >
        Permanent Address
      </h3>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr",
          gap: "20px",
        }}
      >
        <div className="w-full">
          <label style={{ ...(FONTS.medium as any), display: "block", marginBottom: "6px" }}>
            Street Address
          </label>
          <input
            type="text"
            placeholder="street"
            value={studentForm?.personalInfo?.address?.permanent?.street}
            style={{
              width: "100%",
              padding: "12px",
              border: "none",
              borderRadius: "6px",
              fontSize: "16px",
              outline: "none",
              boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
            }}
            onChange={(e: any) => handelAddressInfo("street", "permanent", e)}
          />
        </div>
      </div>

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
            City
          </label>
          <input
            type="text"
            placeholder="city"
            value={studentForm?.personalInfo?.address?.permanent?.city}
            style={{
              width: "100%",
              padding: "12px",
              border: "none",
              borderRadius: "6px",
              fontSize: "16px",
              outline: "none",
              boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
            }}
            onChange={(e: any) => handelAddressInfo("city", "permanent", e)}
          />
        </div>

        <div className="w-full">
          <label style={{ ...(FONTS.medium as any), display: "block", marginBottom: "6px" }}>
            State
          </label>
          <input
            type="text"
            placeholder="state"
            value={studentForm?.personalInfo?.address?.permanent?.state}
            style={{
              width: "100%",
              padding: "12px",
              border: "none",
              borderRadius: "6px",
              fontSize: "16px",
              outline: "none",
              boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
            }}
            onChange={(e: any) => handelAddressInfo("state", "permanent", e)}
          />
        </div>

        <div className="w-full">
          <label style={{ ...(FONTS.medium as any), display: "block", marginBottom: "6px" }}>
            Zip Code
          </label>
          <input
            type="text"
            placeholder="zip code"
            value={studentForm?.personalInfo?.address?.permanent?.zipCode}
            style={{
              width: "100%",
              padding: "12px",
              border: "none",
              borderRadius: "6px",
              fontSize: "16px",
              outline: "none",
              boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
            }}
            onChange={(e: any) => handelAddressInfo("zipCode", "permanent", e)}
          />
        </div>

        <div className="w-full">
          <label style={{ ...(FONTS.medium as any), display: "block", marginBottom: "6px" }}>
            Country
          </label>
          <input
            type="text"
            placeholder="country"
            value={studentForm?.personalInfo?.address?.permanent?.country}
            style={{
              width: "100%",
              padding: "12px",
              border: "none",
              borderRadius: "6px",
              fontSize: "16px",
              outline: "none",
              boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
            }}
            onChange={(e: any) => handelAddressInfo("country", "permanent", e)}
          />
        </div>

      </div>
    </div>


    <div className="mt-10 shadow-md p-4 rounded-2xl">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "15px",
        }}
      >
        <h3
          style={{
            ...FONTS.medium as any,
            fontWeight: 600,
            color: COLORS.primary_black,
          }}
        >
          Current Address
        </h3>
        <label
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            fontSize: "14px",
            color: COLORS.primary_black,
            cursor: "pointer",
          }}
        >
          <input type="checkbox" onChange={setSameAddress} /> Same as Permanent
        </label>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr",
          gap: "20px",
        }}
      >
        <div className="w-full">
          <label style={{ ...(FONTS.medium as any), display: "block", marginBottom: "6px" }}>
            Street Address
          </label>
          <input
            type="text"
            placeholder="street"
            value={studentForm?.personalInfo?.address?.current?.street}
            style={{
              width: "100%",
              padding: "12px",
              border: "none",
              borderRadius: "6px",
              fontSize: "16px",
              outline: "none",
              boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
            }}
            onChange={(e: any) => handelAddressInfo("street", "current", e)}
          />
        </div>

      </div>

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
            City
          </label>
          <input
            type="text"
            placeholder="city"
            value={studentForm?.personalInfo?.address?.current?.city}
            style={{
              width: "100%",
              padding: "12px",
              border: "none",
              borderRadius: "6px",
              fontSize: "16px",
              outline: "none",
              boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
            }}
            onChange={(e: any) => handelAddressInfo("city", "current", e)}
          />
        </div>

        <div className="w-full">
          <label style={{ ...(FONTS.medium as any), display: "block", marginBottom: "6px" }}>
            State
          </label>
          <input
            type="text"
            placeholder="state"
            value={studentForm?.personalInfo?.address?.current?.state}
            style={{
              width: "100%",
              padding: "12px",
              border: "none",
              borderRadius: "6px",
              fontSize: "16px",
              outline: "none",
              boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
            }}
            onChange={(e: any) => handelAddressInfo("state", "current", e)}
          />
        </div>

        <div className="w-full">
          <label style={{ ...(FONTS.medium as any), display: "block", marginBottom: "6px" }}>
            Zip Code
          </label>
          <input
            type="text"
            placeholder="zip code"
            value={studentForm?.personalInfo?.address?.current?.zipCode}
            style={{
              width: "100%",
              padding: "12px",
              border: "none",
              borderRadius: "6px",
              fontSize: "16px",
              outline: "none",
              boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
            }}
            onChange={(e: any) => handelAddressInfo("zipCode", "current", e)}
          />
        </div>

        <div className="w-full">
          <label style={{ ...(FONTS.medium as any), display: "block", marginBottom: "6px" }}>
            Country
          </label>
          <input
            type="text"
            placeholder="country"
            value={studentForm?.personalInfo?.address?.current?.country}
            style={{
              width: "100%",
              padding: "12px",
              border: "none",
              borderRadius: "6px",
              fontSize: "16px",
              outline: "none",
              boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
            }}
            onChange={(e: any) => handelAddressInfo("country", "current", e)}
          />
        </div>

      </div>
    </div>
  </div>
);

export default Address;
