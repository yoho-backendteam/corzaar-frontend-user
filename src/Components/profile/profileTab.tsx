import React, { useState } from "react";
import { COLORS, FONTS } from "../../Constants/uiconstants";

interface Tab {
  label: string;
  content: React.ReactNode;
}

interface ProfileTabsProps {
  tabs: Tab[];
}

export const ProfileTabs: React.FC<ProfileTabsProps> = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="w-full">
      <div className="flex flex-wrap gap-3 mb-5">
        {tabs.map((tab, index) => (
          <button
            key={index}
            onClick={() => setActiveTab(index)}
            style={{
              backgroundColor:
                activeTab === index ? COLORS.primary_red : COLORS.primary_white,
              color:
                activeTab === index ? COLORS.primary_white : COLORS.primary_red,
              borderRadius: "8px",
              fontFamily: FONTS.medium.fontFamily,
              fontWeight: FONTS.medium.fontWeight,
              padding: "8px 20px",
              boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
              transition: "all 0.2s ease",
            }}
            className="text-sm hover:opacity-90"
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div
        className="min-h-[200px]"
        style={{
          fontFamily: FONTS.regular.fontFamily,
          transition: "all 0.3s ease",
        }}
      >
        {tabs[activeTab].content}
      </div>
    </div>
  );
};
