import React from "react";
import { useAppSelector } from "../../../../hooks/reduxhooks";
import { COLORS } from "../../../../Constants/uiconstants";

type PaymentCardProps = {
  title: string;
  paymentId: string;
  date: string;
  method: string;
  amount: string;
  status: string;
};

const PaymentCard: React.FC<PaymentCardProps> = ({
  title,
  paymentId,
  date,
  method,
  amount,
  status,
}) => {
  const isCompleted = status.toLowerCase() === "completed";

  return (
    <div
      className=" shadow-sm rounded-2xl p-5 flex flex-col gap-2 mb-4 "
      style={{ backgroundColor: COLORS.primary_white }}
    >
      <h3
        className="text-base font-semibold text-gray-800"
        style={{ color: COLORS.primary_gray }}
      >
        {title}
      </h3>
      <div className="flex justify-between items-center">
        <p className="text-sm " style={{ color: COLORS.primary_gray }}>
          Payment ID: {paymentId}
        </p>
        <p
          className="text-lg font-semibold "
          style={{ color: COLORS.primary_black }}
        >
          ₹{amount}
        </p>
      </div>
      <div className="flex justify-between items-center">
        <div
          className="flex items-center gap-2 text-sm"
          style={{ color: COLORS.primary_gray }}
        >
          <span>{date}</span>
          <span className="font-medium ">{method}</span>
        </div>
        <span
          className={`px-3 py-1 text-xs font-medium rounded-full `}
          style={{
            backgroundColor: isCompleted
              ? COLORS.secondary_green
              : COLORS.primary_yellow,
            color: COLORS.primary_black,
          }}
        >
          {status}
        </span>
      </div>
    </div>
  );
};

export const Payments: React.FC = () => {
  const profile = useAppSelector((state) => state.profile);

  return (
    <div className="">
      {profile.payments && profile.payments.length > 0 ? (
        profile.payments.map((payment, index) => (
          <PaymentCard key={index} {...payment} />
        ))
      ) : (
        <p className="text-gray-500 text-sm">No payment history found.</p>
      )}
    </div>
  );
};

export default Payments;
