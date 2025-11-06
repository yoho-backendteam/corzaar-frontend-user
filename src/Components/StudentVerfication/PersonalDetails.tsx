import React from "react";
import { COLORS, FONTS } from "../../Constants/uiconstants";
import { LuUserRound } from "react-icons/lu";

interface PersonalDetailsProps {
  InputField: React.FC<{ label: string; placeholder?: string; value?: string }>;
  SelectField: React.FC<{ label: string; placeholder?: string }>;
}

const PersonalDetails: React.FC<PersonalDetailsProps> = ({ InputField, SelectField }) => (
  <div>
    <h2 style={{ ...FONTS.S_Cart_title, color: COLORS.C_DIV_Title }}><LuUserRound size={24} />Personal Details</h2>
    <p style={{ ...FONTS.regular as any, color: COLORS.primary_gray }}>Help us know you better</p>

    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "20px",
        marginTop: "20px",
      }}
    >
      <InputField label="First Name" value="Rahul" />
      <InputField label="Last Name" value="Sharma" />
      <InputField label="Email" value="rahulsharma@example.com" />
      <InputField label="Phone Number" placeholder="Your Phone Number" />
      <SelectField label="Date Of Birth" placeholder="Select your Birthday" />
      <SelectField label="Gender" placeholder="Select Gender" />
      <SelectField label="Blood Group" placeholder="Select Blood Group" />
      <SelectField label="Nationality" placeholder="Select your Nationality" />
      <SelectField label="Religion" placeholder="Select your Religion" />
      <SelectField label="Category" placeholder="Select your Category" />
    </div>
  </div>
);

export default PersonalDetails;
