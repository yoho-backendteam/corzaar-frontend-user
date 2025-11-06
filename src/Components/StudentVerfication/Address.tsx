import React from "react";
import { COLORS, FONTS } from "../../Constants/uiconstants";
import { HiOutlineLocationMarker } from "react-icons/hi";
interface AddressProps {
  InputField: React.FC<{ label: string; placeholder?: string }>;
}

const Address: React.FC<AddressProps> = ({ InputField }) => (
  <div>
    <h2 style={{ ...FONTS.S_Cart_title, color: COLORS.C_DIV_Title }} className="flex items-center gap-2"> 
     <HiOutlineLocationMarker size={38} className="rounded-full p-2 sm:p-3 md:p-2" style={{background:COLORS.primary_red, color:COLORS.primary_white}} />  Address Information
    </h2>
    <p style={{ ...FONTS.regular as any, color: COLORS.primary_gray }}>
      Where can we reach you?
    </p>

    
    <div  className="mt-5 shadow-md p-4 rounded-2xl">
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
        <InputField label="Street Address" placeholder="Select Address" />
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "20px",
          marginTop: "20px",
        }}
      >
        <InputField label="City" placeholder="Select City" />
        <InputField label="State" placeholder="Select State" />
        <InputField label="Zip Code" placeholder="Select Zip Code" />
        <InputField label="Country" placeholder="Select Country" />
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
          <input type="checkbox" /> Same as Permanent
        </label>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr",
          gap: "20px",
        }}
      >
        <InputField label="Street Address" placeholder="Select Address" />
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "20px",
          marginTop: "20px",
        }}
      >
        <InputField label="City" placeholder="Select City" />
        <InputField label="State" placeholder="Select State" />
        <InputField label="Zip Code" placeholder="Select Zip Code" />
        <InputField label="Country" placeholder="Select Country" />
      </div>
    </div>
  </div>
);

export default Address;
