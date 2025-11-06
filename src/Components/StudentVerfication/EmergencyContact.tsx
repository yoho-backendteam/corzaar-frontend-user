import React from "react";
import { COLORS, FONTS } from "../../Constants/uiconstants";
import { HiOutlinePhone} from "react-icons/hi2";
import { CircleCheck } from 'lucide-react';

interface EmergencyContactProps {
  InputField: React.FC<{ label: string; placeholder?: string }>;
}

const EmergencyContact: React.FC<EmergencyContactProps> = ({ InputField }) => (
  <div>
    <div className="shadow-md p-4 rounded-2xl mb-5">
    <h1 style={{ ...FONTS.S_Cart_title, color: COLORS.C_DIV_Title, marginBottom: "8px" }}>
     <HiOutlinePhone size={24} /> Emergency Contact
    </h1>
    <p style={{ ...FONTS.regular as any, color: COLORS.primary_gray, marginBottom: "32px" }}>
      Someone we can reach in emergencies
    </p>

    
    <div className="mb-6 flex gap-5">
      <div className="flex-1">
        <h2 style={{ ...FONTS.SHOPPING_CART_Title, color: COLORS.C_DIV_Title, marginBottom: "8px" }}>
        Contact Name
      </h2>
      <InputField label="" placeholder="Select Name" />
      </div>
      
    <div className="flex-1">
        <h2 style={{ ...FONTS.SHOPPING_CART_Title, color: COLORS.C_DIV_Title, marginBottom: "8px" }}>
          Relationship
        </h2>
        <InputField label="" placeholder="Select Relationship" />
      </div>

    </div>

    
    <div className="mb-6 flex gap-5">
      <div  className="flex-1">
        <h2 style={{ ...FONTS.SHOPPING_CART_Title, color: COLORS.C_DIV_Title, marginBottom: "8px" }}>
          Phone Number
        </h2>
        <InputField label="" placeholder="Select Phone" />
      </div>
      <div className="flex-1">
      <h2 style={{ ...FONTS.SHOPPING_CART_Title, color: COLORS.C_DIV_Title, marginBottom: "8px" }}>
        Email
      </h2>
      <InputField label="" placeholder="Select Email" />
    </div>
    </div>

   </div>
    <div className="shadow-md p-4 rounded-2xl">
     <div className="flex justify-between">
      <h2 style={{ ...FONTS.SHOPPING_CART_Title, color: COLORS.C_DIV_Title, marginBottom: "8px" }}>
        Current Address
      </h2>
      <div>
        <label style={{ 
        ...FONTS.regular as any, 
        color: COLORS.primary_gray, 
        display: "flex", 
        alignItems: "center", 
        gap: "8px" 
      }}>
        <input type="checkbox" style={{ margin: 0 }} />
        Same as Permanent
      </label>
      </div>  
        </div>     
<div className="mb-8 ">
    
      <div>
        <h2 style={{ 
        ...FONTS.SHOPPING_CART_Title, 
        color: COLORS.C_DIV_Title, 
        marginBottom: "8px" 
      }}>Street Address</h2>
      </div>
    <div  style={{
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
     <span className="rounded-full p-2" style={{background:COLORS.secondary_green}}><CircleCheck style={{color:COLORS.primary_white}}/> </span>  Almost Done!
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

export default EmergencyContact;