import React, { useState } from "react";
import { COLORS, FONTS } from "../../Constants/uiconstants";
import StudentInfo from "./StudentInfo";
import PersonalDetails from "./PersonalDetails";
import Address from "./Address";
import EmergencyContact from "./EmergencyContact";
import { CircleCheck } from "lucide-react";
import { HiOutlineUsers, HiOutlinePhone } from "react-icons/hi2";
import { LuUserRound } from "react-icons/lu";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import star from '../../assets/images/magic-starYellow.png'


const StudentRegistration: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  const InputField: React.FC<{ label: string; placeholder?: string; value?: string }> = ({
    label,
    placeholder,
    value,
  }) => (
    <div className="w-full">
      <label style={{ ...(FONTS.medium as any), display: "block", marginBottom: "6px" }}>
        {label}
      </label>
      <input
        type="text"
        placeholder={placeholder}
        defaultValue={value}
        style={{
          width: "100%",
          padding: "12px",
          border: "none",
          borderRadius: "6px",
          fontSize: "16px",
          outline: "none",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
        }}
      />
    </div>
  );

  const SelectField: React.FC<{ label: string; placeholder?: string }> = ({
    label,
    placeholder,
  }) => (
    <div className="w-full">
      <label style={{ ...(FONTS.medium as any), display: "block", marginBottom: "6px" }}>
        {label}
      </label>
      <input
        type="text"
        placeholder={placeholder}
        style={{
          width: "100%",
          padding: "12px",
          border: "none",
          borderRadius: "6px",
          fontSize: "16px",
          outline: "none",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
        }}
      />
    </div>
  );

  const ProgressBar: React.FC<{ step: number }> = ({ step }) => {
    const steps = [
      { icon: <HiOutlineUsers size={24} />, label: "Student Info" },
      { icon: <LuUserRound size={24} />, label: "Personal Details" },
      { icon: <HiOutlineLocationMarker size={24} />, label: "Address" },
      { icon: <HiOutlinePhone size={24} />, label: "Emergency Contact" },
    ];

    return (
      <div className="w-full mx-auto my-5 sm:my-5 md:my-[30px] px-3 sm:px-4 md:px-0 max-w-[95%] sm:max-w-[700px] md:max-w-[900px]">
        <div className="flex flex-wrap justify-around items-center gap-4 mb-5 relative">
          {steps.map((s, index) => {
            const stepNumber = index + 1;
            const isCompleted = step > stepNumber;
            const isActive = step === stepNumber;

            return (
              <div
                key={index}
                className="flex flex-col items-center justify-center gap-1 text-center flex-1 min-w-[120px] p-5"
              >
                <div
                  style={{
                    width: "50px",
                    height: "50px",
                    borderRadius: "50%",
                    backgroundColor: isCompleted
                      ? COLORS.secondary_green
                      : isActive
                      ? COLORS.primary_red
                      : COLORS.primary_white,
                    color:
                      isCompleted || isActive
                        ? COLORS.primary_white
                        : COLORS.primary_black,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 8px",
                    fontWeight: 600,
                    fontSize: "20px",
                    transition: "all 0.3s ease",
                    boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                  }}
                >
                  {isCompleted ? <CircleCheck /> : s.icon}
                </div>
                <p
                  style={{
                    ...(FONTS.medium as any),
                    fontSize: "14px",
                    color: COLORS.primary_black,
                  }}
                >
                  {s.label}
                </p>
              </div>
            );
          })}
        </div>

        <div
          style={{
            backgroundColor: COLORS.primary_white,
            height: "6px",
            borderRadius: "3px",
            position: "relative",
            width: "100%",
            marginTop: "-25px",
          }}
        >
          <div
            style={{
              backgroundColor: COLORS.primary_red,
              width: `${(step / steps.length) * 100}%`,
              height: "100%",
              borderRadius: "3px",
              transition: "width 0.3s ease",
            }}
          
          />
        </div>
      </div>
    );
  };

  return (
    <div
      style={{
        backgroundColor: COLORS.primary_yellow,
        minHeight: "100vh",
        textAlign: "center",
      }}
      className="px-3 sm:px-6 md:px-10 py-8 sm:py-10 md:py-10"
    >
      <div
        style={{
          ...FONTS.medium as any,
          backgroundColor: COLORS.primary_red,
          color: COLORS.primary_yellow,
        
          padding: "8px 16px",
         
          fontWeight: 600,
        }}
        className="rounded-full items-center justify-center flex-wrap inline-flex"
      >
    <img
            src={star}
            alt="star"
            className="h-5 w-5 mr-2"
         
         />
  Professional Enrollment
      </div>

      <h1
        style={{
          ...(FONTS.boldHeading as any),
          color: COLORS.primary_red,
          marginTop: "10px",
          
        }}
         
      >
        Student Registration
      </h1>
      <p style={{ ...(FONTS.medium as any), color: COLORS.primary_black }}>
        Complete your Profile in 4 Simple Steps
      </p>

      <ProgressBar step={step} />

      <div
        style={{
          backgroundColor: COLORS.primary_white,
          borderRadius: "8px",
          textAlign: "left",
          boxShadow: "0 0 10px rgba(0,0,0,0.1)",
          borderTop: `5px solid ${COLORS.primary_red}`,
        }}
        className="w-full mx-auto max-w-[95%] sm:max-w-[700px] md:max-w-[900px] px-4 sm:px-6 md:px-10 py-6 sm:py-8 md:py-10 flex flex-col flex-wrap"
      >
        {step === 1 && <StudentInfo />}
        {step === 2 && <PersonalDetails InputField={InputField} SelectField={SelectField} />}
        {step === 3 && <Address InputField={InputField} />}
        {step === 4 && <EmergencyContact InputField={InputField} />}

        <div className="flex flex-wrap justify-between gap-3 mt-6">
          <button
            onClick={() => setStep((s) => Math.max(1, s - 1))}
            disabled={step === 1}
            style={{
              backgroundColor: COLORS.primary_white,
              color: COLORS.primary_red,
              border: `1px solid ${COLORS.primary_red}`,
              padding: "10px 20px",
              borderRadius: "6px",
              cursor: step === 1 ? "not-allowed" : "pointer",
              opacity: step === 1 ? 0.6 : 1,
              fontWeight: 600,
            }}
          >
            ← Previous
          </button>

          <button
            onClick={() => {
              if (step === 4) {
                navigate("/Home");
              } else {
                setStep((s) => Math.min(4, s + 1));
              }
            }}
            className="flex items-center justify-center gap-2 px-6 py-2 rounded-md font-semibold transition-all"
           style={{
             backgroundColor: step === 4 ? COLORS.secondary_green : COLORS.primary_red,
              color: COLORS.primary_white,
  }}
          >
            {step === 4 ? (
              <>
                <CircleCheck size={20} /> Completed Enrollment
              </>
            ) : (
              <>Next Step →</>
            )}
          </button>
        </div>

        <footer className="mt-10 text-center">
          <p
            style={{
              ...(FONTS.SHOPPING_CART_SubTitle as any),
              color: COLORS.primary_gray,
            }}
          >
            Need help? Contact our support team at{" "}
            <span style={{ fontWeight: "bold" }}>support@learnhub.com</span>
          </p>
        </footer>
      </div>
    </div>
  );
};

export default StudentRegistration;
