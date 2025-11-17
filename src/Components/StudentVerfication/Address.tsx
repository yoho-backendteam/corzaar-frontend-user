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

const Address: React.FC<AddressProps> = ({ InputField, handelAddressInfo, studentForm, setSameAddress }) => (
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
        <InputField
          label="Street Address"
          placeholder="Select Address"
          value={studentForm?.personalInfo?.address?.permanent?.street}
          onChange={(e: any) => handelAddressInfo("street", "permanent", e)}
        />
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "20px",
          marginTop: "20px",
        }}
      >
        <InputField
          label="City"
          placeholder="Select City"
          value={studentForm?.personalInfo?.address?.permanent?.city}
          onChange={(e: any) => handelAddressInfo("city", "permanent", e)}
        />
        <InputField
          label="State"
          placeholder="Select State"
          value={studentForm?.personalInfo?.address?.permanent?.state}
          onChange={(e: any) => handelAddressInfo("state", "permanent", e)}
        />
        <InputField
          label="Zip Code"
          placeholder="Select Zip Code"
          value={studentForm?.personalInfo?.address?.permanent?.zipCode}
          onChange={(e: any) => handelAddressInfo("zipCode", "permanent", e)}
        />
        <InputField
          label="Country"
          placeholder="Select Country"
          value={studentForm?.personalInfo?.address?.permanent?.country}
          onChange={(e: any) => handelAddressInfo("country", "permanent", e)}
        />
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
        <InputField
          label="Street Address"
          placeholder="Select Address"
          value={studentForm?.personalInfo?.address?.current?.street}
          onChange={(e: any) => handelAddressInfo("street", "current", e)}
        />
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "20px",
          marginTop: "20px",
        }}
      >
        <InputField
          label="City"
          placeholder="Select City"
          value={studentForm?.personalInfo?.address?.current?.city}
          onChange={(e: any) => handelAddressInfo("city", "current", e)}
        />
        <InputField
          label="State"
          placeholder="Select State"
          value={studentForm?.personalInfo?.address?.current?.state}
          onChange={(e: any) => handelAddressInfo("state", "current", e)}
        />
        <InputField
          label="Zip Code"
          placeholder="Select Zip Code"
          value={studentForm?.personalInfo?.address?.current?.zipCode}
          onChange={(e: any) => handelAddressInfo("zipcode", "current", e)}
        />
        <InputField
          label="Country"
          placeholder="Select Country"
          value={studentForm?.personalInfo?.address?.current?.country}
          onChange={(e: any) => handelAddressInfo("country", "current", e)}
        />
      </div>
    </div>
  </div>
);

export default Address;
